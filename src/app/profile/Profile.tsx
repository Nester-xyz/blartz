"use client";
import Layout from "@/Components/Layout";
import React, { useState, useEffect } from "react";
import Created from "./Created";
import Collected from "./Collected";

type Props = {};

const Profile = (props: Props) => {
  const [tab, setTab] = useState<"Created" | "Collected">("Created");
  const [activePage, setActivePage] = useState<JSX.Element>();

  useEffect(() => {
    if (tab === "Created") {
      setActivePage(<Created />);
    }
    if (tab === "Collected") {
      setActivePage(<Collected />);
    }
  }, [tab]);

  return (
    <>
      <Layout>
        <div className="p-3 mt-10 ">
          <div className="w-full h-full relative flex flex-row items-center gap-4 ">
            {/* profile */}
            <div className=" w-24 bg-yellow-100 aspect-square rounded-full shadow-lg"></div>
            <div className="flex flex-col">
              <div>Account Name</div>
              <div>Address:</div>
              <div>Onchain since:</div>
            </div>
          </div>
          {/* Collected & Created */}
          <div className="ml-2">
            <div className="w-full relative mt-10 gap-20 flex ">
              {["Created", "Collected"].map((val, index) => (
                <div
                  key={index}
                  className={`group cursor-pointer relative  `}
                  onClick={() => setTab(val as "Created" | "Collected")}
                >
                  {val}
                  <div
                    className={`absolute ${
                      val === tab ? "w-full" : "w-0"
                    } group-hover:w-full h-0.5 bg-primary bottom-0 transition-all duration-500`}
                  ></div>
                </div>
              ))}
            </div>
            <div className="mt-10">{activePage}</div>
          </div>
        </div>
        {/* ); */}
      </Layout>
    </>
  );
};

export default Profile;
