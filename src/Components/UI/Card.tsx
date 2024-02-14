import React from "react";
import Image from "next/image";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";

type Props = {
  image: string;
  title: string;
  redirect?: string;
};

const Card = ({ image, title, redirect }: Props) => {
  return (
    <>
      {redirect ? (
        <Link href={redirect}>
          <div className="border border-primary rounded overflow-hidden">
            <div className="w-full aspect-square ">
              <Image
                src={image}
                className="w-full h-full object-cover"
                alt="profile"
                sizes={`100%`}
                width={100}
                height={100}
              />
            </div>

            <div className="flex flex-col ml-2 my-1">
              <div>{title}</div>
            </div>
          </div>
        </Link>
      ) : (
        <div className="border  border-primary rounded overflow-hidden">
          <div className="w-full aspect-square ">
            <Image
              src={image}
              className="w-full h-full object-cover  "
              alt="profile"
              sizes={`100%`}
              width={100}
              height={100}
            />
          </div>

          <div className="flex flex-col ml-2 my-1">
            <div>{title}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
