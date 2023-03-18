import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { Navigate, useNavigate } from "react-router-dom";
import loginsvg from "../assets/loginsvg.svg";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const usersCollection = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollection, {
      name: `${firstName} ${secondName}`,
      email: `${email}`,
    });
  };

  const signUpUser = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setEmail("");
        setFirstName("");
        setPassword("");
        setSecondName("");
        navigate("/");
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
    <div className=" w-screen h-screen bg-gradient-to-r from-cyan-500 to-blue-500 flex">
      <div className="w-[50%] flex flex-col justify-center items-center">
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
            label="First Name"
            variant="outlined"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Second Name"
            variant="outlined"
            value={secondName}
            onChange={(event) => setSecondName(event.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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
            Already a member?
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
                navigate("/uni-login");
              }}
            >
              Organization
            </Button>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Signup;
