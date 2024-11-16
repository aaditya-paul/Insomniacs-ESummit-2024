import React from "react";
import DR from "";
function Page() {
  return (
    <div className=" w-full h-screen bg-blue-600 flex flex-col gap-12 justify-center items-center leading-[48px]">
      <div className=" text-[36px] font-ubuntu text-white text-center">
        Hello There ! How can we <br />
        <span className=" text-yellow-400 font-bold font-mono">HELP YOU ?</span>
      </div>
      <div>
        <div className=" min-w-[350px] flex gap-4">
          <input
            className=" bg-transparent w-full p-4 rounded-md text-white placeholder:text-white text-xl border-yellow-400 outline-none border"
            type="text"
            placeholder=" Help me with..."
          />
          <button className=" py-2 px-10 rounded-md bg-yellow-400 text-blue-600 font-bold font-mono text-xl">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;
