import React, { ReactNode } from "react";
import { CiHome } from "react-icons/ci";
import Link from "next/link";

type Props = {
  children: ReactNode;
};

type tabs = {
  name: string;
  link: string;
  icon: JSX.Element;
};

const tabs: tabs[] = [
  {
    name: "Explore",
    link: "/explore",
    icon: <CiHome />,
  },
  {
    name: "Profile",
    link: "/profile",
    icon: <CiHome />,
  },
];

const Layout = ({ children }: Props) => {
  return (
    <div className="text-white w-full h-screen grid grid-cols-12 ">
      <div className="col-span-2  h-full">
        <div className="flex flex-col gap-5 ">
          {tabs.map((tab, index) => {
            return (
              <div className="group relative">
                <Link href={tab.link} key={index} className="flex gap-2">
                  <div>{tab.icon}</div>
                  <div>{tab.name}</div>
                </Link>
                <div className="absolute w-0 group-hover:w-full h-0.5 bg-primary bottom-0 transition-all duration-500"></div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="col-span-8 bg-slate-900 h-full">{children}</div>
      <div className="col-span-2  h-full"></div>
    </div>
  );
};

export default Layout;
