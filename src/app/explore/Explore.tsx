import React from "react";

type Props = {};

const Explore = (props: Props) => {
  return (
    <div className="text-white grid grid-cols-12 h-screen w-screen">
      <div className="bg-green-800 col-span-2 text-4xl">
        <div className="flex flex-col justify-center items-center h-full">
          <div>Home</div>
          <div>My Profile</div>
          <div>
            <button>Create</button>
          </div>
        </div>
      </div>
      <div className="bg-yellow-500 col-span-8"></div>
      <div className="bg-red-700 col-span-2"></div>
    </div>
  );
};

export default Explore;
