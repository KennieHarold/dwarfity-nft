const { ethers } = require('hardhat');

async function main() {
  const dwarfityCore = await (
    await ethers.getContractFactory('DwarfityCore')
  ).attach(process.env.REACT_APP_DWARFITY_CORE_ADDRESS);

  //  Mint 5 started dwarves
  await Promise.all([
    dwarfityCore.mintGenesisDwarf('000011111'),
    dwarfityCore.mintGenesisDwarf('111111111'),
    dwarfityCore.mintGenesisDwarf('222222222'),
    dwarfityCore.mintGenesisDwarf('111122222'),
    dwarfityCore.mintGenesisDwarf('222211111')
  ]);

  console.log('Mint starter dwarves!');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
