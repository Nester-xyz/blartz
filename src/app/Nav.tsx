"use client";
import React, { useState, useEffect } from "react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import Link from "next/link";

type Props = {};

const Nav = (props: Props) => {
  const { connectWallet } = usePrivy();
  const { wallets } = useWallets();
  const { logout } = usePrivy();
  const [isLoggedOut, setisLoggedOut] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const storeToLocalStorage = async () => {
    await connectWallet();
    if (wallets[0]?.address)
      localStorage.setItem("wallet_address", wallets[0]?.address);
    setWalletAddress(wallets[0]?.address);
  };

  const getDataFromLocalStorage = () => {
    const address = localStorage.getItem("wallet_address");
    if (address) {
      setWalletAddress(address);
    }
  };

  const clearDataFromLocalStorage = () => {
    localStorage.removeItem("wallet_address");
    setWalletAddress("");
  };

  useEffect(() => {
    getDataFromLocalStorage();
  }, []);

  return (
    <div className="text-white flex justify-between mt-3 mx-3 md:mx-20">
      <Link href={"/"}>
        <h1 className="text-4xl select-none">Blartz ⚡</h1>
      </Link>
      <div className="group relative ">
        <div
          className="border-2 border-primary relative group rounded-md text-primary h-11 overflow-hidden px-4 py-1.5"
          onClick={() => {
            if (!walletAddress) {
              storeToLocalStorage();
            }
          }}
        >
          <button className="text-primary group-hover:text-black z-50 relative text-sm">
            {!walletAddress
              ? "Connect Wallet"
              : walletAddress.slice(0, 5) + "..." + walletAddress.slice(-5)}
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
        {walletAddress && (
          <button
            className="hidden group-hover:block absolute top-full eft-0 w-full h-full z-0"
            onClick={() => {
              logout();
              setisLoggedOut(true);
              clearDataFromLocalStorage();
            }}
          >
            Log out
          </button>
        )}
      </div>
    </div>
  );
};

export default Nav;
