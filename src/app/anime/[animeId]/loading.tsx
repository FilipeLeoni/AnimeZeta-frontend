import React from "react";

export default function Loading() {
  return (
    <div className="w-full flex gap-24 justify-center">
      <div className="drop-shadow-lg ">
        <div className="w-44 h-64 bg-gray-400 animate-pulse"></div>
      </div>
      <div className=" flex flex-col flex-wrap w-[620px]">
        <h1 className="text-4xl font-medium bg-gray-300 mb-2 w-full h-5"></h1>
        <div className="w-full h-0.5 rounded bg-gray-300" />
        <div className="flex gap-2 items-center text-gray-700 my-2 pl-2 w-full">
          <div className="flex gap-2 bg-gray-300 animate-pulse"></div>
          <p className="bg-gray-300 animate-pulse w-full h-3 rounded"></p>
        </div>
        <div className="w-full h-0.5 rounded bg-gray-300" />
        <div className=" w-full rounded-lg mt-2 pt-2 px-2 relative bg-gray-300 animate-pulse h-64"></div>
      </div>
    </div>
  );
}
