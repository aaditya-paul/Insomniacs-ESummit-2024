"use client";
import { db } from "@/lib/firebaseConfig";
import { collection, getDoc, getDocs } from "@firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { LuStethoscope } from "react-icons/lu";
import { RiNurseFill } from "react-icons/ri";

const Page = () => {
  const [type, setType] = useState("staffs");
  const [doctorsArray, setdoctorArray] = useState([]);
  const [staffsArray, setstaffArray] = useState([]);
  const [docIdArray, setDocIdArray] = useState([]);

  useEffect(() => {
    async function getDoctors() {
      const querySnapshot = await getDocs(collection(db, "doctors"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        doctorsArray.push(doc.data());
        docIdArray.push(doc.id);
      });
    }
    getDoctors();
  }, []);

  useEffect(() => {
    console.log(doctorsArray);
  }, [doctorsArray]);

  return (
    <>
      <div className="px-24 py-10 flex flex-col gap-7 min-h-screen bg-blue-600">
        <h1 className="font-bold text-4xl text-yellow-400">Insomniacs Hospital</h1>
        <div className="flex gap-5 text-white">
          <span
            className={`${
              type === "staffs" && "border-b-white"
            } flex flex-row gap-2 justify-center items-center hover:border-b-white cursor-pointer border-transparent border-2`}
            onClick={() => {
              setType("staffs");
            }}
          >
            <RiNurseFill />
            <span className="font-bold text-lg">Staffs</span>
          </span>
          <span
            className={`${
              type === "doctor" && "border-b-white"
            } flex flex-row gap-2 justify-center items-center hover:border-b-white cursor-pointer border-transparent border-2`}
            onClick={() => {
              setType("doctor");
            }}
          >
            <LuStethoscope />
            <span className="font-bold text-lg">Doctors</span>
          </span>
        </div>
        <div className="flex justify-end">
          <Link href={type === "doctor" ? "/add-doctors" : "/add-staffs"}>
            <button className="bg-yellow-400 px-5 py-2 transition-all font-bold rounded-lg hover:bg-yellow-500 text-black">
              {type === "doctor" ? "Add Doctors" : "Add Staffs"}
            </button>
          </Link>
        </div>
        <table className="rounded-lg border-2 text-white">
          <thead>
            <tr className="border-b-2">
              <th className="border-r-2 text-lg text-yellow-400">sr</th>
              <th className="border-r-2 text-lg text-yellow-400">Name</th>
              <th className="border-r-2 text-lg text-yellow-400">uid</th>
              <th className="border-r-2 text-lg text-yellow-400">Room</th>
              <th className="border-r-2 text-lg text-yellow-400">Type</th>
              <th className="border-r-2 text-lg text-yellow-400">Duty</th>
              <th className="text-lg text-yellow-400">Checked in / Arrived</th>
            </tr>
          </thead>

          {type === "doctor" ? (
            <tbody>
              {doctorsArray !== null ? (
                doctorsArray.map((item, index) => {
                  return (
                    <tr key={index} className="border-b-">
                      <td className="text-center p-2 border-r-2">
                        {index + 1}
                      </td>
                      <td className="text-center p-2 border-r-2">
                        {item.name}
                      </td>
                      <td className="text-center p-2 border-r-2">{item.uid}</td>
                      <td className="text-center p-2 border-r-2">
                        {item.room}
                      </td>
                      <td className="text-center p-2 border-r-2">
                        {item.type}
                      </td>
                      <td className="text-center p-2 border-r-2">
                        {item.dutyfrom} to {item.dutyto}
                      </td>
                      <td className="text-center p-2">
                        {item.checkedIn === true ? "Yes" : "No"}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td className="text-center p-2" colSpan={7}>
                    Loading...
                  </td>
                </tr>
              )}
            </tbody>
          ) : (
            <tbody>
              {doctorsArray !== null ? (
                staffsArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center p-5">{index + 1}</td>
                      <td className="text-center p-5">{item.name}</td>
                      <td className="text-center p-5">{docIdArray[index]}</td>
                      <td className="text-center p-5">{item.room}</td>
                      <td className="text-center p-5">{item.type}</td>
                      <td className="text-center p-5">
                        {item.dutyfrom} to {item.dutyto}
                      </td>
                      <td className="text-center p-5">{item.checkIn}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td className="text-center p-2" colSpan={7}>
                    Loading...
                  </td>
                </tr>
              )}
            </tbody>
          )}
        </table>
      </div>
    </>
  );
};

export default Page;
