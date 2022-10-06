const { ethers, getNamedAccounts } = require("hardhat");

async function main() {
  const { deployer } = await getNamedAccounts();
  const wavePortal = await ethers.getContract("WavePortal", deployer);
  await wavePortal.wave();

  let waveCount = await wavePortal.getTotalWaves();
  console.log(`wave count ${waveCount.toString()}`);

  const accounts = await ethers.getSigners();
  const player = accounts[1];
  const connectPlayerToContract = await wavePortal.connect(player);
  await connectPlayerToContract.wave();

  waveCount = await wavePortal.getTotalWaves();
  console.log(`wave count ${waveCount.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
