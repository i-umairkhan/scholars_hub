import React, { useContext } from "react";
import AuthContext from "../context/authContext";

function Home() {
  const { auth } = useContext(AuthContext);
  console.log("auth" + auth);
  return <div>{auth.email}</div>;
}

export default Home;
