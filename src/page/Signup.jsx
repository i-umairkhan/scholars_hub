import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { Navigate, useNavigate } from "react-router-dom";

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
        <h1 className="text-6xl text-white font-bold">Schloars Hub.</h1>
        <p className="text-white text-2xl">
          Your big opportunity may be right where you are now
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
            Not a member?
            <Button
              className="cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            >
              Login
            </Button>
          </h3>
          <div>
            <Button
              className="cursor-pointer"
              variant="outlined"
              onClick={() => {
                navigate("/uni-login");
              }}
            >
              Organization
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
