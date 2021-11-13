const mongoose = require('mongoose');
const { ethers } = require('hardhat');
const { DwarfTokenModel } = require('../node_server/models/dwarfToken.model');
const { genesData, genDwarvesData } = require('../fixtures/genDwarvesData');

async function main() {
  //  Connect contract
  const dwarfityCore = await (
    await ethers.getContractFactory('DwarfityCore')
  ).attach(process.env.DWARFITY_CORE_ADDRESS);

  //  Connect MongoDB
  const mongoUrl = process.env.DB_CONNECTION_STRING;
  await mongoose.connect(mongoUrl);

  //  Mint 5 genesis dwarves in the blockchain
  await DwarfTokenModel.deleteMany({});

  await Promise.all(
    genDwarvesData.map((data, index) => {
      //  Don't mint the genesis dwarf because its already minted upon deployment
      if (index !== 0) {
        dwarfityCore.mintGenesisDwarf(genesData[index]);
      }
      DwarfTokenModel(data).save();
    })
  );

  console.log('Minted genesis dwarves!');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
