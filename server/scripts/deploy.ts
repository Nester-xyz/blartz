import { artifacts, ethers } from 'hardhat';

async function main() {
  // Deploy contracts
  const [deployer] = await ethers.getSigners();
  console.log("Deploying the contracts with the account:", await deployer.getAddress())


  // console.log("Account balance:", (await deployer.getBalance()).toString());

  const BlastNFTFactory = await ethers.getContractFactory('BlastNFTFactory');
  const BlastNFTFactoryInstance = await BlastNFTFactory.deploy();
  await BlastNFTFactoryInstance.waitForDeployment()
  console.log("Factory contract address: ", await BlastNFTFactoryInstance.getAddress())

  const Marketplace = await ethers.getContractFactory('Marketplace');
  const marketplaceInstance = await Marketplace.deploy(await BlastNFTFactoryInstance.getAddress());
  await marketplaceInstance.waitForDeployment()
  await BlastNFTFactoryInstance.setMarketplace(await marketplaceInstance.getAddress());
  console.log("Marketplace contract addres: ", await marketplaceInstance.getAddress())
  // Save contract address and ABI for frontend integration
  await saveFrontendFiles(BlastNFTFactoryInstance, marketplaceInstance);
}

async function saveFrontendFiles(BlastNFTFactoryInstance, marketplaceInstance) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../deployed";
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }
  // Save contract addresses
  fs.writeFileSync(contractsDir + "/contract-address.json", JSON.stringify({
    BlastNFTFactory: await BlastNFTFactoryInstance.getAddress(),
    Marketplace: await marketplaceInstance.getAddress(),
  }));

  const FactoryArtifact = artifacts.readArtifactSync("BlastNFTFactory")
  const MarketplaceArtifact = artifacts.readArtifactSync("Marketplace")
  fs.writeFileSync(
    contractsDir + "/BlastNFTFactory.json",
    JSON.stringify(FactoryArtifact, null, 2)
  )
  fs.writeFileSync(
    contractsDir + "/Marketplace.json",
    JSON.stringify(MarketplaceArtifact, null, 2)
  )
  console.log("Contracts Deployed")
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
