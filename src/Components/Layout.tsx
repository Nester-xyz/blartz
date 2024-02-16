import React, { ReactNode } from "react";
import Link from "next/link";
import Nav from "@/Navigation/Nav";
import CustomButton from "./UI/CustomButton";
import { Toaster } from "react-hot-toast";
type Props = {
  children: ReactNode;
};

type tabs = {
  name: string;
  link: string;
};

const tabs: tabs[] = [
  {
    name: "Explore",
    link: "/explore",
  },
  {
    name: "Wallet",
    link: "/wallet"
  },
  {
    name: "Profile",
    link: "/profile",
  },

];

const Layout = ({ children }: Props) => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-screen z-50 py-2 sticky top-0 bg-black ">
        <Nav />
      </div>
      <div className="text-white h-full w-full ">
        <div className="  grid  grid-cols-12">
          <div className="col-span-2 w-fit text-white ">
            <div className="flex flex-col justify-between h-full fixed top-36 left-6">
              <div className="flex flex-col gap-5">
                {tabs.map((tab, index) => {
                  return (
                    <div className="group relative">
                      <Link href={tab.link} key={index} className="flex gap-2">
                        <div className="text-xl">{tab.name}</div>
                      </Link>
                      <div className="absolute w-0 group-hover:w-full h-0.5 bg-primary bottom-0 transition-all duration-500"></div>
                    </div>
                  );
                })}
              </div>
              <div className="fixed bottom-48 left-5">
                <CustomButton text="Create" link="/create" />
              </div>
            </div>
          </div>
          <div className="col-span-8 bg-black h-full">{children}</div>
          <div className="col-span-2  h-full"></div>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={true} />
    </div>
  );
};

export default Layout;
