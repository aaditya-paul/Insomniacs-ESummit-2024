"use client";
import {db} from "@/lib/firebaseConfig";
import {addDoc, collection, doc, getDoc, setDoc} from "@firebase/firestore";
import {useParams, useRouter, useSearchParams} from "next/navigation";
import React, {useEffect, useState} from "react";
import generateFirestoreId from "../generateUniqueId";

const AddDoctorsAndStaffs = ({employeetype}) => {
  const params = useParams();

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [dutyfrom, setdutyfrom] = useState("");
  const [dutyto, setdutyto] = useState("");
  const [type, setType] = useState("");
  const [checkedIn, setCheckedIn] = useState(null);
  const [isFree, setIsFree] = useState(null);
  const [uid, setuid] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const searchparams = useSearchParams();

  const handleAddOrUpdateDoctor = async () => {
    if (!isLoading) {
      setIsLoading(true);
      const uid = generateFirestoreId();
      if (
        name === "" ||
        checkedIn === null ||
        isFree === null ||
        room === "" ||
        dutyfrom === "" ||
        dutyto === "" ||
        type === ""
      ) {
        alert("Please fill all the fields");
        setIsLoading(false);
        return;
      }

      let collection_ref = "doctors";

      if (employeetype == "staff") {
        collection_ref = "staffs";
      }

      await fetch("http://192.168.9.96:5000/add/doctor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          room: room,
          duty: {
            start: dutyfrom,
            end: dutyto,
          },
          speciality: type,
          checkedIn: checkedIn,
          uid: uid,
          isFree: isFree,

          // TODO: Add free:true
          // free:true
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });

      await setDoc(doc(db, collection_ref, uid), {
        name: name,
        room: room,
        dutyfrom: dutyfrom,
        dutyto: dutyto,
        type: type,
        checkedIn: checkedIn,
        uid: uid,
        isFree: isFree,
      })
        .then(() => {
          alert("Doctor added successfully");
          setIsLoading(false);

          window.location.href = "/admin";
        })
        .catch((err) => {
          alert("Error adding doctor");
        });
    }
  };

  useEffect(() => {
    if (searchparams.get("id")) {
      async function getDoctororStaff() {
        // Fetch the doctor details using the id
        let collection = "doctors";

        if (employeetype == "staff") {
          collection = "staffs";
        }
        await getDoc(doc(db, collection, searchparams.get("id"))).then(
          (res) => {
            if (res.exists()) {
              const data = res.data();
              setName(data.name);
              setRoom(data.room);
              setdutyfrom(data.dutyfrom);
              setdutyto(data.dutyto);
              setType(data.type);
              setCheckedIn(data.checkedIn);
              setIsFree(data.isFree);
              setuid(data.uid);
            } else {
              alert("Doctor not found");
            }
          }
        );
      }
      getDoctororStaff();
    }
  }, []);

  return (
    <div className="px-[350px] min-h-screen py-10 bg-blue-600 text-white">
      <h1 className="font-bold text-4xl text-yellow-400">
        Add {employeetype == "staff" ? "Staff" : "Doctor"}
      </h1>
      <div className="flex flex-col gap-5 py-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="font-mono text-xl font-bold">
            Enter {employeetype == "staff" ? `staff's name` : `doctor's name`}
          </label>
          <input
            type="text"
            className="outline-none rounded-md  border-b-2 bg-transparent border-white p-4 placeholder:text-white"
            value={name}
            onChange={(e) => {
              if (searchparams.get("isUpdating")) {
                return;
              }
              setName(e.target.value);
            }}
            placeholder="Enter name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="font-mono text-xl font-bold">
            Enter Room no:
          </label>
          <input
            type="number"
            className="outline-none rounded-md  border-b-2 bg-transparent border-white p-4 placeholder:text-white"
            value={room}
            onChange={(e) => {
              setRoom(e.target.value);
            }}
            placeholder="e.g. 302"
          />
        </div>
        <div className="flex flex-row  items-center gap-4">
          <label htmlFor="" className="font-mono text-xl font-bold">
            Enter time of duty:
          </label>
          <div>
            from{" "}
            <input
              type="time"
              name=""
              id=""
              className="outline-none rounded-md  border-b-2 bg-transparent border-white p-4 placeholder:text-white"
              onChange={(e) => {
                setdutyfrom(e.target.value);
              }}
              value={dutyfrom}
            />{" "}
            to{" "}
            <input
              type="time"
              name=""
              id=""
              className="outline-none rounded-md  border-b-2 bg-transparent border-white p-4 placeholder:text-white"
              onChange={(e) => {
                setdutyto(e.target.value);
              }}
              value={dutyto}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="font-mono text-xl font-bold">
            Enter type of {employeetype == "staff" ? `staff` : `doctor`}:
          </label>
          <input
            type="text"
            className="outline-none rounded-md  border-b-2 bg-transparent border-white p-4 placeholder:text-white"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
            placeholder={`e.g. ${
              employeetype == "staff" ? `Nurse` : `Surgeon`
            }`}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="font-mono text-xl font-bold">
            Is the {employeetype == "staff" ? `Staff` : `Doctor`} free?:
          </label>
          <select
            name=""
            id=""
            className={` bg-transparent border-white   p-4 rounded-md border-b-2 `}
            onChange={(e) => {
              setIsFree(e.target.value);
              console.log(e.target.value);
            }}
            placeholder="Enter name"
          >
            <option value={null} className="bg-transparent text-black">
              Select option
            </option>
            <option value={true} className="bg-transparent text-black">
              Yes
            </option>
            <option value={false} className="bg-transparent text-black">
              No
            </option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="font-mono text-xl font-bold">
            Enter check-in:
          </label>
          <select
            name=""
            id=""
            className={` bg-transparent border-white   p-4 rounded-md border-b-2 `}
            onChange={(e) => {
              setCheckedIn(e.target.value);
              console.log(e.target.value);
            }}
            placeholder="Enter name"
          >
            <option value={null} className="bg-transparent text-black">
              Select option
            </option>
            <option value={true} className="bg-transparent text-black">
              Yes
            </option>
            <option value={false} className="bg-transparent text-black">
              No
            </option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            className="py-2 px-5 rounded-md bg-yellow-400 text-lg font-bold text-blue-600 hover:bg-yellow-500"
            onClick={() => {
              handleAddOrUpdateDoctor();
            }}
          >
            {!isLoading
              ? searchparams.get("isUpdating")
                ? "Update"
                : "Submit"
              : "loading..."}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDoctorsAndStaffs;
