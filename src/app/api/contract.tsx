import Web3 from 'web3';
import BlastNFTFactoryABI from '../deployed/BlastNFTFactory.json';
import MarketplaceABI from '../deployed/Marketplace.json';
import contractAddress from '../deployed/contract-address.json';

// Define your contract addresses
const blastNFTFactoryAddress = contractAddress.BlastNFTFactory; // Address of deployed BlastNFTFactory contract
const marketplaceAddress = contractAddress.Marketplace; // Address of deployed Marketplace contract
// Create a Web3 instance
const web3 = new Web3(window.ethereum)
// if (typeof window !== 'undefined') {
//     // Code that relies on window object
//     web3 = new Web3(window.ethereum);
// } else {
//     throw new Error('Web3 instance is not initialized. Please make sure MetaMask is installed and enabled.');
// }
// Check if Web3 instance is initialized

// Create contract instances
if (web3) {
    console.log(web3)
    web3.eth.getAccounts()
        .then(accounts => {
            const account = accounts[0];
            console.log('Current account:', account);
            return web3.eth.getBalance(account);
        })
        .then(balance => {
            console.log('Account balance:', web3.utils.fromWei(balance, 'ether'), 'ETH');
        })
        .catch(error => {
            console.error('Error interacting with accounts or contracts:', error);
        });
} else {
    console.log("web3 not initialized")
}
const blastNFTFactoryContract = new web3.eth.Contract(BlastNFTFactoryABI.abi, blastNFTFactoryAddress);
const marketplaceContract = new web3.eth.Contract(MarketplaceABI.abi, marketplaceAddress);

// Example function to interact with contracts
export { blastNFTFactoryContract, marketplaceContract };
