// "use client"
// import React, { useContext, useEffect, useState } from 'react'

// import { marketplaceContract } from '../api/ContractAPI'
// import { NavigationContext } from '../api/NavigationContext'
// type Props = {}

// const Wallet = (props: Props) => {
//     const { walletAddress } = useContext(NavigationContext);
//     const [sellWallet, setSellWallet] = useState([]);
//     const [buyWallet, setBuyWallet] = useState([]);
//     const getBuyingWalletDetails = async () => {
//         try {
//             const response = await marketplaceContract.methods.getBuyerToWalletAddress().call({ from: walletAddress });
//             console.log(response);
//             setSellWallet(response);
//         } catch (error) {
//             console.log(error);
//         }
//     }
//     const getSellingWalletDetails = async () => {
//         try {
//             const response = await marketplaceContract.methods.getSellerToWalletAddress().call({ from: walletAddress });
//             console.log(response);
//             setBuyWallet(response);
//         } catch (error) {
//             console.log(error);
//         }
//     }
//     useEffect(() => {
//         getBuyingWalletDetails();
//         getSellingWalletDetails();
//     }, [walletAddress])

//     return (
//         <div className='text-white'>
//             <div className=''>Bought Wallet Details</div>
//             {sellWallet.map((wallet) => (<div>
//                 {wallet}&nbsp;
//                 <button onClick={handleClaimNFT}>Claim sold nft fund</button>
//             </div>))}
//             <div className=''>Sold Wallet Details</div>
//             {buyWallet.map((wallet) => (<div>
//                 {wallet}&nbsp;
//                 <button onClick={handle}>Claim deposited fund</button>
//             </div>))}
//         </div>
//     )
// }

// export default Wallet