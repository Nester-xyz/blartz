import React, { ChangeEvent, useState } from "react";
import { blastNFTFactoryContract } from "../api/contract";
type Props = {};
type CollectionData = {
  name: string;
  symbol: string;
}
const page = (props: Props) => {
  const [collectionData, setCollectionData] = useState<CollectionData>({ name: "", symbol: "" })

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCollectionData(prev => ({ ...prev, [name]: value }))
  }
  const handleCreateCollection = async () => {
    try {
      console.log(collectionData);
      const response = await blastNFTFactoryContract.methods.createCollection(collectionData.name, collectionData.symbol).send();
      console.log(response);
    } catch (error) {
      console.log("Error creating collection:", error);
    }
  }
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
