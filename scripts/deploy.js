const hre = require('hardhat');
const fs = require('fs');

async function main() {
  const DwarfityCore = await hre.ethers.getContractFactory('DwarfityCore');
  const dwarfityCore = await DwarfityCore.deploy();

  fs.copyFile(
    './artifacts/contracts/DwarfityCore.sol/DwarfityCore.json',
    './src/abis/DwarfityCore.json',
    (err) => {
      if (err) throw err;
      console.log('DwarfityCore.json was copied to the abis directory');
    }
  );

  console.log('DrafityCore deployed to:', dwarfityCore.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
