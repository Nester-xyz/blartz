import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return <div className="text-white w-full h-full bg-red-400"></div>;
};

export default Layout;
