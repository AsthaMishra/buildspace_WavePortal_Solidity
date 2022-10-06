const { ethers, getNamedAccounts, network } = require("hardhat");
const fs = require("fs");

const ABI_FiLE_LOCATION = "../nextjs-wave/constants/";
const ADDRESS_FILE_LOCATION = "../nextjs-wave/constants/address.json";
let deployer;

module.exports = async () => {
  deployer = (await getNamedAccounts()).deployer;
  await UpdateAddress();
  await UpdateABI();
};

async function UpdateABI() {
  const wavePortal = await ethers.getContract("WavePortal", deployer);

  fs.writeFileSync(
    `${ABI_FiLE_LOCATION}waveportal_${network.name}.json`,
    wavePortal.interface.format(ethers.utils.FormatTypes.json)
  );
}

async function UpdateAddress() {
  const wavePortal = await ethers.getContract("WavePortal", deployer);

  const addressFiledata = JSON.parse(
    fs.readFileSync(ADDRESS_FILE_LOCATION, "utf-8")
  );

  console.log(`addressFiledata ${addressFiledata}`);

  const chainId = network.config.chainId.toString();

  if (chainId in addressFiledata) {
    if (!addressFiledata[chainId].includes(wavePortal.address)) {
      addressFiledata[chainId].push(wavePortal.address);
    }
  } else {
    addressFiledata[chainId] = wavePortal.address;
  }

  console.log(
    `JSON.stringify(addressFiledata) ${JSON.stringify(addressFiledata)}`
  );
  fs.writeFileSync(ADDRESS_FILE_LOCATION, JSON.stringify(addressFiledata));
}

module.exports.tags = ["upload", "all"];
