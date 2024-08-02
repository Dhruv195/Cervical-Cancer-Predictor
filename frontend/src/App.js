import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//pages
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import { useState } from "react";
import FAQs from "./pages/FAQs";
import Login from "./pages/Login";
import InstructionPage from "./pages/InstructionPage";
import Register from "./pages/Register";
import Otpverification from "./pages/Otpverification";

//componentes
import Navbar from "./components/Navbar";
import Footer from "./components/Footer/Footer";
import Symptoms from "./pages/Symptoms";

// Page Title
export function tabTitle(newTitle) {
  return (document.title = newTitle);
}

function App() {
  const [userstate, setUserState] = useState({});

  console.log("dara", userstate, userstate._id);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/symptoms" element={<Symptoms />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/FAQs" element={<FAQs />} />
          <Route path="/otpverification" element={<Otpverification />} />
          <Route
            path="/instructionpage"
            element={
              userstate ? (
                <InstructionPage
                  FirstName={userstate.FirstName}
                  LastName={userstate.LastName}
                />
              ) : (
                <Login setUserState={setUserState} />
              )
            }
          />
          <Route
            path="/login"
            element={<Login setUserState={setUserState} />}
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
