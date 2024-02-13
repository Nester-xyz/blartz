import React from "react";
import Image from "next/image";
import defaultImg from "../../../public/default.jpeg";
import mainImg from "../../../public/main.webp";
import Link from "next/link";
import CustomButton from "@/Components/UI/CustomButton";

type Props = {};

const Index = (props: Props) => {
  return (
    <div className="">
      <div className="w-10/12 mx-auto h-fit md:h-screen bg-black pb-20 grid md:grid-rows-5 text-primary">
        <div className="pt-16 md:row-span-4 flex flex-col-reverse gap-8 md:grid md:grid-cols-3 bg-black">
          <div className="col-span-2  bg-black grid items-center">
            <div className="text-left flex flex-col gap-5">
              <h1 className="text-5xl">Blartz ⚡</h1>
              <p className="text-lg text-primary">
                The NFT marketplace you have ever wanted.
              </p>
              <div>
                <CustomButton text="Explore" link="/explore" />
              </div>
            </div>
          </div>
          <div className="grid justify-end items-center">
            <div className="w-80 h-80 md:w-96 md:h-96 border border-primary shadow-2xl rounded-xl ">
              <Image
                src={mainImg}
                className="rounded-xl"
                alt="main_img"
              ></Image>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 mx-auto h-fit md:w-full px-0  pt-10">
          <div className="text-3xl text-primary">Team</div>
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
