const hre = require('hardhat');

async function main() {
  const drafityCore = await hre.ethers.getContractFactory('DrafityCore');
  await drafityCore.deployed();

  console.log('DrafityCore deployed to:', drafityCore.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
