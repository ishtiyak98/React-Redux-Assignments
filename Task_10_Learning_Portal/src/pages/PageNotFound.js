import React from "react";
import Navbar from "../components/Navbar/Navbar";
import ErrorImg from "../assets/404.jpg";

const PageNotFound = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="flex h-[85vh] justify-center items-center">
        <img src={ErrorImg} alt="" srcset="" className="rounded-lg w-[80%] lg:w-[35%]" />
      </div>
      <div></div>
    </>
  );
};

export default PageNotFound;
