"use client";
import React, { useState, useEffect, useContext, ChangeEvent } from "react";
import { usePathname } from "next/navigation";
import CustomButton from "@/Components/UI/CustomButton";
import Layout from "@/Components/Layout";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { NavigationContext } from "@/app/api/NavigationContext";
import BlastNFTABI from '../../../deployed/BlastNFT.json'
import { web3 } from "@/app/api/ContractAPI";
import { marketplaceContract } from "@/app/api/ContractAPI";
type Props = {};

const page = (props: Props) => {
  const router = usePathname();
  const { walletAddress } = useContext(NavigationContext);
  const [tokenId, setTokenId] = useState("");
  const [collectionAddress, setCollectionAddress] = useState("");
  const [imgSrc, setImgSrc] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [ownerOfNft, setOwnerOfNft] = useState("");
  const [isAlreadyListed, setIsAlreadyListed] = useState(false);
  const [price, setPrice] = useState(0);
  let collectionContract: any;
  const getTokenDetails = async () => {
    try {
      if (collectionAddress.length === 0 && tokenId.length === 0) return;
      if (walletAddress == null) return;
      collectionContract = new web3.eth.Contract(BlastNFTABI.abi, collectionAddress);
      const response: any = await collectionContract.methods.getURIAndName(BigInt(tokenId)).call({ from: walletAddress })
      setImgSrc(`https://red-mad-woodpecker-146.mypinata.cloud/ipfs/${response[0]}`);
      setTitle(response[1]);
      // Check if already listed
      const isListed = await marketplaceContract.methods.isNFTListed(collectionAddress, BigInt(tokenId)).call({ from: walletAddress });
      console.log("Is NFT listed:", isListed);
      setIsAlreadyListed(isListed);
    } catch (error) {
      console.error("Error getting the token details")
    }
  }
  const handleBuyWithYield = async () => {
    try {
      const tokenPrice = await marketplaceContract.methods.getTokenPrice(collectionAddress, BigInt(tokenId)).call({ from: walletAddress })
      const response = await marketplaceContract.methods.purchaseNFTWithYeild(collectionAddress, BigInt(tokenId)).send({ from: walletAddress, value: tokenPrice });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  const getIfAlreadyOwner = async (tokenId: string) => {
    try {
      const response = await collectionContract.methods.nftOwner(BigInt(tokenId)).call({ from: walletAddress });
      console.log(response)
      setOwnerOfNft(response);
    } catch (error) {
      console.log("Error finding the owner", error);
    }
  }
  const handleToggleForSale = async () => {
    try {
      console.log("clicked for sale btn")
      // TODO: Ask for the approval to the Marketplace contract
      if (!isAlreadyListed) {
        await collectionContract.methods.approveMarketplaceNFT(BigInt(tokenId)).send({ from: walletAddress })
      }
      // Step 2: Call toggleNFTForSale function
      const response = await marketplaceContract.methods.toggleNFTForSale(collectionAddress, BigInt(tokenId), String(Number(price) * 1e18)).send({ from: walletAddress });

      console.log(response); // Log the transaction receipt

      // Optionally, check if the NFT is listed and get its price
      const isListed = await marketplaceContract.methods.isNFTListed(collectionAddress, BigInt(tokenId)).call({ from: walletAddress });
      console.log("Is NFT listed:", isListed);

      const tokenPrice = await marketplaceContract.methods.getTokenPrice(collectionAddress, BigInt(tokenId)).call({ from: walletAddress });
      console.log("NFT Price:", tokenPrice);
      setIsAlreadyListed(!isAlreadyListed)
    } catch (error) {
      console.log(error)
    }
  }
  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(parseFloat(e.target.value));
  }
  useEffect(() => {
    if (router) {
      console.log("Collection Address: ", router.split("/")[2]);
      setTokenId(router.split("/")[3]);
      setCollectionAddress(router.split("/")[2]);
    }
    getTokenDetails();
    getIfAlreadyOwner(router.split("/")[3]);
  }, [walletAddress, tokenId, title, collectionContract, isAlreadyListed, price, handleBuyWithYield]);

  return (
    <Layout>
      <div className="text-white grid grid-cols-12 h-screen place-content-center">
        <div className="col-span-8">
          <div className="w-80 h-80 border border-primary rounded-lg">
            <Image
              src={imgSrc}
              width={150}
              height={150}
              alt="nft"
              sizes="100%"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className=" col-span-4 flex flex-col gap-10">
          <div className="text-5xl">{title}</div>
          {(!isAlreadyListed && walletAddress?.toLowerCase() === ownerOfNft.toLowerCase()) && <div className="flex flex-col gap-2">
            <div className="text-2xl">Price</div>
            <input
              spellCheck="false"
              type="number"
              name="price"
              id=""
              value={price}
              onChange={handlePriceChange}
              className="bg-transparent border-primary border-2 rounded py-2 px-5 focus:outline-none "
            />
          </div>}
          {walletAddress?.toLowerCase() === ownerOfNft.toLowerCase()
            ? (isAlreadyListed ? <CustomButton text="Remove From Sale" onclick={() => handleToggleForSale()} /> : <CustomButton text="List For Sale" onclick={() => handleToggleForSale()} />)
            : (isAlreadyListed ? <CustomButton text="Buy With Yield" onclick={handleBuyWithYield} /> : <CustomButton text="Not For Sale" />)}
        </div>
      </div>
    </Layout>
  );
};

export default page;
