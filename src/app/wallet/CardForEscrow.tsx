import React from "react";
import CustomButton from "@/Components/UI/CustomButton";
import Image from "next/image";

type Props = {};

const CardForEscrow = (props: Props) => {
  return (
    <div className="flex gap-8 flex-col">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 border p-2">
          <div>Address: 0xXXXXXXXXXXXX</div>
          <div className="flex gap-4 border p-2">
            <div>Purchased/Sold NFT:</div>
            <Image
              src="https://fastly.picsum.photos/id/193/200/200.jpg?hmac=JHo5tWHSRWvVbL3HX6rwDNdkvYPFojLtXkEGEUCgz6A"
              alt="random"
              width={100}
              height={100}
            />
          </div>
          <div>Deposited Amount: XXX ETH</div>
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
          <div>Yield generated: XXX ETH</div>
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
