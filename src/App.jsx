import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Login from "./page/Login";
import Signup from "./page/Signup";
import Home from "./page/Home";
import "./App.css";
import UniLogin from "./page/UniLogin";
import UniSignUp from "./page/UniSignUp";

function App() {
  return (
    <Router>
      <div>
        <section>
          <Routes>
            <Route path="/">
              <Route index element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="uni-login" element={<UniLogin />} />
              <Route path="uni-signup" element={<UniSignUp />} />
            </Route>
            <Route path="/home" element={<Home />} />
          </Routes>
        </section>
      </div>
    </Router>
  );
}

export default App;
