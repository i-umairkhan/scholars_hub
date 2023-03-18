import { Button, Chip, TextField } from "@mui/material";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div className=" w-screen h-screen bg-gradient-to-r from-cyan-500 to-blue-500 flex">
      <div className="w-[50%] flex flex-col justify-center items-center">
        <h1 className="text-6xl text-white font-bold">Schloars Hub.</h1>
        <p className="text-white text-2xl">
          Your big opportunity may be right where you are now
        </p>
      </div>
      <div className="flex flex-col w-[50%]  justify-center items-center bg-white gap-10">
        <div className="flex flex-col justify-center items-center gap-2">
          <h1 className="text-3xl font-bold ">Login</h1>
          <h1 className="text-1xl">Login to your account</h1>
        </div>
        <div className="flex flex-col gap-5 w-[55%]">
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
          <Button variant="contained" onClick={onLogin}>
            Create Account
          </Button>
          <h3 className="flex gap-4 items-center justify-center">
            Already a member?
            <Button
              className="cursor-pointer"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Signup
            </Button>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Login;
