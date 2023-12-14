import React from "react";
import { Link } from "react-router-dom";
import WOW from "wow.js";
import "animate.css";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { BiSolidMap } from "react-icons/bi";
import CheckIcon from "@rsuite/icons/Check";
import "rsuite/dist/rsuite.min.css";
import { Timeline } from "rsuite";
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
import Skills from "../components/Skills";
const About = () => {
  const wowjs = new WOW({
    boxClass: "wow", // default
    animateClass: "animate__animated", // default
    offset: 0, // default
    mobile: true, // default
    live: true, // default
  });
  wowjs.init();
  return (
    <>
      {" "}
      <div className=" md:min-h-screen  mt-[50px] pt-20">
        <p className=" text-4xl text-center font-semibold">About Us</p>
        <div className=" flex  bg-white px-3 mx-auto w-fit rounded-md font-semibold mt-[20px] text-gray-600">
          {" "}
          <Link to={`/home`}>
            <p className=" cursor-pointer hover:text-red-700 hover:font-semibold transition-all">
              Home
            </p>
          </Link>
          /
          <p className=" cursor-pointer hover:text-red-700 hover:font-semibold transition-all">
            About
          </p>
        </div>
        <div className=" flex flex-col-reverse mt-[50px] gap-2 items-center md:flex-col-reverse w-[100%]  lg:flex-row-reverse">
          {" "}
          <div className=" flex flex-col gap-2 lg:w-[45%]  md:w-full w-[100%] wow animate__fadeInRight  ">
            <div className=" mt-[20px] md:mt-0 lg:mt-0 xl:mt-0">
              {" "}
              <p className=" text-[20px] font-semibold text-gray-500  ">
                About Our Group
              </p>
              <p className=" text-[30px] md:text-[30px] lg:text-[40px]">
                Create Modern Frontend Projects
              </p>
            </div>

            <div className="flex flex-col gap-2 mx-[12px]">
              {" "}
              <p className=" mt-5 text-[18px] space-y-3 text-gray-700 lg:w-[100%] w-[100%] md:w-[100%]">
                We are <span className=" font-semibold ">Team-A</span>{" "}
                ,frontend-devolopers and formed with four people and working on
                a project as a group.We do{" "}
                <span className=" font-semibold ">
                  Frontend-development with React and others css framework and
                  libraries.
                </span>
              </p>
              <p className="text-[18px] space-y-3 text-gray-700 lg:w-[100%] w-[100%] md:w-[100%]">
                {" "}
                We have some knowledges about backend and UI/UX as
                well.Currently,we are making group projects and recently we have
                done many group projects as well and you can watch as you wish
                in{" "}
                <a className=" " href="#">
                  group projects
                </a>
              </p>
            </div>

            <button className="mx-[12px] mt-3 w-[30%] text-white bg-blue-500 rounded-md font-semibold p-2 hover:bg-blue-600 transition-all">
              Contact
            </button>
          </div>
          <img
            className=" object-cover w-[95%] mx-auto h-[25vh] md:w-full md:h-[35vh] lg:w-[46%] lg:h-[50vh] shadow-md rounded-md wow animate__fadeInLeft"
            src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80"
            alt=""
          />
        </div>
      </div>
      <div className="">
        <p className=" text-4xl text-center font-semibold mt-[150px]">
          Our Timeline
        </p>
        <div className=" overflow-x-hidden mt-[60px]">
          <Timeline className="custom-timeline" align="alternate">
            <Timeline.Item>
              <p className=" wow animate__fadeInRight font-bold text-md">
                October 1, 2021
              </p>
              <p className=" wow animate__fadeInRight">
                We start Basic Web Desgin
              </p>
            </Timeline.Item>
            <Timeline.Item
              dot={
                <CheckIcon
                  style={{
                    borderRadius: "50%",
                    background: "#15b215",
                    color: "#fff",
                  }}
                />
              }
            >
              <p className=" wow animate__fadeInLeft font-bold text-md">
                December 12, 2021
              </p>
              <p className=" wow animate__fadeInLeft">
                We finished Basic Web Desgin
              </p>
            </Timeline.Item>
            <Timeline.Item>
              <p className=" wow animate__fadeInRight font-bold text-md">
                January 1, 2022
              </p>
              <p className=" wow animate__fadeInRight">
                We joining mmsit from Special Web Desgin
              </p>
            </Timeline.Item>
            <Timeline.Item
              dot={
                <CheckIcon
                  style={{
                    borderRadius: "50%",
                    background: "#15b215",
                    color: "#fff",
                  }}
                />
              }
            >
              <p className=" wow animate__fadeInLeft font-bold text-md">
                March 2, 2022
              </p>
              <p className=" wow animate__fadeInLeft">
                We finished Special Web Desgin
              </p>
            </Timeline.Item>
            <Timeline.Item>
              <p className=" wow animate__fadeInRight font-bold text-md">
                April 1, 2022
              </p>
              <p className=" wow animate__fadeInRight">
                We joining mmsit from Web Application Development
              </p>
            </Timeline.Item>
            <Timeline.Item
              dot={
                <CheckIcon
                  style={{
                    borderRadius: "50%",
                    background: "#15b215",
                    color: "#fff",
                  }}
                />
              }
            >
              <p className=" wow animate__fadeInLeft font-bold text-md">
                July 28, 2022
              </p>
              <p className=" wow animate__fadeInLeft">
                We finished Web Application Development
              </p>
            </Timeline.Item>
            <Timeline.Item>
              <p className=" wow animate__fadeInRight font-bold text-md">
                Jun 28, 2023
              </p>
              <p className=" wow animate__fadeInRight">We joining Workshop</p>
            </Timeline.Item>
          </Timeline>
        </div>
      </div>
      {/* <div className=" mt-[150px]">
        <div className=" my-10">
          <h2 className=" flex justify-center text-4xl text-gray-600 font-semibold">
            Skills
          </h2>
          <div className=" mt-10 grid justify-center items-center align-middle grid-cols-5 grid-rows-2 gap-5 my-5 px-20">
            <FaHtml5 className="hover:text-blue-500 transition-all text-9xl mx-auto icon col-start-1 col-span-1 row-start-1 row-span-1" />
            <FaCss3 className="hover:text-blue-500 transition-all text-9xl mx-auto icon col-start-2 col-span-1 row-start-1 row-span-1" />
            <BiLogoJavascript className="hover:text-blue-500 transition-all text-9xl mx-auto icon col-start-3 col-span-1 row-start-1 row-span-1" />
            <FaBootstrap className="hover:text-blue-500 transition-all text-9xl mx-auto icon col-start-4 col-span-1 row-start-1 row-span-1" />
            <BiLogoSass className="hover:text-blue-500 transition-all text-9xl mx-auto icon col-start-5 col-span-1 row-start-1 row-span-1" />
            <BiLogoTailwindCss className="hover:text-blue-500 transition-all text-9xl mx-auto icon col-start-1 col-span-1 row-start-2 row-span-1" />
            <FaReact className="hover:text-blue-500 transition-all text-9xl mx-auto icon col-start-2 col-span-1 row-start-2 row-span-1" />
            <BiLogoRedux className="hover:text-blue-500 transition-all text-9xl mx-auto icon col-start-3 col-span-1 row-start-2 row-span-1" />
            <BsGithub className="hover:text-blue-500 transition-all text-9xl mx-auto icon col-start-4 col-span-1 row-start-2 row-span-1" />
            <FaGitlab className="hover:text-blue-500 transition-all text-9xl mx-auto icon col-start-5 col-span-1 row-start-2 row-span-1" />
            <FaPhp className=" text-9xl mx-auto icon col-start-1 col-span-1 row-start-1 row-span-1" />
            <SiMysql className=" text-9xl mx-auto icon col-start-1 col-span-1 row-start-1 row-span-1" />
            <FaLaravel className=" text-9xl mx-auto icon col-start-1 col-span-1 row-start-1 row-span-1" />
          </div>
        </div>
      </div> */}
      <Skills />
      <div className="  w-[100%]  my-[50px] ">
        <div className="flex items-center flex-col gap-3">
          <p className=" text-4xl text-center font-semibold">Contact Us</p>
          {/* <div className="text-center mt-5">
          <span className=" text-xl font-semibold text-gray-500 ">
            We,TeamA are forming with frontend developers so we can make
            frontend UI design with sketch to production level with backend
            developers and also with UI/UX designers.So if you think we can fit
            with your teams or projects let us know.{" "}
          </span>
        </div> */}
          <div className="flex justify-center w-full  gap-3 flex-wrap mt-[80px] wow animate__fadeInDown">
            <div className=" flex lg:w-[450px] w-[94%] md:w-[32%] xl:w-[440px] cursor-pointer gap-3 onhover  items-center  bg-white shadow-md p-5">
              <BiSolidMap className="icon bg-blue-500 w-fit changebg p-3 text-white text-xl h-fit rounded-full" />
              <div className="flex flex-col gap-2">
                <p className=" text-[20px] font-semibold changecolor">
                  Locate Us
                </p>
                <p className="  text-gray-500 changecolor">Yangon,Myanmar</p>
              </div>
            </div>
            <div className=" flex onhover lg:w-[450px] w-[94%] md:w-[32%] xl:w-[440px] cursor-pointer gap-3  items-center bg-white shadow-md  p-5">
              <BsFillTelephoneFill className="icon changebg bg-blue-500 w-fit p-3 text-white text-xl h-fit rounded-full" />
              <div className="flex flex-col gap-2">
                <p className=" text-[20px] font-semibold changecolor">
                  Give Us A Call
                </p>
                <p className="  text-gray-500 changecolor">09090598355</p>
              </div>
            </div>{" "}
            <div className=" flex onhover cursor-pointer  gap-3 items-center lg:w-[450px] w-[94%] md:w-[32%] xl:w-[440px] bg-white shadow-md p-5">
              <MdEmail className="icon changebg bg-blue-500 w-fit p-3 text-white text-xl h-fit rounded-full" />
              <div className="flex flex-col gap-2">
                <p className=" text-[20px] font-semibold changecolor">
                  {" "}
                  Get In Online
                </p>
                <p className="  text-gray-500 changecolor">TeamA@gmail.com</p>
              </div>
            </div>
          </div>{" "}
          <form
            className=" w-full mt-[40px]"
            action=""
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex  flex-col gap-2 ">
              <div className="flex justify-center flex-wrap wow animate__fadeInLeft md:gap-2 gap-2">
                <input
                  type="text"
                  className="xl:w-[45%] md:w-[49%] w-[100%] lg:w-[98%] bg-white shadow-lg border-[1px] p-3"
                  placeholder="Your name"
                  required
                />

                <input
                  type="text"
                  className=" xl:w-[45%] md:w-[49%] w-[100%] lg:w-[98%] bg-white shadow-lg border-[1px] p-3"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="wow animate__fadeIn flex flex-col gap-2">
                <input
                  type="text"
                  className=" xl:w-[91%] mx-auto md:w-[100%] w-[100%] lg:w-[98%] bg-white shadow-lg border-[1px] p-3"
                  placeholder="Advices"
                  required
                />
                <textarea
                  type="text"
                  className=" resize-none xl:w-[91%] mx-auto md:w-[100%] w-[100%] lg:w-[98%] h-[150px]  bg-white shadow-lg border-[1px] p-3"
                  placeholder="Message"
                  required
                />{" "}
                <button className=" hover:bg-blue-600 transition-all text-white   rounded-md mx-auto w-[91%]  bg-blue-500 p-2 mt-4 font-semibold">
                  Send
                </button>
              </div>{" "}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default About;
