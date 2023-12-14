import React from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { useForm } from "@mantine/form";
import "../css/contact.css";
import { BiSolidMap } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { TextInput, Textarea } from "@mantine/core";
import { Link } from "react-router-dom";
import WOW from "wow.js";
import "animate.css";
const Contact = () => {
  const wowjs = new WOW({
    boxClass: "wow", // default
    animateClass: "animate__animated", // default
    offset: 0, // default
    mobile: true, // default
    live: true, // default
  });
  wowjs.init();
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      message: "",
      advice: "",
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <div className=" w-[100%] mt-[50px] ">
      <div className="flex flex-col items-center gap-3">
        <p className=" text-4xl text-center font-semibold">Contact Us</p>
        <div className=" flex items-center bg-white  w-fit rounded-md font-semibold text-gray-600">
          {" "}
          <Link to={`/home`}>
            <p className=" cursor-pointer hover:text-red-700 hover:font-semibold transition-all">
              Home
            </p>
          </Link>
          /
          <p className=" cursor-pointer hover:text-red-700 hover:font-semibold transition-all">
            Contact
          </p>
        </div>
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
              <button className=" hover:bg-red-900 transition text-white   rounded-md mx-auto w-[91%]  bg-red-700 p-2 mt-4 font-semibold">
                Send
              </button>
            </div>{" "}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
