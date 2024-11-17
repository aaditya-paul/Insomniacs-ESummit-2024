"use client";
import { db } from "@/lib/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "@firebase/firestore";
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
  const [medicineArray, setmedicineArray] = useState([]);

  useEffect(() => {
    async function getDoctors() {
      const querySnapshot = await getDocs(collection(db, "doctors"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined htmlFor query doc snapshots
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
        // doc.data() is never undefined htmlFor query doc snapshots
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

  const handleClick = async (object) => {
    await fetch("http://192.168.9.96:5000/add/doctor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: object.name,
        room: object.room,
        duty: {
          start: object.dutyfrom,
          end: object.dutyto,
        },
        speciality: object.type,
        checkedIn: object.checkedIn,
        uid: object.uid,
        isFree: object.isFree,

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
  };

  return (
    <div className="px-24 py-10 flex flex-col gap-7 min-h-screen bg-blue-600">
      <h1 className="font-bold text-4xl text-yellow-400">Panacea Management</h1>
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
              <th className="border-r-2 text-lg text-yellow-400">Duty from</th>
              <th className="border-r-2 text-lg text-yellow-400">Duty to</th>
              <th className="text-lg border-r-2  text-yellow-400">
                Checked in / Arrived
              </th>
              <th className="text-lg text-yellow-400">
                Is {type == "staffs" ? "staff" : "docter"} free?
              </th>
            </tr>
          </thead>
        )}

        {/* {type === "medicine" && (
          <thead>
            <tr className="border-b-2">
              <th className="border-r-2 text-lg text-yellow-400">Sl.</th>
              <th className="border-r-2 text-lg text-yellow-400">Name</th>
              
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
        )} */}
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
              <th className="border-r-2 text-lg text-yellow-400">Admit date</th>

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
                    <td className="text-center p-2 border-r-2">{index + 1}</td>
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
                    <td className="text-center p-2 border-r-2 flex flex-col justify-center ">
                      <div className="checkbox-wrapper-35 text-white flex justify-center items-center">
                        <input
                          name="switch"
                          id="switch"
                          type="checkbox"
                          className="switch"
                          onChange={(e) => {
                            const object = {
                              name: item.name,
                              room: item.room,
                              dutyfrom: item.dutyfrom,
                              dutyto: item.dutyto,
                              type: item.type,
                              checkedIn: e.target.checked,
                              uid: item.uid,
                              isFree: item.isFree,
                            };
                            async function updateState() {
                              handleClick(object);
                              await updateDoc(
                                doc(db, "doctors", docIdArray[index]),
                                {
                                  checkedIn: e.target.checked,
                                }
                              )
                                .then(() => {
                                  alert("Successfully updated");
                                })
                                .catch((error) => {
                                  alert("Error updating document: ", error);
                                });
                            }
                            updateState();
                            console.log(e.target.checked);
                          }}
                        />
                        <label htmlFor="switch">
                          <span className="switch-x-toggletext">
                            <span className="switch-x-unchecked ">
                              <span className="switch-x-hiddenlabel">
                                Unchecked:{" "}
                              </span>
                              Yes
                            </span>
                            <span className="switch-x-checked">
                              <span className="switch-x-hiddenlabel">
                                Checked:{" "}
                              </span>
                              No
                            </span>
                          </span>
                        </label>
                      </div>
                    </td>
                    <td className="text-center p-2">
                      <div className="checkbox-wrapper-35 text-white flex justify-center items-center">
                        <input
                          // value="private"
                          name="switch2"
                          id="switch2"
                          type="checkbox"
                          className="switch"
                          onChange={(e) => {
                            const object = {
                              name: item.name,
                              room: item.room,
                              dutyfrom: item.dutyfrom,
                              dutyto: item.dutyto,
                              type: item.type,
                              checkedIn: item.checkedIn,
                              uid: item.uid,
                              isFree: e.target.checked,
                            };
                            async function updateState() {
                              handleClick(object);
                              await updateDoc(
                                doc(db, "doctors", docIdArray[index]),
                                {
                                  isFree: e.target.checked,
                                }
                              )
                                .then(() => {
                                  alert("Successfully updated");
                                })
                                .catch((error) => {
                                  alert("Error updating document: ", error);
                                });
                            }
                            updateState();
                            console.log(e.target.checked);
                          }}
                        />
                        <label htmlFor="switch2">
                          <span className="switch-x-toggletext">
                            <span className="switch-x-unchecked ">
                              {/* {item.isFree ? "Yes" : "No"} */}
                            </span>
                          </span>
                        </label>
                      </div>
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
                    <td className="text-center p-2 border-r-2 flex flex-col justify-center ">
                      <div className="checkbox-wrapper-35 text-white flex justify-center items-center">
                        <input
                          name="switch"
                          id="switch"
                          type="checkbox"
                          className="switch"
                          onChange={(e) => {
                            const object = {
                              name: item.name,
                              room: item.room,
                              dutyfrom: item.dutyfrom,
                              dutyto: item.dutyto,
                              type: item.type,
                              checkedIn: e.target.checked,
                              uid: item.uid,
                              isFree: item.isFree,
                            };
                            async function updateState() {
                              handleClick(object);
                              await updateDoc(
                                doc(db, "doctors", docIdArray[index]),
                                {
                                  checkedIn: e.target.checked,
                                }
                              )
                                .then(() => {
                                  alert("Successfully updated");
                                })
                                .catch((error) => {
                                  alert("Error updating document: ", error);
                                });
                            }
                            updateState();
                            console.log(e.target.checked);
                          }}
                        />
                        <label htmlFor="switch">
                          <span className="switch-x-toggletext">
                            <span className="switch-x-unchecked ">
                              <span className="switch-x-hiddenlabel">
                                Unchecked:{" "}
                              </span>
                              Yes
                            </span>
                            <span className="switch-x-checked">
                              <span className="switch-x-hiddenlabel">
                                Checked:{" "}
                              </span>
                              No
                            </span>
                          </span>
                        </label>
                      </div>
                    </td>
                    <td className="text-center p-2">
                      <div className="checkbox-wrapper-35 text-white flex justify-center items-center">
                        <input
                          // value="private"
                          name="switch2"
                          id="switch2"
                          type="checkbox"
                          className="switch"
                          onChange={(e) => {
                            const object = {
                              name: item.name,
                              room: item.room,
                              dutyfrom: item.dutyfrom,
                              dutyto: item.dutyto,
                              type: item.type,
                              checkedIn: item.checkedIn,
                              uid: item.uid,
                              isFree: e.target.checked,
                            };
                            async function updateState() {
                              handleClick(object);
                              await updateDoc(
                                doc(db, "doctors", docIdArray[index]),
                                {
                                  isFree: e.target.checked,
                                }
                              )
                                .then(() => {
                                  alert("Successfully updated");
                                })
                                .catch((error) => {
                                  alert("Error updating document: ", error);
                                });
                            }
                            updateState();
                            console.log(e.target.checked);
                          }}
                        />
                        <label htmlFor="switch2">
                          <span className="switch-x-toggletext">
                            <span className="switch-x-unchecked ">
                              {/* {item.isFree ? "Yes" : "No"} */}
                            </span>
                          </span>
                        </label>
                      </div>
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
                  <td className="text-center p-2  border-r-2">{item.dutyto}</td>
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
  );
};

export default Page;
