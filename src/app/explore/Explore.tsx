"use client"
import Layout from "../../Components/Layout";
import React, { useContext, useEffect } from "react";
import { marketplaceContract } from "../api/ContractAPI";
import { NavigationContext } from "../api/NavigationContext";
type Props = {};

const Explore = (props: Props) => {
  const { walletAddress } = useContext(NavigationContext);
  const getAllMarketPlaceListedNFTs = async () => {
    try {
      const response = await marketplaceContract.methods.getAllActiveTokens().call({ from: walletAddress })
      console.log(response);
    } catch (error) {
      console.log("Error getting the listed nfts data (Marketplace).", error)
    }
  }
  useEffect(() => {
    getAllMarketPlaceListedNFTs();
  }, [walletAddress])

  return (
    <Layout>
      <div className="text-white">Explore</div>
    </Layout>
  );
};

export default Explore;
