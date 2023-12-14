import React, { useEffect, useRef } from "react";
import {
  FaHtml5,
  FaCss3,
  FaBootstrap,
  FaReact,
  FaPhp,
  FaGitlab,
  FaLaravel,
} from "react-icons/fa";
import {
  BiLogoJavascript,
  BiLogoTailwindCss,
  BiLogoSass,
  BiLogoRedux,
} from "react-icons/bi";
import { BsGithub } from "react-icons/bs";
import { SiMysql } from "react-icons/si";
import { useInView } from "react-intersection-observer";
import { motion, useScroll, useTransform, useAnimation } from "framer-motion";

const Skills = () => {
  const targetRef = useRef(null);
  const [ref, inView] = useInView();
  const slideUpAni = useAnimation();
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [1, 0], [1, 0]);
  const y = useTransform(
    scrollYProgress,
    [0.1, 0.25, 0.75, 1],
    ["-25%", "-15%", "-5%", 0]
  );

  useEffect(() => {
    if (inView) {
      slideUpAni.start({
        y: 0,
        opacity: 1,
        transition: {
          type: "keyframes",
          duration: 1,
          bounce: 0.3,
        },
      });
    }

    if (!inView) {
      slideUpAni.start({
        y: "50%",
        opacity: 0,
        transition: {
          type: "keyframes",
          duration: 0,
          bounce: 0.3,
        },
      });
    }
  }, [inView]);

  return (
    <div id="skills">
      <div className=" container mx-auto py-10 overflow-hidden min-h-screen">
        <div className="section-heading relative overflow-hidden pb-14 text-center">
          <h2 className=" flex justify-center relative z-10 mb-2 uppercase text-[#bebebe] font-bold text-sm lg:text-2xl">
            T E C H N O L O G I E S{" "}
            <span className="text-[#8338ec] ">&nbsp;&nbsp;I&nbsp;&nbsp;</span>H
            A V E &nbsp;&nbsp;
            <span className="text-[#8338ec] ">T O U C H E D</span>
          </h2>
          <span className="relative z-10 inline-block h-1.5 w-32 overflow-hidden rounded-full bg-primary bg-opacity-10">
            <span className="absolute left-0 top-0 inline-block h-full w-1.5 animate-lefttoright rounded-full bg-primary"></span>
          </span>
          <span
            className="pointer-events-none absolute left-1/2 -top-2 z-0 -translate-x-1/2 transform text-9xl font-bold uppercase text-heading opacity-5"
            style={{ willChange: "transform" }}
          >
            Technologies
          </span>
        </div>

        <div ref={ref} className="">
          {/* <motion.div
            animate={slideUpAni}
            className="about-content overflow-hidden  grid justify-center items-center text-[#bebebe] align-middle grid-cols-3 grid-rows-4 md:grid-cols-4 lg:grid-cols-5 md:grid-rows-3 gap-5  px-0 md:px-20"
            style={{ opacity: 1, transform: "none" }}
          >
            <FaHtml5 className=" text-7xl lg:text-8xl mx-auto my-auto icon col-start-1 col-span-1 row-start-1 row-span-1" />
            <FaCss3 className=" text-7xl lg:text-8xl mx-auto my-auto icon col-start-2 col-span-1 row-start-1 row-span-1" />
            <BiLogoJavascript className=" text-7xl lg:text-8xl mx-auto my-auto icon col-start-3 col-span-1 row-start-1 row-span-1" />
            <FaBootstrap className=" text-7xl lg:text-8xl mx-auto my-auto icon col-start-1 md:col-start-4 col-span-1 row-start-2 md:row-start-1 row-span-1" />
            <BiLogoSass className=" text-7xl lg:text-8xl mx-auto my-auto icon col-start-2 md:col-start-5 col-span-1 row-start-2 md:row-start-1 row-span-1" />
            <BiLogoTailwindCss className=" text-7xl lg:text-8xl mx-auto my-auto icon col-start-3 md:col-start-1 col-span-1 row-start-2 md:row-start-2 row-span-1" />
            <FaReact className=" text-7xl lg:text-8xl mx-auto my-auto icon col-start-1 md:col-start-2 col-span-1 row-start-3 md:row-start-2 row-span-1" />
            <BiLogoRedux className=" text-7xl lg:text-8xl mx-auto my-auto icon col-start-2 md:col-start-3 col-span-1 row-start-3 md:row-start-2 row-span-1" />
            <BsGithub className=" text-7xl lg:text-8xl mx-auto my-auto icon col-start-3 md:col-start-4 col-span-1 row-start-3 md:row-start-2 row-span-1" />
            <FaGitlab className=" text-7xl lg:text-8xl mx-auto my-auto icon col-start-1 md:col-start-5 col-span-1 row-start-4 md:row-start-2 row-span-1" />
            <FaPhp className=" text-7xl lg:text-8xl mx-auto my-auto icon col-start-2 md:col-start-1 col-span-1 row-start-4 md:row-start-3 row-span-1" />
            <SiMysql className=" text-7xl lg:text-8xl mx-auto my-auto icon col-start-3 md:col-start-2 col-span-1 row-start-4 md:row-start-3 row-span-1" />
            <FaLaravel className=" text-7xl lg:text-8xl mx-auto my-auto icon col-start-1 md:col-start-3 col-span-1 row-start-5 md:row-start-3 row-span-1" />
          </motion.div> */}

          <motion.div
            animate={slideUpAni}
            className="skill-content text-[70px] sm:text-[85px] overflow-hidden mx-auto text-[#bebebe] px-0 lg:px-20 flex flex-wrap justify-evenly gap-2 sm:gap-20 w-3/4 lg:w-[60%] align-middle items-center"
            style={{ opacity: 1, transform: "none" }}
          >
            <FaHtml5 className="icon" />
            <FaCss3 className="icon" />
            <BiLogoJavascript className="icon" />
            <FaBootstrap className="icon" />
            <BiLogoSass className="icon" />
            <BiLogoTailwindCss className="icon" />
            <FaReact className="icon" />
            <BiLogoRedux className="icon" />
            <BsGithub className="icon" />
            <FaPhp className="icon" />
            <SiMysql className="icon" />
            <FaLaravel className="icon" />
          </motion.div>
        </div>

        {/* <h2 className=" flex justify-center text-4xl  font-semibold">
           My <span className="text-blue-500 ms-2">Skills</span>
         </h2>
         <div className=" grid justify-center items-center align-middle grid-cols-5 grid-rows-3 gap-6 my-5 px-20">
           <FaHtml5 className=" text-9xl mx-auto my-auto icon col-start-1 col-span-1 row-start-1 row-span-1" />
           <FaCss3 className=" text-9xl mx-auto my-auto icon col-start-2 col-span-1 row-start-1 row-span-1" />
           <BiLogoJavascript className=" text-9xl mx-auto my-auto icon col-start-3 col-span-1 row-start-1 row-span-1" />
           <FaBootstrap className=" text-9xl mx-auto my-auto icon col-start-4 col-span-1 row-start-1 row-span-1" />
           <BiLogoSass className=" text-9xl mx-auto my-auto icon col-start-5 col-span-1 row-start-1 row-span-1" />
           <BiLogoTailwindCss className=" text-9xl mx-auto my-auto icon col-start-1 col-span-1 row-start-2 row-span-1" />
           <FaReact className=" text-9xl mx-auto my-auto icon col-start-2 col-span-1 row-start-2 row-span-1" />
           <BiLogoRedux className=" text-9xl mx-auto my-auto icon col-start-3 col-span-1 row-start-2 row-span-1" />
           <BsGithub className=" text-9xl mx-auto my-auto icon col-start-4 col-span-1 row-start-2 row-span-1" />
           <FaGitlab className=" text-9xl mx-auto my-auto icon col-start-5 col-span-1 row-start-2 row-span-1" />
           <FaPhp className=" text-9xl mx-auto my-auto icon col-start-1 col-span-1 row-start-3 row-span-1" />
           <SiMysql className=" text-9xl mx-auto my-auto icon col-start-2 col-span-1 row-start-3 row-span-1" />
           <FaLaravel className=" text-9xl mx-auto my-auto icon col-start-3 col-span-1 row-start-3 row-span-1" />
         </div>
       </div> */}
      </div>
    </div>
  );
};

export default Skills;
