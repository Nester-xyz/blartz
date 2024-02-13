import React, { ChangeEvent, useEffect, useState } from "react";
import { blastNFTFactoryContract } from "../api/contract";
import { checkActiveAccount, getCurrentActiveAccount } from "../api/utils/appUtil";
type Props = {
};
type CollectionData = {
  name: string;
  symbol: string;
}
const page = (props: Props) => {
  const [currentActiveAcc, setCurrentActiveAcc] = useState<string | null>("")
  const [collectionData, setCollectionData] = useState<CollectionData>({ name: "", symbol: "" })
  const [userCollections, setUserCollections] = useState([])
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCollectionData(prev => ({ ...prev, [name]: value }))
  }
  const handleCreateCollection = async () => {
    try {
      if (collectionData.name.length === 0 || collectionData.symbol.length === 0) return;
      if (currentActiveAcc == null) return;
      console.log(collectionData);
      const response = await blastNFTFactoryContract.methods.createCollection(collectionData.name, collectionData.symbol).send({ from: currentActiveAcc });
      console.log(response)
      console.log("Collection Address", response?.logs[0].address);
    } catch (error) {
      console.log("Error creating collection:", error);
    }
  }
  const handleGetCreatorCollections = async () => {
    try {
      const response: any = await blastNFTFactoryContract.methods.getCreatorCollections().call({ from: "0xEd5466474578E2F5c2cA9f088908102C17E10FDE" });
      console.log(response)
      setUserCollections(response);

    } catch (error) {
      console.log("Cannot get collection")
    }
  }
  const getAccount = async () => {
    if (checkActiveAccount()) return;
    const acc: any = await getCurrentActiveAccount();
    if (acc == undefined) return;
    setCurrentActiveAcc(acc[0].address);
    console.log("Current Create Page Active Account is", acc[0].address)
  }
  function handleAccountChange(accounts: any) {
    setCurrentActiveAcc(accounts[0]);
    console.log("Current Create Page Active Account is", accounts[0])
  }
  if (window.ethereum) {
    // Listen for account changes
    window.ethereum.on("accountsChanged", handleAccountChange);
  } else {
    console.log("Ethereum provider not found")
  }
  useEffect(() => {
    getAccount();
  }, [])
  return (
    <>
      <div className="flex flex-col-reverse md:grid grid-cols-2 h-screen bg-black text-white">
        <div className="grid place-content-center">
          <div className="flex flex-col gap-10">
            <div className="text-5xl">Create Collection</div>
            <div className="flex flex-col gap-2">
              <div className="text-2xl">Your Contract Name</div>
              <input
                spellCheck="false"
                type="text"
                name="name"
                value={collectionData.name}
                id=""
                onChange={handleOnChange}
                className="bg-black border-primary border-2 rounded py-2 px-5 focus:outline-none "
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-2xl">Symbol</div>
              <input
                spellCheck="false"
                type="text"
                name="symbol"
                value={collectionData.symbol}
                id=""
                onChange={handleOnChange}
                className="bg-black border-primary border-2 rounded py-2 px-5 focus:outline-none "
              />
            </div>
            <div className="hidden md:block">
              <button className="border-2 border-primary relative group rounded-md text-primary overflow-hidden px-8 py-3" onClick={handleCreateCollection}>
                <div className="text-primary group-hover:text-black  z-50 relative">
                  Create
                </div>
                <div className="bg-primary  absolute  w-0 group-hover:w-full left-0 top-0 bottom-0 transition-all ease-in-out duration-500"></div>
              </button>
              {/* Code Added by Yogesh */}
              <div>
                <button onClick={handleGetCreatorCollections}>Get my collection</button>
                <div>
                  {userCollections}
                </div>
              </div>
              {/* =================== */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
