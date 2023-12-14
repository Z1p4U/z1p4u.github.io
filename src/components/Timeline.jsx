import React from "react";
import WOW from "wow.js";
import { Timeline } from "rsuite";
import CreditCardIcon from "@rsuite/icons/legacy/CreditCard";
import PlaneIcon from "@rsuite/icons/legacy/Plane";
import TruckIcon from "@rsuite/icons/legacy/Truck";
import UserIcon from "@rsuite/icons/legacy/User";
import CheckIcon from "@rsuite/icons/Check";
import "rsuite/dist/rsuite.min.css";

const wow = new WOW({
  boxClass: "wow", // default
  animateClass: "animate__animated", // default
  offset: 0, // default
  mobile: true, // default
  live: true, // default
});
wow.init();

const TimelineComponent = () => {
  return (
    <div className=" overflow-x-hidden my-10">
      <Timeline className="custom-timeline" align="alternate">
        <Timeline.Item>
          <p className=" wow animate__fadeInRight font-bold text-md">
            October 1, 2021
          </p>
          <p className=" wow animate__fadeInRight">We start Basic Web Desgin</p>
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
  );
};

export default TimelineComponent;
