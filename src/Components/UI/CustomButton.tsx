import React from "react";
import Link from "next/link";

type Props = {
  text: string;
  link?: string;
  onclick?: () => void;
};

const CustomButton = ({ text, link, onclick }: Props) => {
  return (
    <div>
      {link ? (
        <Link href={link}>
          <button className="border-2 border-primary relative group rounded-md text-primary overflow-hidden px-8 py-3">
            <div className="text-primary group-hover:text-black  z-50 relative">
              {text}
            </div>
            <div className="bg-primary  absolute  w-0 group-hover:w-full left-0 top-0 bottom-0 transition-all ease-in-out duration-500"></div>
          </button>
        </Link>
      ) : (
        <button
          onClick={onclick ? onclick : () => { }}
          className="border-2 border-primary relative group rounded-md text-primary overflow-hidden px-8 py-3"
        >
          <div className="text-primary group-hover:text-black  z-50 relative">
            {text}
          </div>
          <div className="bg-primary  absolute  w-0 group-hover:w-full left-0 top-0 bottom-0 transition-all ease-in-out duration-500"></div>
        </button>
      )}
    </div>
  );
};

export default CustomButton;
