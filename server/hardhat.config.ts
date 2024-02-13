import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    hardhat: {
      chainId: 31337
    },
    localhost: {
      url: "http://127.0.0.1:7545",
      chainId: 1337
    },
    blastsepolia: {
      url: "https://sepolia.blast.io",
      chainId: 168587773
    }
  },
};

export default config;
