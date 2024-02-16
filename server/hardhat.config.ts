import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
const PRIVATE_KEYS = [
  "b8d4c777c4a36d57b3a3037e025d7b9094c28d0a3e0f28afc9422992967b302a"
]
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
      chainId: 168587773,
      accounts: PRIVATE_KEYS
    }
  },
};

export default config;
