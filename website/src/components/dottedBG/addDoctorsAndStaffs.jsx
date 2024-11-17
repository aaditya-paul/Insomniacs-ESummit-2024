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

  const [assignedRoom, setadmittedRoom] = useState("");
  const [Diseases, setdeaseas] = useState("");
  const [admitDate, setAdmitdate] = useState("");

  const [docterAssigned, setdocterAssigned] = useState("");
  const [isroomEmpty, setroomEmpty] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const searchparams = useSearchParams();

  const handleAddOrUpdateDoctor = async () => {
    if (!isLoading) {
      setIsLoading(true);
      const uid = generateFirestoreId();
      if (
        ((type == "staff" || type == "doctor") &&
          (name === "" ||
            checkedIn === null ||
            isFree === null ||
            room === "" ||
            dutyfrom === "" ||
            dutyto === "" ||
            type === "")) ||
        (type == "patient" &&
          (name === "" ||
            assignedRoom === "" ||
            Diseases === "" ||
            admitDate === "" ||
            docterAssigned === "" ||
            isroomEmpty === null)) ||
        (type == "medicine" &&
          (name === "" ||
            stockAvailable === "" ||
            stockTotal === "" ||
            expiryDate === "" ||
            docterAssigned === ""))
      ) {
        alert("Please fill all the fields");
        setIsLoading(false);
        return;
      }

      let collection_ref = "doctors";

      if (employeetype == "staff") {
        collection_ref = "staffs";
      }

      if (employeetype == "patient") {
        collection_ref = "patients";
      }
      const object = {
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
      };

      if (type == "patient") {
        object = {
          name: name,
          room: assignedRoom,
          disease: Diseases,
          admitDate: admitDate,
          doctorAssigned: docterAssigned,
          isroomEmpty: isroomEmpty,
          uid: uid,
        };
      }
      if (type == "medicine") {
        object = {
          name: name,
          stockAvailable: stockAvailable,
          stockTotal: stockTotal,
          expiryDate: expiryDate,
          doctorAssigned: docterAssigned,
          uid: uid,
        };

        await fetch("https://lwtmbxjr-5000.inc1.devtunnels.ms/add/patient", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(object),
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
              if (data.type == "staff" || data.type == "doctor") {
                setName(data.name);
                setRoom(data.room);
                setdutyfrom(data.dutyfrom);
                setdutyto(data.dutyto);
                setType(data.type);
                setCheckedIn(data.checkedIn);
                setIsFree(data.isFree);
                setuid(data.uid);
              } else {
                if (data.type == "patient") {
                  setName(data.name);
                  setadmittedRoom(data.room);
                  setdeaseas(data.disease);
                  setAdmitdate(data.admitDate);
                  setdocterAssigned(data.doctorAssigned);
                  setroomEmpty(data.isroomEmpty);
                  setuid(data.uid);
                }
                if (data.type == "medicine") {
                  setName(data.name);
                  setstockAvailable(data.stockAvailable);
                  setstockTotal(data.stockTotal);
                  setexpiryDate(data.expiryDate);
                  setdocterAssigned(data.doctorAssigned);
                  setuid(data.uid);
                }
              }
            } else {
              alert("Doctor not found");
            }
          }
        );
      }
      getDoctororStaff();
    }
  }, []);

  if (employeetype == "staff" || employeetype == "doctor") {
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
  }

  if (employeetype == "patient") {
    return (
      <>
        <div className="px-[350px] min-h-screen py-10 bg-blue-600 text-white">
          <h1 className="font-bold text-4xl text-yellow-400">Add Patient</h1>
          <div className="flex flex-col gap-5 py-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-mono text-xl font-bold">
                Enter Name
              </label>
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
                Enter diseases:
              </label>
              <div>
                <input
                  type="text"
                  className="outline-none rounded-md  border-b-2 bg-transparent border-white p-4 placeholder:text-white"
                  value={room}
                  onChange={(e) => {
                    setadmittedRoom(e.target.value);
                  }}
                  placeholder="e.g. 302"
                />{" "}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-mono text-xl font-bold">
                Enter admit date:
              </label>
              <input
                type="date"
                className="outline-none rounded-md  border-b-2 bg-transparent border-white p-4 placeholder:text-white"
                value={type}
                onChange={(e) => {
                  setAdmitdate(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-mono text-xl font-bold">
                Enter docter name:
              </label>
              <input
                type="text"
                className="outline-none rounded-md  border-b-2 bg-transparent border-white p-4 placeholder:text-white"
                value={type}
                onChange={(e) => {
                  setdocterAssigned(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-mono text-xl font-bold">
                Is room empty?:
              </label>
              <select
                name=""
                id=""
                className={` bg-transparent border-white   p-4 rounded-md border-b-2 `}
                onChange={(e) => {
                  setroomEmpty(e.target.value);
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
      </>
    );
  }
  if (employeetype == "medicine") {
    return <></>;
  }
};

export default AddDoctorsAndStaffs;
