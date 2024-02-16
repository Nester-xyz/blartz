"use client";
import Layout from "../../Components/Layout";
import React, { useContext, useEffect, useState } from "react";
import { marketplaceContract } from "../api/ContractAPI";
import { NavigationContext } from "../api/NavigationContext";
import CardsForExplore from "@/Components/UI/CardsForExplore";

type Props = {};

type ActiveNFTDataType = {
  collection: string;
  tokenPrice: string;
  tokenId: string; // In ETH
};

const Explore = (props: Props) => {
  const { walletAddress } = useContext(NavigationContext);
  const [forSaleNFTData, setForSaleNFTData] = useState<ActiveNFTDataType[]>([]);
  const [processedTokens, setProcessedTokens] = useState<Set<string>>(
    new Set()
  );

  function toEthString(weiBigInt: any) {
    const weiString = weiBigInt.toString();
    const paddedWeiString = weiString.padStart(18, "0");
    const ethString =
      paddedWeiString.length > 18
        ? paddedWeiString.slice(0, paddedWeiString.length - 18) +
          "." +
          paddedWeiString.slice(paddedWeiString.length - 18)
        : "0." + paddedWeiString.slice(paddedWeiString.length - 18);
    return ethString.replace(/\.?0+$/, "");
  }

  const getAllMarketPlaceListedNFTs = async () => {
    try {
      const response = await marketplaceContract.methods
        .getAllActiveTokens()
        .call({ from: walletAddress });
      console.log(response);

      const newProcessedTokens = new Set<string>();
      const activeNFTs = response
        .map((item: any) => {
          const tokenId = String(item[1]);
          const collectionAddress = item[0];
          const tokenKey = `${tokenId}-${collectionAddress}`;

          // Check if the token has already been processed
          if (processedTokens.has(tokenKey)) return null;

          // Add the token key to the new set of processed tokens
          newProcessedTokens.add(tokenKey);

          return {
            tokenId: tokenId,
            tokenPrice: toEthString(BigInt(item[2])),
            collection: collectionAddress,
          };
        })
        .filter(Boolean);

      // Update the processed tokens state
      setProcessedTokens(newProcessedTokens);

      // Set the forSaleNFTData state with the filtered active NFTs
      setForSaleNFTData(activeNFTs);
    } catch (error) {
      console.log("Error getting the listed NFTs data (Marketplace):", error);
    }
  };

  useEffect(() => {
    getAllMarketPlaceListedNFTs();
  }, [walletAddress]);

  return (
    <Layout>
      {forSaleNFTData.map((item) => (
        <CardsForExplore
          key={`${item.tokenId}-${item.collection}`}
          item={item}
        />
      ))}
    </Layout>
  );
};

export default Explore;
