"use client";
import React, {useState} from "react";
import {MdKeyboardVoice} from "react-icons/md";
import {FaRegSmile} from "react-icons/fa";
import {addDoc, collection, doc, setDoc} from "@firebase/firestore";
import {db} from "@/lib/firebaseConfig";
import DottedBg from "@/components/dottedBG/dottedBg";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const handleSubmitPrompt = async () => {
    if (prompt === "") {
      alert("Please add some prompt");
      return;
    }
    await addDoc(collection(db, "prompts"), {
      prompt,
    })
      .then(() => {
        setPrompt("");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };
  return (
    <>
      <div>
        <div className="opacity-[1]">
          <DottedBg />
        </div>
        <div className="flex flex-col justify-center items-center min-h-screen gap-16 50">
          <h1 className="text-4xl font-bold">How may I help you?</h1>
          <div className="flex flex-row gap-2 w-full justify-center">
            <div className="w-[70%] flex justify-between items-center border-2 border-gray-200  rounded-lg px-2 bg-blue-200/20">
              <input
                type="text"
                className="p-3 w-full outline-none bg-transparent "
                onChange={(e) => {
                  setPrompt(e.target.value);
                }}
                value={prompt}
              />
              <MdKeyboardVoice className="text-2xl cursor-pointer" />
            </div>
            <button
              className="px-4 bg-yellow-400 rounded-lg font-bold text-lg hover:bg-yellow-500 transition-all"
              onClick={async () => {
                // handleSubmitPrompt();
                await fetch("http://127.0.0.1:5000/query", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({query: prompt}),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    console.log(data);
                    setResponse(data);
                  })
                  .catch((error) => {
                    console.error("Error adding document: ", error);
                  });
              }}
            >
              Send
            </button>
          </div>
          <div className=" bg-yellow-300 rounded-full">
            <FaRegSmile className="text-[72px]" />
          </div>
        </div>
      </div>
      <div>
        {response && (
          <div>
            <h1 className="text-4xl font-bold">Response</h1>
            <div>{response}</div>
          </div>
        )}
      </div>
    </>
  );
}
