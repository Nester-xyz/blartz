import Web3 from 'web3';
import BlastNFTFactoryABI from '../deployed/BlastNFTFactory.json';
import MarketplaceABI from '../deployed/Marketplace.json';
import { BlastNFTFactory, Marketplace } from '../deployed/contract-address.json';

// Define your contract addresses
const blastNFTFactoryAddress = BlastNFTFactory; // Address of deployed BlastNFTFactory contract
const marketplaceAddress = Marketplace; // Address of deployed Marketplace contract

// Create a Web3 instance
let web3: Web3
if (typeof window !== 'undefined') {
    // Code that relies on window object
    web3 = new Web3(window.ethereum);
    // Rest of your code...
} else {
    throw new Error('Web3 instance is not initialized. Please make sure MetaMask is installed and enabled.');
}
// Check if Web3 instance is initialized

// Create contract instances
const blastNFTFactoryContract = new web3.eth.Contract(BlastNFTFactoryABI.abi, blastNFTFactoryAddress);
const marketplaceContract = new web3.eth.Contract(MarketplaceABI.abi, marketplaceAddress);

// Example function to interact with contracts
const blastNFTFactoryContractMethod = blastNFTFactoryContract.methods;
const marketplaceContractMethod = marketplaceContract.methods;
export { blastNFTFactoryContractMethod, marketplaceContractMethod };
