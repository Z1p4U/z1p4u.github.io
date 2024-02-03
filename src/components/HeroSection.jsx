import React from "react";
import Typewriter from "typewriter-effect";
import { Tilt } from "react-tilt";
import WOW from "wow.js";
import "animate.css";
import { Button } from "@mantine/core";
import {
  FiArrowDown,
  FiFacebook,
  FiGithub,
  FiLinkedin,
  FiTwitter,
} from "react-icons/fi";
import { Link } from "react-scroll";
import { Link as RouteLink } from "react-router-dom";

const defaultOptions = {
  reverse: false, // reverse the tilt direction
  max: 35, // max tilt rotation (degrees)
  perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1.1, // 2 = 200%, 1.5 = 150%, etc..
  speed: 1000, // Speed of the enter/exit transition
  transition: true, // Set a transition on enter/exit.
  axis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
};

const wow = new WOW({
  boxClass: "wow", // default
  animateClass: "animate__animated", // default
  offset: 0, // default
  mobile: true, // default
  live: true, // default
});
wow.init();

const HeroSection = () => {
  return (
    <>
      <div className=" min-h-screen" id="hero">
        <div className=" grid grid-cols-12 grid-rows-2 md:grid-rows-1">
          <div className=" row-span-2 row-start-1 col-start-1 col-span-12 md:col-span-7 py-8">
            <div className=" hidden mb-8 text-[#bebebe] text-xs lg:text-sm align-middle md:grid grid-cols-12">
              <div className=" col-start-1 col-span-9 lg:col-span-7 mb-2">
                C R A F T I N G &nbsp;&nbsp; E X P E R I E N C E S
              </div>
              <div className=" col-start-5 col-span-9 lg:col-start-4 lg:col-span-7">
                B U I L D I N G &nbsp;&nbsp; C O N N E C T I O N S
              </div>
            </div>

            <div className=" text-5xl text-start md:text-6xl font-bold text-[#bebebe] ">
              <h1>Hi!</h1>
              <h1 className=" inline-block">I am</h1>
              <span className=" text-[#8338ec]">
                {" "}
                <p className="wow animate__fadeInRight inline-block">
                  Thant Zin
                </p>
              </span>
            </div>

            <div className=" text-start typetext text-xl lg:text-2xl mt-8 w-[300px] lg:w-[550px] xl:w-[650px] h-[60px] xl:h-fit">
              <div className="">
                <Typewriter
                  options={{
                    autoStart: true,
                    delay: 50,
                    loop: true,
                  }}
                  onInit={(typewriter) => {
                    typewriter
                      .typeString(
                        "<span style='color: #8338ec;'>I</span> Am A Full Stack Web Developer."
                      )
                      .changeDeleteSpeed(0.5)
                      .pauseFor(1500)
                      .deleteChars(31)

                      // .typeString("Have Strong Passion And Eager To Learn.")
                      // .changeDeleteSpeed(0.3)
                      // .pauseFor(1500)
                      // .deleteChars(39)

                      .typeString(
                        "Love Building Beautiful and Maintainable Websites."
                      )
                      .changeDeleteSpeed(0.3)
                      .pauseFor(1500)
                      .deleteChars(45)

                      .changeDelay(100)
                      .typeString("Web Development!")
                      .pauseFor(1500)

                      .start();
                  }}
                />
              </div>
            </div>

            <div className=" mt-8 md:me-5">
              <p className=" text-[#bebebe] text-sm leading-6 tracking-wide md:leading-7 text-start">
                Welcome to my portfolio! We are passionate and dedicated web
                developers with a focus on crafting impactful web experiences,
                <span className="hidden lg:inline">
                  We love creating beautiful and user-friendly websites.
                </span>{" "}
                Let's collaborate and bring your web ideas to life!
              </p>
            </div>

            <div className="my-6 flex flex-col gap-3 lg:gap-0 lg:flex-row justify-start md:justify-between align-middle items-center md:me-10 lg:me-12">
              {/* <a className="btn hidden lg:block hover:no-underline hover:text-black">
                <span>Explore My Portfolio</span>
              </a> */}

              <ul className=" flex list-none flex-wrap gap-3 sm:gap-4 text-violet-700">
                <li className="inline-block align-middle ">
                  <a
                    href="https://www.facebook.com/profile.php?id=100010478018386"
                    target="_blank"
                    rel=" noopener noreferrer"
                    className="group focus:text-violet-700 relative inline-block h-10 w-10 overflow-hidden border border-white border-opacity-10 text-center align-middle text-lg leading-none text-body rounded "
                  >
                    <span className=" front relative left-0 top-0 flex h-full w-full translate-y-0 transform items-center justify-center rounded bg-grey transition-all duration-500 group-hover:-translate-y-full">
                      <FiFacebook />
                    </span>
                    <span className=" back absolute left-0 top-0 flex h-full w-full translate-y-full items-center justify-center rounded bg-primary text-grey transition-all duration-500 group-hover:translate-y-0">
                      <FiFacebook />
                    </span>
                  </a>
                </li>
                <li className="inline-block align-middle">
                  <a
                    href="https://twitter.com/Thant_Zin_Htet"
                    target="_blank"
                    rel=" noopener noreferrer"
                    className=" hove focus:text-violet-700 group relative inline-block h-10 w-10 overflow-hidden border border-white border-opacity-10 text-center align-middle text-lg leading-none text-body rounded "
                  >
                    <span className=" front relative left-0 top-0 flex h-full w-full translate-y-0 transform items-center justify-center rounded bg-grey transition-all duration-500 group-hover:-translate-y-full ">
                      <FiTwitter />
                    </span>
                    <span className=" back absolute left-0 top-0 flex h-full w-full translate-y-full items-center justify-center rounded bg-primary text-grey transition-all duration-500 group-hover:translate-y-0">
                      <FiTwitter />
                    </span>
                  </a>
                </li>
                <li className="inline-block align-middle">
                  <a
                    href="https://github.com/Z1p4U"
                    target="_blank"
                    rel=" noopener noreferrer"
                    className="group focus:text-violet-700 relative inline-block h-10 w-10 overflow-hidden border border-white border-opacity-10 text-center align-middle text-lg leading-none text-body rounded"
                  >
                    <span className=" front relative left-0 top-0 flex h-full w-full translate-y-0 transform items-center justify-center rounded bg-grey transition-all duration-500 group-hover:-translate-y-full">
                      <FiGithub />
                    </span>
                    <span className=" back absolute left-0 top-0 flex h-full w-full translate-y-full items-center justify-center rounded bg-primary text-grey transition-all duration-500 group-hover:translate-y-0">
                      <FiGithub />
                    </span>
                  </a>
                </li>
                <li className="inline-block align-middle">
                  <a
                    href="https://www.linkedin.com/in/zip-p-aa3154204/"
                    target="_blank"
                    rel=" noopener noreferrer"
                    className="group focus:text-violet-700 relative inline-block h-10 w-10 overflow-hidden border border-white border-opacity-10 text-center align-middle text-lg leading-none text-body rounded"
                  >
                    <span className=" front relative left-0 top-0 flex h-full w-full translate-y-0 transform items-center justify-center rounded bg-grey transition-all duration-500 group-hover:-translate-y-full">
                      <FiLinkedin />
                    </span>
                    <span className=" back absolute left-0 top-0 flex h-full w-full translate-y-full items-center justify-center rounded bg-primary text-grey transition-all duration-500 group-hover:translate-y-0">
                      <FiLinkedin />
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className=" col-start-1 md:col-start-8 col-span-12 md:col-span-5 h-fit">
            <div className="hidden md:block row-start-1 row-span-1 col-start-1 md:col-start-8 col-span-12 md:col-span-5 h-fit">
              {/* <Tilt
                options={defaultOptions}
                className={" px-8 md:px-0 w-full h-[500px] mx-auto"}
              >
                <div className="tilt">
                  <img
                    className="profile w-full h-[500px]"
                    src="https://img.freepik.com/free-vector/colourful-illustration-programmer-working_23-2148281410.jpg?w=1060&t=st=1689104904~exp=1689105504~hmac=86926569a1e949559ae4ba93a699f36c050ebf6e69cfb79a8cd37fd80e1321d7"
                    alt=""
                  />
                </div>
              </Tilt> */}
              <div className="bg-[url('/mypic.jpg')] bg-cover h-[500px] flex justify-end align-baseline items-baseline">
                <div
                  style={{ opacity: 1, transform: "none" }}
                  className=" mt-7 text-center"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <Link
          to="about"
          spy={true}
          smooth={true}
          offset={0}
          duration={500}
          className="hover:text-[#bebebe] hover:no-underline"
        >
          <div className=" text-center cursor-pointer  transition-all duration-100 flex justify-center gap-2 align-middle items-center ">
            Explore My Portfolio{" "}
            <span>
              <FiArrowDown className="" />
            </span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default HeroSection;
