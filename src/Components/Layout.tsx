import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="text-white w-full h-screen grid grid-cols-12 bg-red-400">
      <div className="col-span-2 bg-green-500 h-full"></div>
      <div className="col-span-8 bg-yellow-700 h-full">{children}</div>
      <div className="col-span-2 bg-blue-800 h-full"></div>
    </div>
  );
};

export default Layout;
