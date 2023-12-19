import React from "react";
import GetStarted from "../components/GetStarted";
import Header from "../components/Header";
import { tabTitle } from "../App";
const Home = () => {
  tabTitle("Home | Cervical Cancer Awareness");
  return (
    <>
      <Header />
      <GetStarted />
    </>
  );
};

export default Home;
