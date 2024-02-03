import React from "react";
import HeroSection from "../components/HeroSection";
import ProjectShowcase from "../components/ProjectShowcase";
import Skills from "../components/Skills";
import Resume from "../components/Resume";
import About from "../components/About";

const Home = () => {
  return (
    <div>
      <div>
        <HeroSection />

        <About />

        <Skills />

        <ProjectShowcase />

        <Resume />
      </div>
    </div>
  );
};

export default Home;
