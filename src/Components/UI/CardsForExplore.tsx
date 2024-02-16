"use client";

import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import { toast } from "react-hot-toast";
import { NavigationContext } from "@/app/api/NavigationContext";
import BlastNFTABI from "../../app/deployed/BlastNFT.json";
import { web3 } from "../../app/api/ContractAPI";
type ActiveNFTDataType = {
  collection: string;
  tokenPrice: string;
  tokenId: string; // In ETH
};
type Props = {
  item: ActiveNFTDataType;
};
function clicked() {
  toast("yet to implement this");
}

const CardsForExplore = ({ item }: Props) => {
  let collectionContract: any;
  const { walletAddress } = useContext(NavigationContext);
  const [title, setTitle] = useState("");
  const [imgSrc, setImgSrc] = useState("https://via.placeholder.com/150");
  const getNFTDetails = async () => {
    try {
      collectionContract = new web3.eth.Contract(
        BlastNFTABI.abi,
        item.collection
      );
      const tokenURIandName = await collectionContract.methods
        .getURIAndName(BigInt(item.tokenId))
        .call({ from: walletAddress });
      console.log(tokenURIandName);
      setTitle(tokenURIandName[1]);
      setImgSrc(
        `https://red-mad-woodpecker-146.mypinata.cloud/ipfs/${tokenURIandName[0]}`
      );
    } catch (error) {
      console.log("Error getting uri and name");
    }
  };
  useEffect(() => {
    getNFTDetails();
  }, [walletAddress]);
  return (
    <div className="w-7/12 mx-auto">
      <div
        className="w-full aspect-square border cursor-pointer"
        onClick={() => {
          window.location.href = `/nft/${item.collection}/${item.tokenId}`;
        }}
      >
        <Image
          src={imgSrc}
          alt="profile"
          sizes="100%"
          width={100}
          height={100}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex justify-between mt-2">
        <div>
          <div>{title || "Loading..."}</div>
          <div>{item.tokenPrice} ETH</div>
        </div>
        <CustomButton text="Buy" onclick={clicked} />
      </div>
    </div>
  );
};

export default CardsForExplore;
