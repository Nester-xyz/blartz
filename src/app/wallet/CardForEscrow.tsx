"use client"
import React, { useContext, useEffect, useState } from 'react'
import CustomButton from "@/Components/UI/CustomButton";
import Image from "next/image";
import { NavigationContext } from '../api/NavigationContext';
import WalletContractABI from "../deployed/WalletContract.json"
import { web3 } from '../api/ContractAPI';
type Props = {
    item: any;
};

const CardForEscrow = ({ item }: Props) => {
    const { walletAddress } = useContext(NavigationContext);
    const [depositedAmount, setDepositedAmount] = useState<any>();
    const [yeildAmount, setYeildAmount] = useState<any>()
    useEffect(() => {
        const getWalletContractDetails = async () => {
            try {
                if (!walletAddress) return;
                const walletContract = new web3.eth.Contract(WalletContractABI.abi, item);
                const depositedAmount = await walletContract.methods.getDepositedAmount().call({ from: walletAddress });
                setDepositedAmount((Number(depositedAmount)));
                const yeildAmount = await walletContract.methods.getYeildGeneratedAmount().call({ from: walletAddress });
                setYeildAmount(Number(yeildAmount));
            } catch (error) {
                console.log(error);
            }
        };

        getWalletContractDetails();
    }, [walletAddress, item]);

    return (
        <div className="flex gap-8 flex-col">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1 border p-2">
                    <div>Address: {item}</div>
                    <div className="flex gap-4 border p-2">
                        <div>Purchased/Sold NFT:</div>
                        <Image
                            src="https://via.placeholder.com/150"
                            alt="random"
                            width={100}
                            height={100}
                        />
                    </div>
                    <div>Deposited Amount: {String(depositedAmount)} ETH</div>
                    <div className="flex gap-4 items-center">
                        <div>
                            <CustomButton
                                text="Check"
                                onclick={() => {
                                    console.log("clicked");
                                }}
                            />
                        </div>
                        <div>
                            This button is used to check for get back of the initial deposited
                            amount for Buyer!
                        </div>
                    </div>
                    <div>Yield generated: {String(yeildAmount)} ETH</div>
                    <div>
                        <CustomButton
                            text="Claim"
                            onclick={() => {
                                console.log("clicked");
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardForEscrow;