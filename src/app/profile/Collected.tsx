import React, { useContext, useEffect, useState } from "react";
import { NavigationContext } from "../api/NavigationContext";
import { marketplaceContract, web3 } from "../api/ContractAPI";
import BlastNFTABI from "../deployed/BlastNFT.json";
import Card from "@/Components/UI/Card";

type Props = {};

type UserCollectedNFTData = {
  collection: string;
  tokenPrice: string;
  tokenId: string;
  tokenURI: string;
};

const Collected = (props: Props) => {
  const { walletAddress } = useContext(NavigationContext);
  const [userCollectedData, setUserCollectedData] = useState<UserCollectedNFTData[]>([]);
  const [processedTokens, setProcessedTokens] = useState<Set<string>>(new Set());

  const getUserCollectedNFTs = async () => {
    try {
      if (!walletAddress) return; // If wallet address is not available, return early

      const response = await marketplaceContract.methods.getUserCollectedNFT().call({ from: walletAddress });
      console.log(response);
      const newProcessedTokens = new Set<string>();

      const collectedNFTs = await Promise.all(response.map(async (item: any) => {
        const tokenId = String(item[1]);
        const collectionAddress = item[0];
        const tokenKey = `${tokenId}-${collectionAddress}`;

        // Check if the token has already been processed
        if (processedTokens.has(tokenKey)) return null;

        // Add the token key to the new set of processed tokens
        newProcessedTokens.add(tokenKey);

        const collectionContract = new web3.eth.Contract(BlastNFTABI.abi, collectionAddress);
        const tokenURI = await collectionContract.methods.getTokenURI(BigInt(tokenId)).call({ from: walletAddress });

        return {
          tokenId: tokenId,
          tokenPrice: String(item[2] / BigInt(1e18)), // Convert to ETH
          collection: collectionAddress,
          tokenURI: `https://red-mad-woodpecker-146.mypinata.cloud/ipfs/${tokenURI}`
        };
      }));

      // Filter out null values and update state
      const filteredCollectedNFTs = collectedNFTs.filter((nft) => nft !== null) as UserCollectedNFTData[];
      setProcessedTokens(newProcessedTokens);
      setUserCollectedData(filteredCollectedNFTs);
    } catch (error) {
      console.error("Error fetching user collected NFTs:", error);
      // Handle error gracefully, e.g., display an error message to the user
    }
  };

  useEffect(() => {
    getUserCollectedNFTs();
  }, [walletAddress, marketplaceContract]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {userCollectedData.map((nft) => (
        <Card
          image={nft.tokenURI}
          title={`Token ID: ${nft.tokenId}`}
          key={`${nft.tokenId}-${nft.collection}`}
          redirect={`/nft/${nft.collection}/${nft.tokenId}`}
        // Add other necessary props
        />
      ))}
    </div>
  );
};

export default Collected;
