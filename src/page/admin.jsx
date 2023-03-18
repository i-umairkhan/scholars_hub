import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/authContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button, TextField } from "@mui/material";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { getDocs } from "firebase/firestore";
import Card from "../Component/Card";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Divider from "@mui/material/Divider";
import { Navigate, useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();

  const { auth } = useContext(AuthContext);
  const [allJobs, setAllJobs] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [roles, setRoles] = useState("");

  const orgColection = collection(db, "jobs");

  const getUsers = async () => {
    const d = await getDocs(orgColection);
    const all = d.docs.map((doc) => doc.data());
    console.log(all);
    const myJobs = all.filter((doc) => doc.postedByEmail === auth.email);
    console.log(myJobs);
    setAllJobs(myJobs);
  };
  useEffect(() => {
    getUsers();
  }, []);

  const addJob = async () => {
    await addDoc(orgColection, {
      title,
      description,
      roles,
      postedBy: auth.name,
      postedByEmail: auth.email,
      appliers: [],
    });
    setDescription("");
    setRoles("");
    setTitle("");
    getUsers();
  };
  return (
    <div className="p-7">
      <nav className="w-full flex justify-between border border-blue-900 border-t-0 border-l-0 border-r-0 border-b-1 sticky top-0 bg-white z-[100] items-center">
        <h1 className="font-bold text-2xl text-blue-500">Schloars Hub</h1>
        <div className="flex gap-1 items-center">
          <div className="flex items-center">
            <AccountCircleIcon sx={{ color: "grey" }} />
            <h1 className="text-gray-400">{auth.name}</h1>
          </div>
          <Button
            onClick={() => {
              navigate("/");
            }}
          >
            SignOut
          </Button>
        </div>
      </nav>
      <div className=" mt-12 flex">
        <div className="w-96  ">
          <div className="flex items-center gap-2">
            <AddCircleIcon />
            <h1 className="text-2xl font-bold">Post Job</h1>
          </div>
          <div className=" flex flex-col gap-6 mt-6">
            <TextField
              id="filled-basic"
              label="Job Tiltle"
              variant="filled"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <TextField
              id="filled-basic"
              label="Description"
              multiline={true}
              maxRows="6"
              variant="filled"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <TextField
              id="filled-basic"
              label="Roles"
              variant="filled"
              value={roles}
              onChange={(event) => setRoles(event.target.value)}
            />
            <Button variant="contained" onClick={addJob}>
              Post Job
            </Button>
          </div>
        </div>
        <Divider
          flexItem="true"
          orientation="vertical"
          sx={{ marginLeft: "60px", marginRight: "60px", height: "full" }}
        />
        <div className="">
          <h1 className="text-2xl mb-5 font-bold">Your Previous Job Posting</h1>
          {allJobs.map((job) => (
            <Card
              title={job.title}
              description={job.description}
              postedBy={job.postedBy}
              postedByEmail={job.postedByEmail}
              roles={job.roles}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;
