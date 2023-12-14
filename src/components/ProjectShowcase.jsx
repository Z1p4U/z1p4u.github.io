import React, { useEffect, useRef } from "react";
import { AiFillGithub } from "react-icons/ai";
import { useInView } from "react-intersection-observer";
import { motion, useScroll, useTransform, useAnimation } from "framer-motion";

const ProjectShowcase = () => {
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

    // if (!inView) {
    //   slideUpAni.start({
    //     y: "50%",
    //     opacity: 0,
    //     transition: {
    //       type: "keyframes",
    //       duration: 0,
    //       bounce: 0.3,
    //     },
    //   });
    // }
  }, [inView]);

  return (
    <div id="work">
      <div className=" container mx-auto py-10 overflow-hidden min-h-screen">
        <div className="section-heading relative overflow-hidden pb-14 text-center">
          <h2 className=" flex justify-center relative z-10 mb-2 uppercase text-[#8338ec] font-bold text-sm lg:text-2xl">
            <span className="text-[#8338ec] ">P R O J E C T S</span>{" "}
            &nbsp;&nbsp;&nbsp;
            <span className="text-[#bebebe] ">S H O W C A S E S</span>
          </h2>
          <span className="relative z-10 inline-block h-1.5 w-32 overflow-hidden rounded-full bg-primary bg-opacity-10">
            <span className="absolute left-0 top-0 inline-block h-full w-1.5 animate-lefttoright rounded-full bg-primary"></span>
          </span>
          <span
            className="pointer-events-none absolute left-1/2 -top-2 z-0 -translate-x-1/2 transform text-9xl font-bold uppercase text-heading opacity-5"
            style={{ willChange: "transform" }}
          >
            Projects
          </span>
        </div>

        <div ref={ref} className="">
          <motion.div
            animate={slideUpAni}
            className="showcase-content overflow-hidden mx-auto text-[#bebebe] px-0 lg:px-20"
            style={{ opacity: 1, transform: "none" }}
          >
            <div className=" flex flex-col gap-10">
              <div className=" border border-gray-200 rounded-lg shadow bg-gray-100">
                <div className=" block lg:flex align-middle">
                  <div className=" lg:w-[627.64px]">
                    <a href="#">
                      <img
                        className="rounded-t-lg"
                        src="/dashboard.png"
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-5 text-2xl font-bold tracking-tight text-blue-500">
                        Dashboard Theme 2023
                      </h5>
                    </a>
                    <h5 className="mb-2 text-lg font-bold tracking-tight text-blue-500">
                      Technology
                    </h5>
                    <div className=" mb-5 flex flex-wrap gap-1">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                        React
                      </span>
                      <span className="bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                        Mantine
                      </span>
                      <span className="bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">
                        Animate.css
                      </span>
                      <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                        Recharts
                      </span>
                    </div>

                    <h5 className="mb-2 text-lg font-bold tracking-tight text-blue-500">
                      Team Member
                    </h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      Shin Khant ,Thant Zin Htet ,Kyaw Min Thant and Chit ko
                    </p>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-center text-blue-500 rounded-lg hover:text-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 transition-all duration-100"
                    >
                      View Repo
                      <AiFillGithub />
                    </a>

                    <a
                      href="#"
                      className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-center text-blue-500 rounded-lg hover:text-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 transition-all duration-100"
                    >
                      Live Preview
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 12 16"
                        height="20"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11 10h1v3c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h3v1H1v10h10v-3zM6 2l2.25 2.25L5 7.5 6.5 9l3.25-3.25L12 8V2H6z"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div className=" border border-gray-200 rounded-lg shadow bg-gray-100">
                <div className=" block lg:flex align-middle">
                  <div className=" lg:w-[627.64px]">
                    <a href="#">
                      <img className="rounded-t-lg" src="/tour.png" alt="" />
                    </a>
                  </div>
                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-5 text-2xl font-bold tracking-tight text-blue-500">
                        Travel Tour 2023
                      </h5>
                    </a>
                    <h5 className="mb-2 text-lg font-bold tracking-tight text-blue-500">
                      Technology
                    </h5>
                    <div className=" mb-5 flex flex-wrap gap-1">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                        React
                      </span>
                      <span className="bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                        Tailwind
                      </span>
                      <span className="bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">
                        Animate.css
                      </span>
                      <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                        Swiper
                      </span>
                    </div>

                    <h5 className="mb-2 text-lg font-bold tracking-tight text-blue-500">
                      Team Member
                    </h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      Shin Khant ,Thant Zin Htet ,Kyaw Min Thant and Chit ko
                    </p>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-center text-blue-500 rounded-lg hover:text-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 transition-all duration-100"
                    >
                      View Repo
                      <AiFillGithub />
                    </a>

                    <a
                      href="#"
                      className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-center text-blue-500 rounded-lg hover:text-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 transition-all duration-100"
                    >
                      Live Preview
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 12 16"
                        height="20"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11 10h1v3c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h3v1H1v10h10v-3zM6 2l2.25 2.25L5 7.5 6.5 9l3.25-3.25L12 8V2H6z"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div className=" border border-gray-200 rounded-lg shadow bg-gray-100">
                <div className=" block lg:flex align-middle">
                  <div className=" lg:w-[627.64px]">
                    <a href="#">
                      <img
                        className="rounded-t-lg lg:w-[627.64px]"
                        src="/contactApp.png"
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-5 text-2xl font-bold tracking-tight text-blue-500">
                        Contact App 2023
                      </h5>
                    </a>
                    <h5 className="mb-2 text-lg font-bold tracking-tight text-blue-500">
                      Technology
                    </h5>
                    <div className=" mb-5 flex flex-wrap gap-1">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                        React
                      </span>
                      <span className="bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                        Mantine
                      </span>
                      <span className="bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">
                        Redux RTK Query
                      </span>
                      <br />
                      <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                        React Host Toast
                      </span>
                    </div>

                    <h5 className="mb-2 text-lg font-bold tracking-tight text-blue-500">
                      Team Member
                    </h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      Shin Khant ,Thant Zin Htet ,Kyaw Min Thant and Chit ko
                    </p>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-center text-blue-500 rounded-lg hover:text-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 transition-all duration-100"
                    >
                      View Repo
                      <AiFillGithub />
                    </a>

                    <a
                      href="#"
                      className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-center text-blue-500 rounded-lg hover:text-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 transition-all duration-100"
                    >
                      Live Preview
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 12 16"
                        height="20"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11 10h1v3c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h3v1H1v10h10v-3zM6 2l2.25 2.25L5 7.5 6.5 9l3.25-3.25L12 8V2H6z"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectShowcase;
