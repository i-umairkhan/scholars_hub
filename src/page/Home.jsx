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
  const [allorganizations, setAllOrganizations] = useState([]);

  const jobColection = collection(db, "jobs");
  const orgColection = collection(db, "organization");

  useEffect(() => {
    const getUsers = async () => {
      const d = await getDocs(jobColection);
      const o = await getDocs(orgColection);
      const all = d.docs.map((doc) => doc.data());
      let oall = o.docs.map((doc) => doc.data());
      setAllJobs(all);
      oall = [...new Set(oall)];
      setAllOrganizations(oall);
    };

    getUsers();
  }, []);

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
      <div className="p-2   flex justify-between">
        <div>
          <h1 className="text-2xl ">Recent Oppertunites</h1>
          {allJobs.map((job) => (
            <Card
              title={job.title}
              description={job.description}
              postedBy={job.postedBy}
              postedByEmail={job.postedByEmail}
              roles={job.roles}
              isJob="true"
            />
          ))}
        </div>
        <div>
          {allorganizations.map((org) => (
            <div>
              <div>{org.name}</div>
              <div>{org.email}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;
