"use client";
import Layout from "@/Components/Layout";
import React, { useContext, useEffect, useState } from "react";
import CardForEscrow from "./CardForEscrow";
import { NavigationContext } from "../api/NavigationContext";
import { marketplaceContract } from '../api/ContractAPI'
type Props = {};

const page = (props: Props) => {
    const { walletAddress } = useContext(NavigationContext);
    const [buySellWallet, setBuySellWallet] = useState<any[]>();
    // const [buyWallet, setBuyWallet] = useState([]);
    const getBuyingWalletDetails = async () => {
        try {
            const response: any = await marketplaceContract.methods.getBuyerToWalletAddress().call({ from: walletAddress });
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
    const getSellingWalletDetails = async () => {
        try {
            const response: any = await marketplaceContract.methods.getSellerToWalletAddress().call({ from: walletAddress });
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
    const setAllStates = async () => {
        const response1 = await getBuyingWalletDetails();
        const response2 = await getSellingWalletDetails();
        setBuySellWallet([...response1, ...response2])
    }
    useEffect(() => {
        setAllStates();
    }, [walletAddress])

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
                            {buySellWallet?.map((item, index) => (<>{index + 1}. <CardForEscrow item={item} /></>))}
                            {/* 1. <CardForEscrow /> */}
                        </div>

                    </div>
                </div>
            </Layout>
        </div>
    );
};

export default page;