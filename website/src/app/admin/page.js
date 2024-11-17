"use client";
import { db } from "@/lib/firebaseConfig";
import { collection, getDoc, getDocs } from "@firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { LuStethoscope } from "react-icons/lu";
import { RiNurseFill } from "react-icons/ri";
import { MdOutlineSick } from "react-icons/md";
import { AiOutlineMedicineBox } from "react-icons/ai";

const Page = () => {
  const [type, setType] = useState("staffs");
  const [doctorsArray, setdoctorArray] = useState([]);
  const [staffsArray, setstaffArray] = useState([]);
  const [docIdArray, setDocIdArray] = useState([]);

  const [patientsArray, setpatientsArray] = useState([]);

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

  useEffect(() => {
    async function getStaffs() {
      const querySnapshot = await getDocs(collection(db, "staffs"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        staffsArray.push(doc.data());
        docIdArray.push(doc.id);
      });
    }
    getStaffs();
  }, []);

  useEffect(() => {
    console.log(staffsArray);
  }, [staffsArray]);

  return (
    <>
      <div className="px-24 py-10 flex flex-col gap-7 min-h-screen bg-blue-600">
        <h1 className="font-bold text-4xl text-yellow-400">
          Panacea Management
        </h1>
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
          <span
            className={`${
              type === "patient" && "border-b-white"
            } flex flex-row gap-2 justify-center items-center hover:border-b-white cursor-pointer border-transparent border-2`}
            onClick={() => {
              setType("patient");
            }}
          >
            <MdOutlineSick />
            <span className="font-bold text-lg">Patient</span>
          </span>
          <span
            className={`${
              type === "medicine" && "border-b-white"
            } flex flex-row gap-2 justify-center items-center hover:border-b-white cursor-pointer border-transparent border-2`}
            onClick={() => {
              setType("medicine");
            }}
          >
            <AiOutlineMedicineBox />
            <span className="font-bold text-lg">Medicine</span>
          </span>
        </div>
        <div className="flex justify-end">
          <Link href={type === "doctor" ? "/add-doctors" : "/add-staffs"}>
            <button className="bg-yellow-400 px-5 py-2 transition-all font-bold rounded-lg hover:bg-yellow-500 text-black">
              {type === "doctor"
                ? "Add Doctors"
                : type === "staffs"
                ? "Add Staffs"
                : type === "patient"
                ? "Add Patients"
                : "Add Medicine"}
            </button>
          </Link>
        </div>
        <table className="rounded-lg border-2 text-white">
          {(type === "doctor" || type === "staffs") && (
            <thead>
              <tr className="border-b-2">
                <th className="border-r-2 text-lg text-yellow-400">Sl.</th>
                <th className="border-r-2 text-lg text-yellow-400">Name</th>
                {/* <th className="border-r-2 text-lg text-yellow-400">uid</th> */}
                <th className="border-r-2 text-lg text-yellow-400">Room</th>
                <th className="border-r-2 text-lg text-yellow-400">Type</th>
                <th className="border-r-2 text-lg text-yellow-400">
                  Duty from
                </th>
                <th className="border-r-2 text-lg text-yellow-400">Duty to</th>
                <th className="text-lg border-r-2  text-yellow-400">
                  Checked in / Arrived
                </th>
                <th className="text-lg text-yellow-400">Is Doctor free?</th>
              </tr>
            </thead>
          )}

          {type === "medicine" && (
            <thead>
              <tr className="border-b-2">
                <th className="border-r-2 text-lg text-yellow-400">Sl.</th>
                <th className="border-r-2 text-lg text-yellow-400">Name</th>
                {/* <th className="border-r-2 text-lg text-yellow-400">uid</th> */}
                <th className="border-r-2 text-lg text-yellow-400">uid</th>
                <th className="border-r-2 text-lg text-yellow-400">
                  Stock Available
                </th>
                <th className="border-r-2 text-lg text-yellow-400">
                  Stock total
                </th>
                <th className="text-lg border-r-2  text-yellow-400">
                  expiry date
                </th>
                <th className="text-lg text-yellow-400">Bought date</th>
              </tr>
            </thead>
          )}
          {type === "patient" && (
            <thead>
              <tr className="border-b-2">
                <th className="border-r-2 text-lg text-yellow-400">Sl.</th>
                <th className="border-r-2 text-lg text-yellow-400">Name</th>
                <th className="border-r-2 text-lg text-yellow-400">uid</th>

                {/* <th className="border-r-2 text-lg text-yellow-400">uid</th> */}
                <th className="border-r-2 text-lg text-yellow-400">
                  Assigned Room
                </th>
                <th className="border-r-2 text-lg text-yellow-400">Diseases</th>
                <th className="border-r-2 text-lg text-yellow-400">
                  Admit date
                </th>

                <th className="text-lg border-r-2  text-yellow-400">
                  Doctor Assigned
                </th>
                <th className="border-r-2 text-lg text-yellow-400">
                  Is room empty?
                </th>
                {/* <th className="text-lg text-yellow-400">Is room free?</th> */}
              </tr>
            </thead>
          )}

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
                        {item.name?.toUpperCase()}
                      </td>
                      {/* <td className="text-center p-2 border-r-2">{item.uid}</td> */}
                      <td className="text-center p-2 border-r-2">
                        {item.room?.toUpperCase()}
                      </td>
                      <td className="text-center p-2 border-r-2">
                        {item.type?.toUpperCase()}
                      </td>
                      <td className="text-center p-2 border-r-2">
                        {item.dutyfrom}
                      </td>
                      <td className="text-center p-2 border-r-2">
                        {item.dutyto}
                      </td>
                      <td className="text-center p-2 border-r-2">
                        {item.checkedIn === true ? "Yes" : "No"}
                      </td>
                      <td className="text-center p-2">
                        {item.isFree === true ? "Yes" : "No"}
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
              {type === "staffs" && staffsArray !== null ? (
                staffsArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center p-2  border-r-2">
                        {index + 1}
                      </td>
                      <td className="text-center p-2  border-r-2">
                        {item.name}
                      </td>
                      {/* <td className="text-center p-2  border-r-2">
                        {docIdArray[index]}
                      </td> */}
                      <td className="text-center p-2  border-r-2">
                        {item.room}
                      </td>
                      <td className="text-center p-2  border-r-2">
                        {item.type}
                      </td>
                      <td className="text-center p-2  border-r-2">
                        {item.dutyfrom}
                      </td>
                      <td className="text-center p-2  border-r-2">
                        {item.dutyto}
                      </td>
                      <td className="text-center p-2  border-r-2">
                        {item.checkedIn ? "Yes" : "No"}
                      </td>
                      <td className="text-center p-2  border-r-2">
                        {item.isFree ? "Yes" : "No"}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <></>
              )}
            </tbody>
          )}

          {type === "patient" && (
            <tbody>
              {patientsArray.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="text-center p-2  border-r-2">{index + 1}</td>
                    <td className="text-center p-2  border-r-2">{item.name}</td>
                    {/* <td className="text-center p-2  border-r-2">
                        {docIdArray[index]}
                      </td> */}
                    <td className="text-center p-2  border-r-2">{item.room}</td>
                    <td className="text-center p-2  border-r-2">{item.type}</td>
                    <td className="text-center p-2  border-r-2">
                      {item.dutyfrom}
                    </td>
                    <td className="text-center p-2  border-r-2">
                      {item.dutyto}
                    </td>
                    <td className="text-center p-2  border-r-2">
                      {item.checkedIn ? "Yes" : "No"}
                    </td>
                    <td className="text-center p-2  border-r-2">
                      {item.isFree ? "Yes" : "No"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
    </>
  );
};

export default Page;
