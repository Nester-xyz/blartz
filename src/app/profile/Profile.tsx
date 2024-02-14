import Layout from "@/Components/Layout";
import React from "react";

type Props = {};

const Profile = (props: Props) => {
  return (
    <>
      <Layout>
        <div className="p-3 mt-10 ml-10">
          <div className="w-full h-full relative flex flex-row items-center gap-4 ">
            {/* profile */}
            <div className=" w-24 bg-yellow-100 aspect-square rounded-full left-4 -bottom-12 shadow-lg"></div>
            <div className="flex flex-col">
              <div>Account Name</div>
              <div>Address:</div>
              <div>Onchain since:</div>
            </div>
          </div>
          {/* Collected & Created */}
          <div className="w-full relative mt-10 gap-20 ml-2 flex flex-row">
            <div className="group">
              Created
              <div className="absolute w-0 group-hover:w-[4.3rem] h-0.5 bg-primary bottom-0 transition-all duration-500"></div>
            </div>
            <div className="group">
              Collected
              <div className="absolute w-0 group-hover:w-[5.2rem] h-0.5 bg-primary bottom-0 transition-all duration-500"></div>
            </div>
          </div>
        </div>
        {/* ); */}
      </Layout>
    </>
  );
};

export default Profile;
