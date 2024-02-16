"use client";
import Layout from "@/Components/Layout";
import React from "react";
import CardForEscrow from "./CardForEscrow";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <Layout>
        <div className="text-white border rounded-md p-2 mt-16">
          <div className="flex gap-2">
            <div className="text-xl">Account Balance:</div>
            <div>XXX ETH</div>
          </div>
          <div className="text-xl">Your Escrows 👇</div>
          <div className="flex flex-col gap-4">
            <div>
              {" "}
              1. <CardForEscrow />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default page;
