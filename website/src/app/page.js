"use client";
import React, {useEffect, useState} from "react";
import DR from "../../public/assests/medical-symbol.png";
import Image from "next/image";
import "../styles/client.css"; // Import your CSS file here

function Page() {
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [messageRecieved, setSetMessageRecieved] = useState(false);

  useEffect(() => {
    const handleTabClose = async (event) => {
      event.preventDefault();
      event.returnValue = "";
      console.log("Tab Closed");

      await fetch("http://192.168.9.96:5000/clear-memory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({query: "close"}),
      });
    };

    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, []);

  const handleClick = async () => {
    setLoading(true);
    setSent(true);
    console.log(message);

    if (message !== "") {
      await fetch("http://127.0.0.1:5000/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({query: message}),
      })
        .then((response) => response.json())
        .then((data) => {
          setResponse(data);
          setSetMessageRecieved(true);
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        })
        .finally(() => setLoading(false));
    }

    setLoading(false);
  };

  return (
    <div className="w-full h-screen md:p-0 p-5 bg-blue-600 leading-[48px]">
      <div
        className={` h-full gap-6  flex flex-col justify-center items-center transition-all ease-linear ${
          messageRecieved ? "animate-up" : ""
        }`}
      >
        <div>
          <Image src={DR} width={80} height={80} alt="med" />
        </div>
        <div className="text-[36px] font-ubuntu text-white text-center">
          Hello There ! How can we <br />
          <span className="text-yellow-400 font-bold font-mono">
            HELP YOU ?
          </span>
        </div>
        <div>
          <div className="md:min-w-[350px] w-full flex gap-4">
            <input
              onChange={(e) => setMessage(e.target.value)}
              className="bg-transparent w-full p-4 rounded-md text-white placeholder:text-white text-xl border-yellow-400 outline-none border"
              type="text"
              placeholder=" Help me with..."
            />
            <button
              onClick={handleClick}
              className="py-2 px-10 rounded-md bg-yellow-400 text-blue-600 font-bold font-mono text-xl"
            >
              {loading ? "Thinking..." : "Send"}
            </button>
          </div>
        </div>
      </div>
      <div
        className={` ${
          messageRecieved ? "opacity-100" : "opacity-0"
        } transition-all pointer-events-none ease-linear delay-700  absolute left-1/2 -translate-x-1/2 bottom-5 w-[90%] md:w-[60vw] shadow-md bg-blue-700/40 md:backdrop-blur-md rounded-2xl h-[50vh]   `}
      >
        <div className="h-full px-12 py-8 text-white  ">
          <div className="text-xl font-mono  leading-10 text-yellow-300    ">
            <div className=" flex gap-2  ">
              <div className=" basis-1/4 ">
                <Image
                  src={DR}
                  className=" mt-5 w-10 h-10 object-contain p-1 rounded-full border"
                  alt="med"
                />
              </div>
              <span>{response}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
