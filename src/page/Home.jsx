import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/authContext";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import { Button, Divider, TextField } from "@mui/material";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { getDocs } from "firebase/firestore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Card from "../Component/Card";
import { Navigate, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ContactsIcon from "@mui/icons-material/Contacts";

function Admin() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [allJobs, setAllJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [allorganizations, setAllOrganizations] = useState([]);

  const jobColection = collection(db, "jobs");
  const orgColection = collection(db, "organization");

  const getUsers = async () => {
    const d = await getDocs(jobColection);
    const o = await getDocs(orgColection);
    const all = d.docs.map((doc) => doc.data());
    let oall = o.docs.map((doc) => doc.data());
    setAllJobs(all);
    oall = [...new Set(oall)];
    setAllOrganizations(oall);
  };
  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    const newJobs = allJobs.filter((job) => job.title.includes(search));
    setAllJobs(newJobs);
    if (!search) {
      getUsers();
    }
  }, [search]);

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
      <div className="p-2 flex justify-evenly">
        <div>
          <h1 className="text-2xl font-bold my-5">Recent Oppertunites</h1>
          <TextField
            id="outlined-basic"
            label="Search Jobs"
            variant="outlined"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            sx={{ marginBottom: "15px" }}
          />

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
        <Divider
          flexItem="true"
          orientation="vertical"
          sx={{
            height: "full",
            marginTop: "40px",
          }}
        />
        <div>
          <h1 className="text-2xl font-bold my-5">Organizations</h1>
          {allorganizations.map((org) => (
            <div className="my-3">
              <div className="text-blue-500 font-bold text-lg">{org.name}</div>
              <div className="text-gray-500 text-sm">
                Address: {org.address ? org.address : "Islamabad"}
              </div>
              <div className="text-gray-500 text-sm ">
                Email: {org.email ? org.email : "email"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;
