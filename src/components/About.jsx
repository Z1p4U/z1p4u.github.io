import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MdDownload } from "react-icons/md";

const About = () => {
  const targetRef = useRef(null);
  const [ref, inView] = useInView({ triggerOnce: true });
  const slideUpAni = useAnimation();
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
        y: "100%",
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
    <div
      id="about"
      className=" min-h-screen py-10 about-section overflow-hidden"
    >
      <div className=" container mx-auto">
        <div className="section-heading relative overflow-hidden pb-14 text-center">
          <h2 className=" flex justify-center text-[#bebebe] text-sm lg:text-2xl relative z-10 mb-2 uppercase font-semibold">
            A B O U T &nbsp;&nbsp; <span className="text-[#8338ec] ">M E</span>
          </h2>
          <span className="relative z-10 inline-block h-1.5 w-32 overflow-hidden rounded-full bg-primary bg-opacity-20">
            <span className="absolute left-0 top-0 inline-block h-full w-1.5 animate-lefttoright rounded-full bg-primary"></span>
          </span>
          <span
            className="pointer-events-none absolute left-1/2 -top-2 z-0 -translate-x-1/2 transform text-9xl font-bold uppercase text-heading opacity-5"
            style={{ willChange: "transform" }}
          >
            About
          </span>
        </div>

        <div ref={ref} className=" grid grid-cols-2 items-center gap-16">
          <div className=" col-span-2 lg:col-span-1">
            <motion.div
              animate={slideUpAni}
              className="about-image overflow-hidden"
              style={{ opacity: 1, transform: "none" }}
            >
              <div className="about-image-inner fiximage relative border-10 border-primary border-opacity-20">
                <span className="absolute -top-2.5 left-0 z-10 h-2.5 w-10 animate-ledgerleftright rounded-full bg-gradient-to-r from-transparent to-[#8338ec]"></span>
                <span className="absolute top-auto -bottom-2.5 left-auto z-10 h-2.5 w-10 animate-ledgerrightleft rounded-full bg-gradient-to-l from-transparent to-[#8338ec]"></span>
                <span className="absolute -left-2.5 top-auto z-10 h-10 w-2.5 animate-ledgerbottomtop rounded-full bg-gradient-to-t from-transparent to-[#8338ec]"></span>
                <span className="absolute left-auto -right-2.5 z-10 h-10 w-2.5 animate-ledgertopbottom rounded-full bg-gradient-to-b from-transparent to-[#8338ec]"></span>
                <span className=" box-border block w-full h-full bg-none opacity-100 border-0 p-0 m-0">
                  <span
                    style={{
                      boxSizing: "border-box",
                      display: "block",
                      width: "initial",
                      height: "initial",
                      background: "none",
                      opacity: 1,
                      border: 0,
                      margin: 0,
                      padding: "63.9394% 0px 0px",
                    }}
                  ></span>
                  <div
                    alt="Thant Zin Htet"
                    decoding="async"
                    data-nimg="responsive"
                    className=" bg-[url('/edited.jpg')] max-w-full min-w-full max-h-full min-h-full bg-cover bg-center absolute inset-0"
                  >
                    <div className="download transition overflow-hidden duration-300  w-full h-full flex flex-col justify-center align-middle items-center">
                      {/* <div className=" animate-slidedown w-full h-full bg-[#00000041] text-4xl gap-1 text-[#d0d0d0] hover:text-[#bebebe] shadow-sm hidden flex-col align-middle items-center justify-center ">
                        <MdDownload className=" text-4xl md:text-6xl lg:text-8xl text-[#8338ecae]" />
                      </div> */}
                    </div>
                  </div>
                  {/* <img
                      alt="Thant Zin Htet"
                      src="/edited.jpg"
                      decoding="async"
                      data-nimg="responsive"
                      style={{
                        position: "absolute",
                        zIndex: 20,
                        objectFit: "cover",
                        inset: "0px",
                        boxSizing: "border-box",
                        padding: "0px",
                        border: "none",
                        margin: "auto",
                        display: "block",
                        width: "0px",
                        height: "0px",
                        minWidth: "100%",
                        maxWidth: "100%",
                        minHeight: "100%",
                        maxHeight: "100%",
                      }}
                    /> */}
                  <noscript></noscript>
                </span>
              </div>
            </motion.div>
          </div>
          <div className="col-span-2 lg:col-span-1 text-center text-[#bebebe]">
            <motion.div
              animate={slideUpAni}
              className="about-content"
              style={{ opacity: 1, transform: "none" }}
            >
              {/* <ul className="styledlist">
                <li className="text-lg list">
                  <strong className="inline-block min-w-[120px] font-medium">
                    First Name{" "}
                  </strong>
                </li>
                <li className="text-lg list">
                  <strong className="inline-block min-w-[120px] font-medium">
                    Last Name{" "}
                  </strong>
                  : Bieber
                </li>
                <li className="text-lg list">
                  <strong className="inline-block min-w-[120px] font-medium">
                    Age{" "}
                  </strong>
                  : 27 years
                </li>
                <li className="text-lg list">
                  <strong className="inline-block min-w-[120px] font-medium">
                    Nationality{" "}
                  </strong>
                  : American
                </li>
                <li className="text-lg list">
                  <strong className="inline-block min-w-[120px] font-medium">
                    Languages{" "}
                  </strong>
                  : English, French
                </li>
                <li className="text-lg list">
                  <strong className="inline-block min-w-[120px] font-medium">
                    Address{" "}
                  </strong>
                  : 121 King Street, Melbourne, United States
                </li>
                <li className="text-lg list">
                  <strong className="inline-block min-w-[120px] font-medium">
                    Freelance{" "}
                  </strong>
                  : Available
                </li>
              </ul> */}
              <div className=" text-[#bebebe] text-lg text-left">
                My full name is{" "}
                <span className=" text-[#8338ec]">Thant Zin Htet</span>. I am
                Burmese and I was born and raised in Myanmar. I am eager to
                explore new skills and opportunities to step up my career. I
                dropped out of My University in early{" "}
                <span className=" text-[#8338ec] font-bold text-xl ">2021</span>{" "}
                but I'd never stopped learning and keep grinding experiences to
                become Full Stack Web Developer in future. As I am not graduated
                but I learned till third year in{" "}
                <span className=" text-[#8338ec]">
                  Computer Science Specialization
                </span>{" "}
                from Dagon University (DU). Moreover, I would like to utilize my
                Competences and Experiences I have learned throughout my career
                journey by expanding my professional skill set.
              </div>
              <a
                href="/resume.pdf"
                className="btn mt-3 hover:no-underline hover:text-black"
              >
                <span>Download my Resume</span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
