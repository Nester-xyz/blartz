"use client";
import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  useContext,
} from "react";
// import MarketplaceABI from '../deployed/Marketplace.json';
import BlastNFTABI from "../../deployed/BlastNFT.json";
import { web3 } from "../../api/ContractAPI";
import { toast } from "react-hot-toast";
// import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { NavigationContext } from "../../api/NavigationContext";
import Nav from "../../../Navigation/Nav";
import pinFileToIPFS from "@/app/api/PinataIPFSapi";
import Layout from "@/Components/Layout";
type Props = {};
type NFTMetadata = {
  tokenId: string;
  tokenURI: string;
  tokenName: string;
};
const Mint = (props: Props) => {
  let collectionContract: any;
  const router = usePathname();
  const [image, setImage] = useState<File>();
  const [collectionAddress, setCollectionAddress] = useState("");
  const [collectionName, setCollectionName] = useState<String>("");
  const [nftName, setNftName] = useState("");
  const [nftURI, setNftURI] = useState("");
  const [allNftData, setAllNftData] = useState<NFTMetadata[]>();
  const [collectionSym, setCollectionSym] = useState<String>("");
  const [progress, setProgress] = useState<
    "started" | "progress" | "error" | "success"
  >("started");
  const inputRef = useRef<HTMLInputElement>(null);
  const { walletAddress } = useContext(NavigationContext);
  const getCollectionContract = async () => {
    // Instantiate the newly created collection contract
    try {
      if (collectionAddress.length === 0) return;
      collectionContract = new web3.eth.Contract(
        BlastNFTABI.abi,
        collectionAddress
      );
      const collectionName: String = await collectionContract.methods
        .getCollectionName()
        .call({ from: walletAddress });
      const collectionSym: String = await collectionContract.methods
        .getCollectionSym()
        .call({ from: walletAddress });
      setCollectionName(collectionName);
      setCollectionSym(collectionSym);
      console.log(collectionName, collectionSym);
    } catch (error) {
      console.log("Error in contract initialization");
    }
  };
  const handleMintNFT = async () => {
    try {
      setProgress("progress");
      console.log(nftName, nftURI);
      if (nftName.length === 0 || nftURI.length === 0) {
        toast.error("Name and URI are required!", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        return "Name and URI are required";
      }
      await collectionContract.methods
        .mintNFT(nftURI, nftName)
        .send({ from: walletAddress });
      // Get the total number of tokens after minting
      const totalTokens = await collectionContract.methods
        .getTokenLen()
        .call({ from: walletAddress });
      console.log("totalToken", totalTokens); // outputs 3n
      const uriAndName = await collectionContract.methods
        .getURIAndName(totalTokens - BigInt(1))
        .call({ from: walletAddress });
      setProgress("success");
      console.log("URI of nft is", uriAndName[0]);
      console.log("Name of NFT is: ", uriAndName[1]);
    } catch (error) {
      setProgress("error");
      console.log("Error during the mint of the NFT.", error);
    }
  };
  const handleOnChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    // Handle nft name change
    setNftName(e.target.value);
  };
  const handleGetCollectionNFTs = async () => {
    try {
      const response = await collectionContract.methods
        .getCollectionNFTs()
        .call({ from: walletAddress });
      const response1: NFTMetadata[] = response.map((item: any, index: any) => {
        return {
          tokenId: String(item[0]),
          tokenURI: item[1],
          tokenName: item[2],
        };
      });
      console.log(JSON.stringify(response1));

      setAllNftData(response1);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (progress === "success") {
      toast.success(progress, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      window.location.href = "/profile";
    }
    if (progress === "error") {
      toast.error(progress, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  }, [progress]);
  useEffect(() => {
    getCollectionContract();
    if (router) {
      console.log("Collection Address: ", router.split("/")[2]);
      setCollectionAddress(router.split("/")[2]);
    }
  }, [getCollectionContract, collectionAddress]);
  return (
    <>
      <Layout>
        <div className="flex flex-col-reverse md:grid grid-cols-2 h-screen bg-black text-white">
          <div className="grid place-items-center">
            <div className="w-[30rem]  h-[30rem] relative border-primary m-0 p-0 border-2 rounded-md grid place-content-center text-center text-5xl text-primary gap-2">
              <div
                className=" w-full h-full absolute top-0 left-0 grid place-items-center "
                onClick={() => {
                  inputRef.current?.click();
                }}
              >
                {image ? (
                  <div className=" w-full h-full overflow-hidden border border-black m-0 p-0 mx-auto rounded-md">
                    <img
                      src={URL.createObjectURL(image)}
                      alt=""
                      onClick={() => inputRef.current?.click()}
                      className="w-full h-full object-cover m-0 p-0"
                    />
                  </div>
                ) : (
                  <div>+</div>
                )}
                <div className="hidden gap-5">
                  {/* <label htmlFor="image">Image</label> */}
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="w-full  border border-gray-400 p-2 rounded-lg"
                    ref={inputRef}
                    onChange={async (e) => {
                      const image = e.target.files![0];
                      setImage(image);
                      // TODO: Upload to IPFS
                      if (e.target.files![0]) {
                        const { IpfsHash } = await pinFileToIPFS(image);
                        setNftURI(IpfsHash);
                        console.log(
                          "https://red-mad-woodpecker-146.mypinata.cloud/ipfs/" +
                            IpfsHash
                        );
                      }
                    }}
                  />
                </div>
              </div>
              {/* <div>+</div>
          <div className="text-4xl">Upload</div> */}
            </div>
            <div className="block md:hidden">
              <button
                className="border-2 border-primary relative group rounded-md text-primary overflow-hidden px-8 py-3"
                onClick={handleMintNFT}
                disabled={progress === "progress"}
              >
                <div className="text-primary group-hover:text-black  z-50 relative">
                  Mint
                </div>
                <div className="bg-primary  absolute  w-0 group-hover:w-full left-0 top-0 bottom-0 transition-all ease-in-out duration-500"></div>
              </button>
            </div>
          </div>
          <div className="grid place-content-center">
            <div className="flex flex-col gap-10">
              <div className="text-5xl">Mint</div>
              {/* <div className="flex flex-col gap-2">
              <div className="text-2xl">Collection Name</div>
              <input
                spellCheck="false"
                type="text"
                name=""
                id=""
                className="bg-black border-primary border-2 rounded py-2 px-5 focus:outline-none "
              />
            </div> */}
              <div className="flex flex-col gap-2">
                <div className="text-2xl">Your NFT Name</div>
                <input
                  spellCheck="false"
                  type="text"
                  onChange={handleOnChangeName}
                  value={nftName}
                  name="name"
                  id=""
                  className="bg-black border-primary border-2 rounded py-2 px-5 focus:outline-none "
                />
              </div>
              <div className="hidden md:block">
                <button
                  className="border-2 border-primary relative group rounded-md text-primary overflow-hidden px-8 py-3"
                  onClick={handleMintNFT}
                >
                  <div className="text-primary group-hover:text-black  z-50 relative">
                    Mint
                  </div>
                  <div className="bg-primary  absolute  w-0 group-hover:w-full left-0 top-0 bottom-0 transition-all ease-in-out duration-500"></div>
                </button>
              </div>
            </div>
            {/* Coded by Yogesh */}
            <div>
              <button onClick={handleGetCollectionNFTs}>Get all NFTs</button>
              <div>
                {allNftData?.map((item: NFTMetadata) => (
                  <p key={item.tokenId}>
                    {item.tokenId}: {item.tokenURI} {item.tokenName}
                  </p>
                ))}
              </div>
            </div>
            {/* ===================== */}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Mint;
