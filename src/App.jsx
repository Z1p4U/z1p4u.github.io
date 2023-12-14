import React from "react";
import Path from "./routes/Path";
import "animate.css";
import "./App.css";

const App = () => {
  return (
    <div>
      <div className=" fixed left-0 top-0 -z-50 flex h-screen w-full justify-around">
        <span className="border-r border-white border-opacity-5"></span>
        <span className="border-r border-white border-opacity-5"></span>
        <span className="border-r border-white border-opacity-5"></span>
        <span className="border-r border-white border-opacity-5"></span>
        <span className="border-r border-white border-opacity-5"></span>
      </div>
      <Path />
    </div>
  );
};

export default App;
