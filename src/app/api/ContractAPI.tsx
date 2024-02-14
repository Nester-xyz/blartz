import Web3 from 'web3';
import BlastNFTFactoryABI from '../deployed/BlastNFTFactory.json';
import MarketplaceABI from '../deployed/Marketplace.json';
import contractAddress from '../deployed/contract-address.json';
let blastNFTFactoryAddress: string = '';
let marketplaceAddress: string = '';
try {
    // Attempt to parse JSON files
    blastNFTFactoryAddress = contractAddress.BlastNFTFactory;
    marketplaceAddress = contractAddress.Marketplace;
} catch (error) {
    console.error('Error parsing contract address JSON:', error);
}

declare global {
    interface Window {
        ethereum?: any; // Adjust the type according to your needs
    }
}

// Create a Web3 instance
let web3: Web3;

if (typeof window !== 'undefined' && window?.ethereum) {
    web3 = new Web3(window.ethereum);
} else {
    console.error('No ethereum provider detected. Please install MetaMask or another compatible browser extension.');
}
let blastNFTFactoryContract: any;
let marketplaceContract: any;

if (web3!) {
    const eth = web3.eth; // Access eth property only if web3 is defined
    blastNFTFactoryContract = new eth.Contract(BlastNFTFactoryABI.abi, blastNFTFactoryAddress);
    marketplaceContract = new eth.Contract(MarketplaceABI.abi, marketplaceAddress);
}

// Example function to interact with contracts
export { web3, blastNFTFactoryContract, marketplaceContract };
