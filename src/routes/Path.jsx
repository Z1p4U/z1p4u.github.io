import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import About from "../pages/About";
import Footer from "../components/Footer";
import Projects from "../pages/Projects";
import Credits from "../pages/Credits";
import About_contact from "../pages/About_contact";
import ProjectShowcase from "../components/ProjectShowcase";
import Skills from "../components/Skills";

const Path = () => {
  return (
    <>
      <Navbar />
      <div className=" container mx-auto px-5 md:px-30 my-24 ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/about-contact" element={<About_contact />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/credits" element={<Credits />} />

          {/* components */}
          <Route path="/" element={<Home />} />
          <Route path="/showcase" element={<ProjectShowcase />} />
          <Route path="/skills" element={<Skills />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default Path;
