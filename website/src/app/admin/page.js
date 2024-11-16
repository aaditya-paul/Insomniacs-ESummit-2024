"use client";
import { getDoc, getDocs } from "@firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { LuStethoscope } from "react-icons/lu";
import { RiNurseFill } from "react-icons/ri";

const Page = () => {
  const [type, setType] = useState("staffs");
  const [doctorsArray, setdoctorArray] = useState(null);

  useEffect(() => {
    async function getDoctors() {
      const querySnapshot = await getDocs(collection(db, "doctors"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
    }
    getDoctors();
  }, []);

  return (
    <>
      <div className="px-24 py-5 flex flex-col gap-7">
        <h1 className="font-bold text-2xl">Hospital Name</h1>
        <div className="flex gap-5">
          <span
            className={`${
              type === "staffs" && "border-b-black"
            } flex flex-row gap-2 justify-center items-center hover:border-b-black cursor-pointer border-transparent border-2`}
            onClick={() => {
              setType("staffs");
            }}
          >
            <RiNurseFill />
            <span>Staffs</span>
          </span>
          <span
            className={`${
              type === "doctor" && "border-b-black"
            } flex flex-row gap-2 justify-center items-center hover:border-b-black cursor-pointer border-transparent border-2`}
            onClick={() => {
              setType("doctor");
            }}
          >
            <LuStethoscope />
            <span>Doctors</span>
          </span>
        </div>
        <div className="flex justify-end">
          <Link href={"/add-doctors"}>
            <button className="bg-blue-500 px-5 py-1 text-white rounded-lg hover:bg-blue-600">
              Add Doctors
            </button>
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>sr</th>
              <th>Name</th>
              <th>uid</th>
              <th>Room</th>
              <th>Type</th>
              <th>Duty</th>
              <th>Checked in / Arrived</th>
            </tr>
          </thead>
          <tbody>
            {doctorsArray !== null ? (
              doctorsArray.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="text-center p-2">{item.sr}</td>
                    <td className="text-center p-2">{item.name}</td>
                    <td className="text-center p-2">{item.uid}</td>
                    <td className="text-center p-2">{item.room}</td>
                    <td className="text-center p-2">{item.type}</td>
                    <td className="text-center p-2">{item.duty}</td>
                    <td className="text-center p-2">{item.checkIn}</td>
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
        </table>
      </div>
    </>
  );
};

export default Page;
