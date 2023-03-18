import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/authContext";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import { Button, TextField } from "@mui/material";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { getDocs } from "firebase/firestore";
import Card from "../Component/Card";

function Admin() {
  const { auth } = useContext(AuthContext);
  const [allJobs, setAllJobs] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [roles, setRoles] = useState("");

  const orgColection = collection(db, "jobs");

  useEffect(() => {
    const getUsers = async () => {
      const d = await getDocs(orgColection);
      const all = d.docs.map((doc) => doc.data());
      console.log(all);
      const myJobs = all.filter((doc) => doc.postedByEmail === auth.email);
      console.log(myJobs);
      setAllJobs(myJobs);
    };

    getUsers();
  }, []);

  const addJob = async () => {
    await addDoc(orgColection, {
      title,
      description,
      roles,
      postedBy: auth.name,
      postedByEmail: auth.email,
    });
    setDescription("");
    setRoles("");
    setTitle("");
  };
  return (
    <div className="p-7">
      <nav className="w-full flex justify-between">
        <h1 className="text-2xl font-bold">
          <CorporateFareIcon /> {auth.name}
        </h1>
        <div className="flex gap-3 items-center">
          <h1 className="text-gray-400">{auth.email}</h1>
          <Button variant="contained">SignOut</Button>
        </div>
      </nav>
      <div className="h-screen mt-12 flex">
        <div>
          <h1 className="text-2xl ">Add Job Opertunites</h1>
          <div className=" flex flex-col w-96 gap-6 mt-6">
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
        <div className="ml-44">
          <h1 className="text-2xl ">Your Previous Job Posting</h1>
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
