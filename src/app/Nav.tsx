"use client";
import React from "react";
import { usePrivy, useWallets } from "@privy-io/react-auth";

type Props = {};

const Nav = (props: Props) => {
  const { connectWallet, ready, authenticated } = usePrivy();
  const { wallets } = useWallets();
  const { logout } = usePrivy();
  return (
    <div className="text-white flex justify-between mt-3 mx-3 md:mx-20">
      <div>
        <h1 className="text-4xl select-none">Blartz ⚡</h1>
      </div>
      <div>
        <button onClick={logout}>Log out</button>
      </div>
      <div
        className="border-2 border-primary relative group rounded-md text-primary h-11 overflow-hidden px-4 py-1.5"
        onClick={() => {
          connectWallet();
        }}
      >
        <button className="text-primary group-hover:text-black z-50 relative text-sm">
          {wallets[0]
            ? wallets[0].address.slice(0, 5) +
              "..." +
              wallets[0].address.slice(-5)
            : "Connect Wallet"}
        </button>
        <div className="bg-primary  absolute  w-0 group-hover:w-full left-0 top-0 bottom-0 transition-all ease-in-out duration-500"></div>
        {/* <p>{wallets[0] ? wallets[0].address : "none"}</p> */}
        {/* <button
          onClick={() => wallets[0]?.loginOrLink()}
          disabled={!ready || !wallets[0] || !authenticated}
        >
          Login
        </button> */}
      </div>
    </div>
  );
};

export default Nav;
