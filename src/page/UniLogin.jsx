import { Button, Chip, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { auth, db } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import AuthContext from "../context/authContext";
import { setUser } from "../CustomeHook/setUser";
import loginsvg from "../assets/redbg.svg";

function Login() {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setAuth(await setUser(user, "organization"));
        navigate("/admin");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

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
          <h1 className="text-3xl font-bold ">Login</h1>
          <h1 className="text-1xl">Login to your organization account</h1>
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
            Login
          </Button>
          <h3 className="flex gap-4 items-center justify-center">
            Already a member?
            <Button
              className="cursor-pointer"
              onClick={() => {
                navigate("/uni-signup");
              }}
            >
              Signup
            </Button>
            <Button
              className="cursor-pointer "
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

export default Login;
