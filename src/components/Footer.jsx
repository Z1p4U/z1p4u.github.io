import { BackgroundImage } from "@mantine/core";
import React from "react";
import { FiFacebook, FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div
      className="dar"
      style={
        {
          // backgroundImage: `url(https://media.istockphoto.com/id/1128886133/photo/blue-sea.jpg?s=612x612&w=0&k=20&c=-2qDfq5nLytf-i-KUNImGquu-fddCdGhpvDaUW-cTJY=)`,
        }
      }
    >
      <div className="">
        <div className=" container mx-auto px-5 py-7 flex flex-col justify-center items-center align-middle">
          <div className="  ">
            <h1 className=" text-3xl font-bold text-center text-white phrase ">
              Code. Create. Inspire. Repeat!
            </h1>

            <div className=" flex gap-2 justify-center my-7 align-middle items-center">
              <a
                className=" icon-btn-foot cursor-pointer"
                href="https://www.facebook.com/profile.php?id=100010478018386"
              >
                <FiFacebook />
              </a>
              <a
                className=" icon-btn-foot cursor-pointer"
                href="https://github.com/Z1p4U"
              >
                <FiGithub />
              </a>
              <a
                className=" icon-btn-foot cursor-pointer"
                href="https://www.linkedin.com/in/zip-p-aa3154204/"
              >
                <FiLinkedin />
              </a>
              <a
                className=" icon-btn-foot cursor-pointer"
                href="https://twitter.com/Thant_Zin_Htet"
              >
                <FiTwitter />
              </a>
            </div>

            <div className=" flex justify-center text-[10px] items-center gap-2 text-white align-middle lili">
              <Link to={"/"}>
                <p className=" phrase-link">Home </p>
              </Link>
              &oplus;
              <Link to={"/projects"}>
                <p className=" phrase-link">Projects</p>
              </Link>
              &oplus;
              <Link to={"/skills"}>
                <p className=" phrase-link">Skills</p>
              </Link>
              &oplus;
              <Link to={"/about"}>
                <p className=" phrase-link">About Us</p>
              </Link>
              &oplus;
              <Link to={"/contact"}>
                <p className=" phrase-link">Contact Us</p>
              </Link>
            </div>

            <div className=" mt-5">
              <p className=" text-white phrase text-lg flex flex-col md:flex-row align-middle items-center lili">
                Designed And Implemented By
                <a
                  href="https://www.facebook.com/profile.php?id=100010478018386"
                  className=" ms-2"
                >
                  Thant Zin Htet
                </a>
                <Link>
                  <span className=" ms-2 text-[#c5c5c5]">
                    | &copy; 2023 | Credits & Attributions{" "}
                  </span>
                </Link>
              </p>

              {/* <div className=" flex justify-center text-xs md:text-sm items-center gap-2 text-white align-middle">
             <Link to={"/"}>
               <button className=" phrase-link">Home </button>
             </Link>
             &oplus;
             <Link to={"/showcase"}>
               <button className=" phrase-link">Projects</button>
             </Link>
             &oplus;
             <Link to={"/skills"}>
               <button className=" phrase-link">Skills</button>
             </Link>
             &oplus;
             <Link to={"/about-contact"}>
               <button className=" phrase-link">About Us</button>
             </Link>
             &oplus;
             <Link to={"/contact"}>
               <button className=" phrase-link">Contact Us</button>
             </Link>
           </div> */}

              {/* <div className=" mt-5 text-center">
             <p className=" text-white phrase text-xs md:text-sm inline text-center">
               Designed And Implemented By Team A | &copy; 2023 |{" "}
               <Link to={"credits"}>
                 <button className=" ms-2 font-bold text-center inline-block">
                   Credits & Attributions{" "}
                 </button>

                </Link>
              </p>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
