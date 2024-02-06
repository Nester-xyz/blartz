"use client";
import React, { useState, useRef, useEffect } from "react";

type Props = {};

const Index = (props: Props) => {
  const [image, setImage] = useState<File>();

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="grid place-items-center">
        <div className="w-[35rem]  h-[35rem] relative border-primary border-2 rounded-md grid place-content-center text-center text-5xl text-primary gap-2">
          <div
            className=" w-full h-full absolute top-0 left-0 grid place-items-center "
            onClick={() => {
              inputRef.current?.click();
            }}
          >
            {image ? (
              <div className=" w-full h-full overflow-hidden border border-black  mx-auto">
                <img
                  src={URL.createObjectURL(image)}
                  alt=""
                  onClick={() => inputRef.current?.click()}
                  className="w-full h-full object-cover"
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
      </div>
      <div className="grid place-content-center">
        <div className="flex flex-col gap-10">
          <div className="text-5xl">Mint</div>
          <div className="flex flex-col gap-2">
            <div className="text-2xl">Collection Name</div>
            <input
              type="text"
              name=""
              id=""
              className="bg-black border-primary border-2 rounded py-2 px-5 focus:outline-none "
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-2xl"> Mint Name</div>
            <input
              type="text"
              name=""
              id=""
              className="bg-black border-primary border-2 rounded py-2 px-5 focus:outline-none "
            />
          </div>
          <div>
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
  );
};

export default Index;
