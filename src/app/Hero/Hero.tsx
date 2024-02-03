import React from "react";

type Props = {};

const Index = (props: Props) => {
  return (
    <div>
      <div className="w-screen h-screen bg-black grid grid-rows-5 text-primary">
        <div className="row-span-4 grid grid-cols-3">
          <div className="col-span-2 bg-black grid place-items-center">
            <div className="text-left flex flex-col gap-5 w-10/12">
              <h1 className="text-5xl">Heading</h1>
              <p className="text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div>
                <button className="border-2 border-primary relative group rounded-md text-primary overflow-hidden px-8 py-3">
                  <div className="text-primary group-hover:text-black  z-50 relative">
                    Connect
                  </div>
                  <div className="bg-primary  absolute  w-0 group-hover:w-full left-0 top-0 bottom-0 transition-all ease-in-out duration-500"></div>
                </button>
              </div>
            </div>
          </div>
          <div className=" grid place-items-center">
            <div className="w-96 h-96 border-2 border-primary shadow-2xl rounded-xl grid place-items-center">
              image
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 px-20">
          <div className="text-3xl">slave to the system</div>
          <div className="tex-md">
            <div className="grid grid-cols-3 gap-5">
              <div className="flex items-center px-5 py-2 gap-2 border border-primary rounded">
                <div className="w-10 h-10 bg-primary rounded-full"></div>
                <div className="flex flex-col">
                  <div>Alex commoner</div>
                  <div>Co founder and the front end guy</div>
                </div>
              </div>
              <div className="flex items-center px-5 py-2 gap-2 border border-primary rounded">
                <div className="w-10 h-10 bg-primary rounded-full"></div>
                <div className="flex flex-col">
                  <div>Aryog</div>
                  <div>Co founder and the back end guy</div>
                </div>
              </div>
              <div className="flex items-center px-5 py-2 gap-2 border border-primary rounded">
                <div className="w-10 h-10 bg-primary rounded-full"></div>
                <div className="flex flex-col">
                  <div>Aryog</div>
                  <div>Co founder and the everything end guy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
