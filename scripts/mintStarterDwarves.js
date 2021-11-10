const { ethers } = require('hardhat');

async function main() {
  const DwarfityCore = await ethers.getContractFactory('DwarfityCore');
  const dwarfityCore = await DwarfityCore.deploy();

  //  Mint 5 started dwarves
  await Promise.all([
    dwarfityCore.mintGenesisDwarf('000011111'),
    dwarfityCore.mintGenesisDwarf('111111111'),
    dwarfityCore.mintGenesisDwarf('222222222'),
    dwarfityCore.mintGenesisDwarf('111122222'),
    dwarfityCore.mintGenesisDwarf('222211111')
  ]);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
