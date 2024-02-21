import React, { useEffect, useState } from "react";
import { Sling as Hamburger } from "hamburger-react";
import { Link } from "react-scroll";
import { Link as RouteLink } from "react-router-dom";

// import {AiOutlineUser} from "react-icons/ai"

const Navbar = () => {
  const [scroll, setScroll] = useState(true);
  const [scrollTop, setScrollTop] = useState(0);
  const [toggle, setToggle] = useState(false);

  const scrollHandler = () => {
    if (window.scrollY >= 100) {
      setScroll(false);
    } else {
      setScroll(true);
    }
  };

  window.onscroll = function () {
    scrollPoint();
  };

  function scrollToTop() {
    let scrollTop = document.documentElement.scrollTop;
    scrollTop = 0;
    setScrollTop(0);
  }

  function scrollPoint() {
    let scrollTop = document.documentElement.scrollTop;
    let scrollHeight = document.documentElement.scrollHeight;
    let getclientHeight = document.documentElement.clientHeight;

    let calcHeight = scrollHeight - getclientHeight;
    let final = Math.round((scrollTop * 100) / calcHeight);
    scrollTop = final;
    setScrollTop(scrollTop);
  }

  console.log(scrollTop);

  const [burger, setBurger] = useState(false);
  let [clipPath, setClipPath] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (burger === true && clipPath < 150) {
        setClipPath((prev) => prev + 30);
      }
      if (burger === false && clipPath > 0) {
        setClipPath((prev) => prev - 30);
      }
    }, 150);
    return () => clearInterval(interval);
  }, [burger, clipPath]);

  window.addEventListener("scroll", scrollHandler);
  const [isOpen, setOpen] = useState(false);

  return (
    <div
      className={` ${
        scroll
          ? "header top-0 left-0 z-50 h-auto w-full absolute"
          : "header top-0 left-0 z-50 h-auto animate-slidedown w-full fixed border-b border-white border-opacity-20 bg-grey bg-opacity-80 backdrop-blur backdrop-filter"
      } w-full`}
    >
      <div className=" container h-[60px] md:h[92px] mx-auto px-[20px] md:px-[40px] w-full flex justify-between items-center opacity-70">
        <RouteLink to={"/"} className=" z-50">
          <div className=" ms-[40px] content w-[100px] md:w-[200px] z-50">
            <h1>Zip</h1>
            <h1>Zip</h1>
          </div>
        </RouteLink>

        {/* <div className=" hidden md:flex gap-5">
            <Link to="home" spy={true} smooth={true} offset={0} duration={500}>
              <h3 className=" text-xl cursor-pointer font-bold text-white hover:shadow-sm">
                Home
              </h3>
            </Link>

            <Link to={"/"}>
              <h3>Pages</h3>
            </Link>

            <Link
              to="skills"
              spy={true}
              smooth={true}
              offset={0}
              duration={500}
            >
              <h3>About us</h3>
            </Link>

            <Link>
              <h3>Contact</h3>
            </Link>
          </div> */}

        <div className=" hidden md:flex flex-row justify-end text-center">
          <ul className="mb-0 inline-flex no-underline list-none gap-7 pl-0">
            <li className="inline-block align-middle lili">
              <Link
                activeClass="active-nav"
                to="hero"
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
                onClick={() => scrollToTop}
                className="group no-underline relative inline-block cursor-pointer py-6 text-sm font-medium uppercase tracking-wider text-heading before:text-primary"
              >
                Home
                <span className="absolute left-0 top-auto bottom-5 inline-block h-px w-full origin-top-right scale-0 bg-primary align-middle transition-transform duration-500 group-hover:origin-top-left group-hover:scale-100"></span>
              </Link>
            </li>
            <li className="inline-block align-middle lili">
              <Link
                activeClass="active-nav"
                to="about"
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
                className="group relative inline-block cursor-pointer py-6 text-sm font-medium uppercase tracking-wider text-heading before:text-primary"
              >
                About
                <span className="absolute left-0 top-auto bottom-5 inline-block h-px w-full origin-top-right scale-0 bg-primary align-middle transition-transform duration-500 group-hover:origin-top-left group-hover:scale-100"></span>
              </Link>
            </li>
            <li className="inline-block align-middle lili">
              <Link
                activeClass="active-nav"
                to="skills"
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
                className="group relative inline-block cursor-pointer py-6 text-sm font-medium uppercase tracking-wider text-heading before:text-primary"
              >
                Skills
                <span className="absolute left-0 top-auto bottom-5 inline-block h-px w-full origin-top-right scale-0 bg-primary align-middle transition-transform duration-500 group-hover:origin-top-left group-hover:scale-100"></span>
              </Link>
            </li>
            <li className="inline-block align-middle lili">
              <Link
                activeClass="active-nav"
                to="work"
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
                className="group relative inline-block cursor-pointer py-6 text-sm font-medium uppercase tracking-wider text-heading before:text-primary"
              >
                Works
                <span className="absolute left-0 top-auto bottom-5 inline-block h-px w-full origin-top-right scale-0 bg-primary align-middle transition-transform duration-500 group-hover:origin-top-left group-hover:scale-100"></span>
              </Link>
            </li>
            <li className="inline-block align-middle lili">
              <Link
                activeClass="active-nav"
                to="resume"
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
                className="group relative inline-block cursor-pointer py-6 text-sm font-medium uppercase tracking-wider text-heading before:text-primary"
              >
                Resume
                <span className="absolute left-0 top-auto bottom-5 inline-block h-px w-full origin-top-right scale-0 bg-primary align-middle transition-transform duration-500 group-hover:origin-top-left group-hover:scale-100"></span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="relative md:hidden">
          <button className=" burger " onClick={() => setBurger(!burger)}>
            <Hamburger toggled={isOpen} toggle={setOpen} />
          </button>
          <div
            className={burger ? "bg-clip-path" : "bg-clip-path active"}
            style={{
              clipPath: `circle(${clipPath}% at 92% 3rem)`,
              transition: "clip-path 0.7s",
              transitionTimingFunction:
                "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            }}
          >
            <ul className={burger ? "nav-items active" : "nav-items"}>
              <Link
                to="about"
                activeClass="active-nav"
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
                className=" hover:no-underline hover:text-[#5c5c5c]"
              >
                <li className={burger ? "anniSlideDown" : "anniSlideUp"}>
                  About
                </li>
              </Link>

              <Link
                to="skills"
                activeClass="active-nav"
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
                className=" hover:no-underline hover:text-[#5c5c5c]"
              >
                <li
                  className={
                    burger
                      ? "anniSlideDown ani_delay_2"
                      : "anniSlideUp ani_delay_2"
                  }
                >
                  Skills
                </li>
              </Link>

              <Link
                to="work"
                activeClass="active-nav"
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
                className=" hover:no-underline hover:text-[#5c5c5c]"
              >
                <li
                  className={
                    burger
                      ? "anniSlideDown ani_delay_4"
                      : "anniSlideUp ani_delay_4"
                  }
                >
                  Work
                </li>
              </Link>

              <Link
                to="resume"
                activeClass="active-nav"
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
                className=" hover:no-underline hover:text-[#5c5c5c]"
              >
                <li
                  className={
                    burger
                      ? "anniSlideDown ani_delay_4"
                      : "anniSlideUp ani_delay_4"
                  }
                >
                  Resume
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>

      <div className="progress-bar-container absolute left-0 top-[60px] md:top-[92px] w-full">
        <div className="w-full h-1">
          <div
            className="bg-gradient-to-r from-[#667eea] from-20% via-sky-500 via-40% to-emerald-600 to-90% h-1"
            style={{ width: `${scrollTop}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
