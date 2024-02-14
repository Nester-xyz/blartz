"use client"
import React, { useState, useEffect } from 'react'
import { usePathname } from "next/navigation";
type Props = {}

const page = (props: Props) => {
    const router = usePathname();
    const [tokenId, setTokenId] = useState("");
    useEffect(() => {
        if (router) {
            console.log('Collection Address: ', router.split('/')[2]);
            setTokenId(router.split('/')[2]);
        }
    }, [])

    return (
        <div className='text-white'>NFT Page {tokenId}</div>
    )
}

export default page