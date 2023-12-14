import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { MdWeb, MdWorkOutline } from "react-icons/md";
import { FaReact, FaPhp, FaLaravel } from "react-icons/fa";

const Resume = () => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(
    scrollYProgress,
    [0.1, 0.25, 0.75, 1],
    ["-25%", "-15%", "-5%", 0]
  );

  return (
    <div id="resume">
      <motion.div
        style={{ opacity, y }}
        // initial={{ opacity: 0 }}
        // whileInView={{ opacity: 1 }}
        // viewport={{ root: targetRef }}
        variants={{
          hidden: { opacity: 0, y: 55 },
          visiable: { opacity: 1, y: 0 },
        }}
        // initial={{opacity, y}}
        // animate={{opacity, y}}
        // transition={{ duration: 0.5, delay: 0.25 }}
        id="about"
        ref={targetRef}
        className=" min-h-screen about-section pt-24 lg:pt-28 xl:pt-32"
      >
        <div className=" container mx-auto mt-[250px] md:mt-40 ">
          <div className="section-heading relative overflow-hidden pb-14 text-center">
            <h2 className="relative z-10 mb-2 uppercase lg:text-3xl text-[#bebebe] font-bold">
              My Resume
            </h2>
            <span className="relative z-10 inline-block h-1.5 w-32 overflow-hidden rounded-full bg-primary bg-opacity-20">
              <span className="absolute left-0 top-0 inline-block h-full w-1.5 animate-lefttoright rounded-full bg-primary"></span>
            </span>
            <span
              className="pointer-events-none absolute left-1/2 -top-2 z-0 -translate-x-1/2 transform text-9xl font-bold uppercase text-heading opacity-5"
              style={{ willChange: "transform" }}
            >
              Resume
            </span>
          </div>
          <div>
            <VerticalTimeline>
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: "#8338ec1A", color: "#8338ec" }}
                contentArrowStyle={{
                  borderRight: "7px solid  #8338ec1A",
                }}
                date={
                  <div className=" bg-[#8338ec1A] text-[#bfbecb] w-fit me-auto rounded-full px-3 ">
                    1/10/2021 - 12/12/2021
                  </div>
                }
                iconStyle={{
                  background: "#162033",
                  color: "#8338ec",
                }}
                icon={<MdWeb className=" text-4xl" />}
              >
                <h3 className="vertical-timeline-element-title text-xl">
                  The Starting
                </h3>
                <p className=" text-[#bfbecb]">
                  I started learning Basic Web Design and got in touch with
                  HTML, CSS and JavaScript.{" "}
                </p>
              </VerticalTimelineElement>

              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: "#8338ec1A", color: "#8338ec" }}
                contentArrowStyle={{
                  borderRight: "7px solid  #8338ec1A",
                }}
                date={
                  <div className=" bg-[#8338ec1A] text-[#bfbecb] w-fit ms-auto rounded-full px-3 ">
                    1/1/2022 - 21/4/2022
                  </div>
                }
                iconStyle={{
                  background: "#162033",
                  color: "#8338ec",
                }}
                icon={<FaReact className=" text-4xl" />}
              >
                <h3 className="vertical-timeline-element-title text-xl">
                  Started learning Advanced Level
                </h3>
                <p className=" text-[#bfbecb]">
                  After learning basic things, I started Knowing I love making
                  websites.So, I Joined "Special Web Design" class in MMSIT and
                  learned Bootstrap, Tailwind and React.{" "}
                </p>
              </VerticalTimelineElement>

              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: "#8338ec1A", color: "#8338ec" }}
                contentArrowStyle={{
                  borderRight: "7px solid  #8338ec1A",
                }}
                date={
                  <div className=" bg-[#8338ec1A] text-[#bfbecb] w-fit me-auto rounded-full px-3 ">
                    1/5/2022 - 10/9/2022
                  </div>
                }
                iconStyle={{
                  background: "#162033",
                  color: "#8338ec",
                }}
                icon={<FaPhp className=" text-4xl" />}
              >
                <h3 className="vertical-timeline-element-title text-xl">
                  Getting in touch with Backend Languages
                </h3>
                <p className=" text-[#bfbecb] ">
                  After learning React and able to create some small projects, I
                  started learning Backend Languages like PHP and Database
                  Management System like MYSQL.{" "}
                </p>
              </VerticalTimelineElement>

              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: "#8338ec1A", color: "#8338ec" }}
                contentArrowStyle={{
                  borderRight: "7px solid  #8338ec1A",
                }}
                date={
                  <div className=" bg-[#8338ec1A] text-[#bfbecb] w-fit ms-auto rounded-full px-3 ">
                    15/9/2022 - 20/12/2022
                  </div>
                }
                iconStyle={{
                  background: "#162033",
                  color: "#8338ec",
                }}
                icon={<FaLaravel className=" text-4xl" />}
              >
                <h3 className="vertical-timeline-element-title text-xl">
                  Laravel
                </h3>
                <p className=" text-[#bfbecb]">
                  After knowing basic and became able to understand the flow of
                  backend languages, I started learning Laravel.{" "}
                </p>
              </VerticalTimelineElement>

              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: "#8338ec1A", color: "#8338ec" }}
                contentArrowStyle={{
                  borderRight: "7px solid  #8338ec1A",
                }}
                date={
                  <div className=" bg-[#8338ec1A] text-[#bfbecb] w-fit me-auto rounded-full px-3 ">
                    1/1/2023 - 1/7/2023
                  </div>
                }
                iconStyle={{
                  background: "#162033",
                  color: "#8338ec",
                }}
                icon={<MdWorkOutline className=" text-4xl" />}
              >
                <h3 className="vertical-timeline-element-title text-xl">
                  Joined workshops and started seeking Jobs
                </h3>
                <p className=" text-[#bfbecb] ">
                  After learning Laravel, I started training my skills in
                  workshop and now I can able to join internship programs or
                  even Junior Level Jobs.{" "}
                </p>
              </VerticalTimelineElement>

              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: "#8338ec1A", color: "#8338ec" }}
                contentArrowStyle={{
                  borderRight: "7px solid  #8338ec1A",
                }}
                date={
                  <div className=" bg-[#8338ec1A] text-[#bfbecb] w-fit ms-auto rounded-full px-3 ">
                    15/9/2022 - 20/12/2022
                  </div>
                }
                iconStyle={{
                  background: "#162033",
                  color: "#8338ec",
                }}
                icon={<FaLaravel className=" text-4xl" />}
              >
                <h3 className="vertical-timeline-element-title text-xl">
                  Started a job
                </h3>
                <p className=" text-[#bfbecb]">
                  From 1/8/2023 I started my first job as a Full Stack Web
                  Developer in YOLO Digital Marketing Agency and start building
                  my skills and experiences.
                </p>
              </VerticalTimelineElement>
            </VerticalTimeline>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// import React, { useEffect, useRef } from 'react'
// import { motion, useAnimation } from 'framer-motion'
// import { useInView } from 'react-intersection-observer'

// const Resume = () => {

//   const [ref, inView] = useInView();
//   const widthAni = useAnimation();

//   useEffect(() => {
//     if(inView){
//       widthAni.start({
//         width: '100%',
//         transition: {
//           type: 'keyframes', duration: 0.4, bounce: 0.3
//         }
//       })
//     }
//     if(!inView){
//       widthAni.start({
//         width: 0,
//         transition: {
//           type: 'keyframes', duration: 0.4, bounce: 0.3
//         }
//       })
//     }
//   }, [inView])

//   return (
//     <div ref={ref} className=' min-h-screen' id='resume'>
//       <div className="progress-bar-container w-full">
//           <div className="w-full h-[3px]">
//             <motion.div
//               animate={widthAni}
//               className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% h-[3px]"
//             ></motion.div>
//           </div>
//         </div>
//     </div>
//   )
// }

export default Resume;
