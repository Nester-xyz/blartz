import React from "react";
import Image from "next/image";
import defaultImg from "../../../public/default.jpeg";
import mainImg from "../../../public/main.webp";

type Props = {};

const Index = (props: Props) => {
  return (
    <div className="">
      <div className="w-screen h-fit  md:h-screen  bg-black pb-20 grid md:grid-rows-5 text-primary">
        <div className=" pt-16 md:row-span-4 flex flex-col-reverse gap-8 md:grid md:grid-cols-3  ">
          <div className="col-span-2 bg-black grid place-items-center">
            <div className="text-left flex flex-col gap-5 w-9/12">
              <h1 className="text-5xl">Blartz ⚡</h1>
              <p className="text-lg text-primary">
                The NFT marketplace you&apos;ve have ever wanted.
              </p>
              {/* <div>
                <button className="border-2 border-primary relative group rounded-md text-primary overflow-hidden px-8 py-3">
                  <div className="text-primary group-hover:text-black  z-50 relative">
                    Connect Wallet
                  </div>
                  <div className="bg-primary  absolute  w-0 group-hover:w-full left-0 top-0 bottom-0 transition-all ease-in-out duration-500"></div>
                </button>
              </div> */}
            </div>
          </div>
          <div className=" mx-auto grid place-items-center">
            <div className="w-80 h-80 md:w-96 md:h-96 border border-primary shadow-2xl rounded-xl grid place-items-center">
              <Image
                src={mainImg}
                className="rounded-xl"
                alt="main_img"
              ></Image>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-9/12 mx-auto h-fit md:w-full px-0 md:px-20 pt-10">
          <div className="text-3xl text-primary">Slaves</div>
          <div className="tex-md">
            <div className="flex flex-col md:grid md:grid-cols-3 gap-5">
              <div className="flex items-center px-3 md:px-5 py-2 gap-2 border border-primary rounded-lg">
                <div className="w-10 h-10 bg-primary rounded-full flex-shrink-0">
                  <Image
                    className="rounded-full"
                    src={defaultImg}
                    alt="slave"
                  ></Image>
                </div>
                <div className="flex flex-col text-primary">
                  <div className="text-xl">Alex commoner</div>
                  <div className="text-sm">Co-founder, Frontend</div>
                </div>
              </div>
              <div className="flex items-center px-3 md:px-5 py-2 gap-2 border border-primary rounded-lg">
                <div className="w-10 h-10 bg-primary rounded-full flex-shrink-0">
                  <Image
                    className="rounded-full"
                    src={defaultImg}
                    alt="slave"
                  ></Image>
                </div>
                <div className="flex flex-col text-primary">
                  <div className="text-xl">Aryog</div>
                  <div className="text-sm">Co-founder, Smart Contract </div>
                </div>
              </div>
              <div className="flex items-center px-3 md:px-5 py-2 gap-2 border border-primary rounded-lg">
                <div className="w-10 h-10 bg-primary rounded-full flex-shrink-0">
                  <Image
                    className="rounded-full"
                    src={defaultImg}
                    alt="slave"
                  ></Image>
                </div>
                <div className="flex flex-col text-primary">
                  <div className="text-xl">Anku</div>
                  <div className="text-sm">Co founder, Full-Stack</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
