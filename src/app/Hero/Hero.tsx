import React from "react";

type Props = {};

const Index = (props: Props) => {
  return (
    <div className="">
      <div className="w-screen h-fit  md:h-screen  bg-black pb-20 grid md:grid-rows-5 text-primary">
        <div className=" pt-16 md:row-span-4 flex flex-col-reverse gap-8 md:grid md:grid-cols-3  ">
          <div className="col-span-2 bg-black grid place-items-center">
            <div className="text-left flex flex-col gap-5 w-9/12">
              <h1 className="text-5xl">Heading</h1>
              <p className="text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div>
                <button className="border-2 border-primary relative group rounded-md text-primary overflow-hidden px-8 py-3">
                  <div className="text-primary group-hover:text-black  z-50 relative">
                    Coming soon
                  </div>
                  <div className="bg-primary  absolute  w-0 group-hover:w-full left-0 top-0 bottom-0 transition-all ease-in-out duration-500"></div>
                </button>
              </div>
            </div>
          </div>
          <div className=" mx-auto grid place-items-center">
            <div className="w-80 h-80 md:w-96 md:h-96 border-2 border-primary shadow-2xl rounded-xl grid place-items-center">
              image
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-9/12 mx-auto h-fit  md:w-full px-0 md:px-20 pt-10">
          <div className="text-3xl">Slaves</div>
          <div className="tex-md">
            <div className="flex flex-col md:grid md:grid-cols-3 gap-5">
              <div className="flex items-center px-3 md:px-5 py-2 gap-2 border border-primary rounded">
                <div className="w-10 h-10 bg-primary rounded-full flex-shrink-0"></div>
                <div className="flex flex-col">
                  <div className="text-xl">Alex commoner</div>
                  <div className="text-sm">
                    Co founder and the front end guy
                  </div>
                </div>
              </div>
              <div className="flex items-center px-3 md:px-5 py-2 gap-2 border border-primary rounded">
                <div className="w-10 h-10 bg-primary rounded-full flex-shrink-0"></div>
                <div className="flex flex-col">
                  <div className="text-xl">Aryog</div>
                  <div className="text-sm">Co founder and the back end guy</div>
                </div>
              </div>
              <div className="flex items-center px-3 md:px-5 py-2 gap-2 border border-primary rounded">
                <div className="w-10 h-10 bg-primary rounded-full flex-shrink-0"></div>
                <div className="flex flex-col">
                  <div className="text-xl">Anku</div>
                  <div className="text-sm">
                    Co founder and the everything guy
                  </div>
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
