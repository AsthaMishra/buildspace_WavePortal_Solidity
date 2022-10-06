module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deployer } = await getNamedAccounts();
  const { deploy, log } = deployments;

  const WavePortal = await deploy("WavePortal", {
    from: deployer,
    args: [],
    log: true,
    blockCinfirmation: 3,
  });

  console.log(`deployed!!`);
};

module.exports.tags = ["all"];
