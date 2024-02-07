"use client";
import React, { useState, useRef, useEffect } from "react";
import { PrivyProvider } from "@privy-io/react-auth";
import Nav from "../Nav";

type Props = {};

const handleLogin = (user: any) => {
  console.log(`User ${user.id} logged in!`);
};

const Index = (props: Props) => {
  const [image, setImage] = useState<File>();

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <PrivyProvider
        appId="clsbdu38i06e9mr83ufba7gsn"
        onSuccess={handleLogin}
        config={{
          loginMethods: ["email", "wallet"],
          appearance: {
            theme: "light",
            accentColor: "#676FFF",
          },
        }}
      >
        <Nav />
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
                    onChange={(e) => {
                      setImage(e.target.files![0]);
                    }}
                  />
                </div>
              </div>
              {/* <div>+</div>
          <div className="text-4xl">Upload</div> */}
            </div>
            <div className="block md:hidden">
              <button className="border-2 border-primary relative group rounded-md text-primary overflow-hidden px-8 py-3">
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
              <div className="flex flex-col gap-2">
                <div className="text-2xl">Collection Name</div>
                <input
                  spellCheck="false"
                  type="text"
                  name=""
                  id=""
                  className="bg-black border-primary border-2 rounded py-2 px-5 focus:outline-none "
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-2xl">Your NFT Name</div>
                <input
                  spellCheck="false"
                  type="text"
                  name=""
                  id=""
                  className="bg-black border-primary border-2 rounded py-2 px-5 focus:outline-none "
                />
              </div>
              <div className="hidden md:block">
                <button className="border-2 border-primary relative group rounded-md text-primary overflow-hidden px-8 py-3">
                  <div className="text-primary group-hover:text-black  z-50 relative">
                    Mint
                  </div>
                  <div className="bg-primary  absolute  w-0 group-hover:w-full left-0 top-0 bottom-0 transition-all ease-in-out duration-500"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </PrivyProvider>
    </>
  );
};

export default Index;
