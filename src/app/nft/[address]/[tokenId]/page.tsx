"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import CustomButton from "@/Components/UI/CustomButton";
import Layout from "@/Components/Layout";
import Image from "next/image";
import { toast } from "react-hot-toast";
type Props = {};

const page = (props: Props) => {
  const router = usePathname();
  const [tokenId, setTokenId] = useState("");
  useEffect(() => {
    if (router) {
      console.log("Collection Address: ", router.split("/")[2]);
      setTokenId(router.split("/")[3]);
    }
  }, []);

  return (
    <Layout>
      <div className="text-white grid grid-cols-12 h-screen place-content-center">
        <div className="col-span-8">
          <div className="w-80 h-80 border border-primary rounded-lg">
            <Image
              src="https://via.placeholder.com/150"
              width={150}
              height={150}
              alt="nft"
              sizes="100%"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className=" col-span-4 flex flex-col gap-10">
          <div className="text-5xl">Title</div>
          <CustomButton text="Buy With Yield" />
        </div>
      </div>
    </Layout>
  );
};

export default page;
