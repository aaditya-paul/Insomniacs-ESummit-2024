import React, { useState } from "react";
import { MdKeyboardVoice } from "react-icons/md";
import { FaRegSmile } from "react-icons/fa";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-5 bg-gradient-to-t from-white to-[#3d75ff]">
      <h1 className="text-4xl font-bold">How may I help you?</h1>
      <div className="w-[70%] flex justify-between items-center border-2 border-gray-200  rounded-lg px-2">
        <input
          type="text"
          className="p-3 w-full outline-none bg-transparent"
          onChange={() => {
            setPrompt();
          }}
          value={prompt}
        />
        <MdKeyboardVoice className="text-2xl" />
      </div>
      <div className=" bg-yellow-300 rounded-full">
        <FaRegSmile className="text-[72px]" />
      </div>
    </div>
  );
}
