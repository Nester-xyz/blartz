import Card from "@/Components/UI/Card";
import React, { useContext, useEffect, useState } from "react";
import { NavigationContext } from "../api/NavigationContext";
import { blastNFTFactoryContract } from "../api/ContractAPI";
import BlastNFTABI from "../deployed/BlastNFT.json";
import { web3 } from "../api/ContractAPI";
type Props = {};
type NFTMetadata = {
  tokenId: string;
  tokenURI: string;
  tokenName: string;
  fromCollection: string;
};
const Created = (props: Props) => {
  const { walletAddress } = useContext(NavigationContext);
  const [userCreated, setUserCreated] = useState<NFTMetadata[]>([]);
  const [processedTokens, setProcessedTokens] = useState<Set<string>>(
    new Set()
  );
  const getCollectionOfUser = async () => {
    try {
      if (walletAddress == null) return;
      const response = await blastNFTFactoryContract.methods
        .getCreatorCollections()
        .call({ from: walletAddress });

      let allNFTs: any = [];
      let newProcessedTokens = new Set(processedTokens);

      for (const collectionAddress of response) {
        if (!collectionAddress) continue;
        const collectionContract = new web3.eth.Contract(
          BlastNFTABI.abi,
          collectionAddress
        );
        const response = await collectionContract.methods
          .getUserToken()
          .call({ from: walletAddress });

        const collectionNFTs = response!
          .map((item) => {
            const tokenId = String(item[0]);
            const tokenKey = `${tokenId}-${collectionAddress}`;
            if (newProcessedTokens.has(tokenKey)) return null;
            newProcessedTokens.add(tokenKey);
            return {
              tokenId: tokenId,
              tokenURI: `https://red-mad-woodpecker-146.mypinata.cloud/ipfs/${item[1]}`,
              tokenName: item[2],
              fromCollection: collectionAddress,
            };
          })
          .filter(Boolean);

        allNFTs = [...allNFTs, ...collectionNFTs];
      }

      setUserCreated(allNFTs);
      setProcessedTokens(newProcessedTokens);
    } catch (error) {
      console.log("Cannot get collection", error);
    }
  };

  useEffect(() => {
    getCollectionOfUser();
  }, [walletAddress]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {userCreated.map((nft: any) => {
        return (
          <Card
            // image="https://images.unsplash.com/photo-1682695795557-17447f921f79?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            image={`${nft.tokenURI}`}
            title={`${nft.tokenName}`}
            redirect={`/nft/${nft.fromCollection}/${nft.tokenId}`}
            key={`${nft.tokenId}+${nft.fromCollection}`}
          />
        );
      })}
    </div>
  );
};

export default Created;
