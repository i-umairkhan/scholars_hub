import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Login from "./page/Login";
import Signup from "./page/Signup";
import Home from "./page/Home";
import "./App.css";
import UniLogin from "./page/UniLogin";
import UniSignUp from "./page/UniSignUp";
import AuthContext from "./context/authContext";

function App() {
  const [auth, setAuth] = useState({});
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <Router>
        <div>
          <section>
            <Routes>
              <Route path="/">
                <Route index element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="uni-login" element={<UniLogin />} />
                <Route path="uni-signup" element={<UniSignUp />} />
                <Route path="home" element={<Home />} />
              </Route>
            </Routes>
          </section>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
