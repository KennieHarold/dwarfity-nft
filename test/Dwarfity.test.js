const { expect, assert } = require('chai');
const { ethers } = require('hardhat');

require('chai').use(require('chai-as-promised')).should();

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//  Approximately 19683 combinations
function getRandomGene() {
  const genes = [
    getRandomIntInclusive(0, 2),
    getRandomIntInclusive(0, 2),
    getRandomIntInclusive(0, 2),
    getRandomIntInclusive(0, 2),
    getRandomIntInclusive(0, 2),
    getRandomIntInclusive(0, 2),
    getRandomIntInclusive(0, 2),
    getRandomIntInclusive(0, 2),
    getRandomIntInclusive(0, 2)
  ];

  return genes.join('');
}

function toWei(value) {
  return web3.utils.toWei(value, 'ether');
}

function fromWei(val) {
  return web3.utils.fromWei(val.toString(), 'ether');
}

describe('Dwarfity', function () {
  let dwarfityCore, deployer, user1, user2;

  beforeEach(async () => {
    const dwarfityCoreFactory = await ethers.getContractFactory('DwarfityCore');
    dwarfityCore = await dwarfityCoreFactory.deploy();

    [deployer, user1, user2] = await ethers.getSigners();
  });

  describe('Deployment', () => {
    it('should deploy successfully', async function () {
      expect(await dwarfityCore.deployer()).to.be.equal(deployer.address);
      expect(await dwarfityCore.name()).to.be.equal('Dwarfity');
      expect(await dwarfityCore.symbol()).to.be.equal('DW');
    });

    it('should mint genesis dwarf', async () => {
      const totalSupply = await dwarfityCore.dwarfIndexTracker();
      totalSupply.toString().should.be.equal('1');

      const genesisDwarf = await dwarfityCore.getDwarfByTokenId(0);
      genesisDwarf._genes.toString().should.be.equal('000000000');
      genesisDwarf._fatherTokenId.toString().should.be.equal('0');
      genesisDwarf._motherTokenId.toString().should.be.equal('0');
      genesisDwarf._rarity.toString().should.be.equal('1');

      expect(await dwarfityCore.ownerOf(0)).to.be.equal(deployer.address);
      expect(await dwarfityCore.balanceOf(deployer.address)).to.be.equal(1);

      const tokenIds = await dwarfityCore.getTokenIds(deployer.address);
      tokenIds.should.be.lengthOf(1);
      tokenIds[0].toString().should.be.equal('0');
    });

    describe('mint dwarf nft', () => {
      it('mint dwarf for gen0', async () => {
        const randomGenes = [getRandomGene(), getRandomGene(), getRandomGene()];

        const dwarf_1 = await (await dwarfityCore.mintGenesisDwarf(randomGenes[0])).wait();
        const dwarf_2 = await (await dwarfityCore.mintGenesisDwarf(randomGenes[1])).wait();
        const dwarf_3 = await (await dwarfityCore.mintGenesisDwarf(randomGenes[2])).wait();

        const totalSupply = await dwarfityCore.dwarfIndexTracker();
        totalSupply.toString().should.be.equal('4');

        const dwarf_1_tokenId = dwarf_1.events[0].args.tokenId;
        const dwarf_2_tokenId = dwarf_2.events[0].args.tokenId;
        const dwarf_3_tokenId = dwarf_3.events[0].args.tokenId;

        const dwarves = await Promise.all([
          dwarfityCore.getDwarfByTokenId(parseInt(dwarf_1_tokenId.toString())),
          dwarfityCore.getDwarfByTokenId(parseInt(dwarf_2_tokenId.toString())),
          dwarfityCore.getDwarfByTokenId(parseInt(dwarf_3_tokenId.toString()))
        ]);

        //  Check if data is correct for minted dwarves
        dwarves[0]._genes.should.be.equal(randomGenes[0]);
        dwarves[1]._genes.should.be.equal(randomGenes[1]);
        dwarves[2]._genes.should.be.equal(randomGenes[2]);

        dwarves[0]._fatherTokenId.toString().should.be.equal('0');
        dwarves[1]._fatherTokenId.toString().should.be.equal('0');
        dwarves[2]._fatherTokenId.toString().should.be.equal('0');

        dwarves[0]._motherTokenId.toString().should.be.equal('0');
        dwarves[1]._motherTokenId.toString().should.be.equal('0');
        dwarves[2]._motherTokenId.toString().should.be.equal('0');

        dwarves[0]._rarity.toString().should.be.equal('1');
        dwarves[1]._rarity.toString().should.be.equal('1');
        dwarves[2]._rarity.toString().should.be.equal('1');
      });
    });

    describe('purchase dwarf nft', () => {
      it('purchase and mint', async () => {
        const randomGene = getRandomGene();
        const minPrice = '0.005';

        const dwarf_1 = await (await dwarfityCore.mintGenesisDwarf(randomGene)).wait();
        const dwarf_1_tokenId = dwarf_1.events[0].args.tokenId;

        await dwarfityCore
          .connect(user1)
          .purchaseDwarfFromDeployer(dwarf_1_tokenId.toString(), {
            value: toWei(minPrice, 'ether')
          });

        const tokenId = await dwarfityCore.ownerOf(dwarf_1_tokenId.toString());
        tokenId.toString().should.be.equal(user1.address);

        const balance = await dwarfityCore.balanceOf(user1.address);
        balance.toString().should.be.equal('1');

        const contractBalance = await dwarfityCore.getContractBalance();
        fromWei(contractBalance.toString()).should.be.equal(minPrice);
      });
    });

    describe('breed dwarf nft', () => {
      it('should breed with gene algorithm', async () => {
        const randomGenes = [getRandomGene(), getRandomGene()];
        const minPrice = '0.005';

        //  Mint 2 NFTs for mother and father
        const dwarf_1 = await (await dwarfityCore.mintGenesisDwarf(randomGenes[0])).wait();
        const dwarf_2 = await (await dwarfityCore.mintGenesisDwarf(randomGenes[1])).wait();

        //  Get the token id
        const dwarf_1_tokenId = dwarf_1.events[0].args.tokenId;
        const dwarf_2_tokenId = dwarf_2.events[0].args.tokenId;

        //  Purchase
        await dwarfityCore
          .connect(user1)
          .purchaseDwarfFromDeployer(dwarf_1_tokenId.toString(), {
            value: toWei(minPrice, 'ether')
          });

        await dwarfityCore
          .connect(user1)
          .purchaseDwarfFromDeployer(dwarf_2_tokenId.toString(), {
            value: toWei(minPrice, 'ether')
          });

        //  Breed
        const breed = await (
          await dwarfityCore.connect(user1).breedDwarves(dwarf_1_tokenId, dwarf_2_tokenId)
        ).wait();

        const eventIdx = breed.events.findIndex((e) => e.event === 'Birth');

        //  Assertions
        assert.notEqual(eventIdx, -1, 'There is no birth event');
        breed.events[eventIdx].args.fatherTokenId.should.be.equal(dwarf_1_tokenId);
        breed.events[eventIdx].args.motherTokenId.should.be.equal(dwarf_2_tokenId);
      });
    });
  });
});
