import { Button, TextField } from "@mui/material";
import React from "react";

function Signup() {
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
          />
          <TextField
            id="standard-basic"
            label="Second Name"
            variant="outlined"
          />
          <TextField id="standard-basic" label="Email" variant="outlined" />
          <TextField id="standard-basic" label="Password" variant="outlined" />
          <Button variant="contained">Create Account</Button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
