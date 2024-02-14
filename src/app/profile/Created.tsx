import Card from "@/Components/UI/Card";
import React, { useContext, useEffect, useState } from "react";
import { NavigationContext } from "../api/NavigationContext";
import { blastNFTFactoryContract } from "../api/ContractAPI";
import BlastNFTABI from '../deployed/BlastNFT.json'
import { web3 } from "../api/ContractAPI";
type Props = {};
type NFTMetadata = {
  tokenId: string;
  tokenURI: string;
  tokenName: string;
  fromCollection: string;
}
const Created = (props: Props) => {
  const { walletAddress } = useContext(NavigationContext);
  const [userCreated, setUserCreated] = useState<NFTMetadata[]>([])
  const [processedTokens, setProcessedTokens] = useState<Set<string>>(new Set())
  const getCollectionOfUser = async () => {
    try {
      console.log(walletAddress);
      if (walletAddress == null) return;
      const response: any = await blastNFTFactoryContract.methods
        .getCreatorCollections()
        .call({ from: walletAddress });
      console.log(response);
      for (const collectionAddress of response) {
        try {
          if (!collectionAddress) continue;
          const collectionContract = new web3.eth.Contract(BlastNFTABI.abi, collectionAddress);
          const response = await collectionContract.methods.getUserToken().call({ from: walletAddress });
          console.log(response);
          const responseJson: NFTMetadata[] = response!.map((item: any) => {
            const tokenId = String(item[0]);
            const tokenKey = `${tokenId}-${collectionAddress}`;
            if (processedTokens.has(tokenKey)) return null;
            setProcessedTokens(prev => new Set(prev.add(tokenKey)))
            return {
              tokenId: String(item[0]),
              tokenURI: `https://red-mad-woodpecker-146.mypinata.cloud/ipfs/${item[1]}`,
              tokenName: item[2],
              fromCollection: collectionAddress
            }
          }).filter(Boolean) as NFTMetadata[];

          setUserCreated(prevState => [...prevState, ...responseJson])
          console.log(responseJson)
        } catch (error) {
          console.log("Cannot get the user specific collection NFTs.")
        }
      }
    } catch (error) {
      console.log("Cannot get collection", error);
    }
  }
  useEffect(() => {
    return () => {
      if (userCreated.length === 0) return;
      setUserCreated([]);
      setProcessedTokens(new Set<string>());
    };
  }, [])
  useEffect(() => {
    getCollectionOfUser();

  }, [walletAddress])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {
        userCreated.map((nft: any) => {
          return (<Card
            // image="https://images.unsplash.com/photo-1682695795557-17447f921f79?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            image={`${nft.tokenURI}`}
            title={`${nft.tokenName}`}
            redirect={`/nft/${nft.tokenId}`}
            key={`${nft.tokenId}+${nft.fromCollection}`}
          />)
        })
      }
    </div>
  );
};

export default Created;
