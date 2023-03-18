import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { Navigate, useNavigate } from "react-router-dom";
import loginsvg from "../assets/redbg.svg";

function Signup() {
  const [orgName, setOrgName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const organizationCollection = collection(db, "organization");

  const createUser = async () => {
    await addDoc(organizationCollection, {
      name: orgName,
      email: `${email}`,
      address: `${address}`,
    });
  };

  const signUpUser = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setOrgName("");
        setEmail("");
        setAddress("");
        setPassword("");
        navigate("/uni-login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    await createUser();
  };

  const navigate = useNavigate();

  return (
    <div className=" w-screen h-screen bg-gradient-to-r from-red-500 to-orange-500 flex">
      <div className="w-[50%] flex flex-col justify-center items-center ">
        <img src={loginsvg} alt="" className="h-48" />
        <h1 className="text-5xl text-white font-black m-5">Schloars Hub.</h1>
        <p className="text-blue-100 text-m w-56 text-center">
          Your big opportunity may be right where you are now.
        </p>
      </div>
      <div className="flex flex-col w-[50%]  justify-center items-center bg-white gap-10">
        <div className="flex flex-col justify-center items-center gap-2">
          <h1 className="text-3xl font-bold ">SignUp</h1>
          <h1 className="text-1xl">Create your account</h1>
        </div>
        <div className="flex flex-col gap-5 w-[55%]">
          <TextField
            id="standard-basic"
            label="Organization Name"
            variant="outlined"
            value={orgName}
            onChange={(event) => setOrgName(event.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Organization Email"
            variant="outlined"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Address "
            variant="outlined"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button variant="contained" onClick={signUpUser}>
            Create Account
          </Button>
          <h3 className="flex gap-4 items-center justify-center">
            Not a member?
            <Button
              className="cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            >
              Login
            </Button>
            <Button
              className="cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            >
              User
            </Button>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Signup;
