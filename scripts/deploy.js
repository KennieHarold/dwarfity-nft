const hre = require('hardhat');
const fs = require('fs');
const readFile = require('util').promisify(fs.readFile);
const path = require('path');

async function main() {
  const DwarfityCore = await hre.ethers.getContractFactory('DwarfityCore');
  const dwarfityCore = await DwarfityCore.deploy();

  console.log('DrafityCore deployed to:', dwarfityCore.address);

  //  Copy artifact to react's abis directory
  fs.copyFile(
    path.join(
      process.cwd(),
      'artifacts/contracts/DwarfityCore.sol/DwarfityCore.json'
    ),
    path.join(process.cwd(), 'src/abis/DwarfityCore.json'),
    (err) => {
      if (err) throw err;
      console.log('DwarfityCore.json was copied to the abis directory');
    }
  );

  //  Update .env file
  const envFilePath = path.join(process.cwd(), '.env');
  const envFile = await readFile(envFilePath, { encoding: 'utf-8' });

  let newEnvFile = envFile
    .replace(
      /REACT_APP_DWARFITY_CORE_ADDRESS=[\d\w]*/g,
      'REACT_APP_DWARFITY_CORE_ADDRESS=' + dwarfityCore.address
    )
    .replace(
      /DWARFITY_CORE_ADDRESS=[\d\w]*/g,
      'DWARFITY_CORE_ADDRESS=' + dwarfityCore.address
    );

  fs.writeFile(envFilePath, newEnvFile, 'utf-8', function (err) {
    if (err) throw err;
    console.log('Updated env file with the latest contract address');
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
