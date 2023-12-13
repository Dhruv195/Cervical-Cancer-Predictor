import React from "react";
//rotas
import { BrowserRouter, Routes, Route } from "react-router-dom";
//pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { useState } from "react";

import FAQs from "./pages/FAQs";

import Login from "./pages/Login";

import InstructionPage from "./pages/InstructionPage";

import Register from "./pages/Register";

import "./Base.module.css";
//componentes
import Navbar from "./components/Navbar";
import Footer from "./components/Footer/Footer";

function App() {
  const [userstate, setUserState] = useState({});

  console.log("dara", userstate, userstate._id);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/FAQs" element={<FAQs />} />
          <Route
            path="/InstructionPage"
            element={
              userstate ? (
                <InstructionPage
                  setUserState={setUserState}
                  FirstName={userstate.FirstName}
                  LastName={userstate.LastName}
                />
              ) : (
                <Login setUserState={setUserState} />
              )
            }
          ></Route>
          <Route
            path="/login"
            element={<Login setUserState={setUserState} />}
          ></Route>
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
