import React from "react";
import LeafSvgComponent from "./Leaf";
import SpoonSvgComponent from "./Spoon";
import TomatoSvgComponent from "./Tomato";

const SVGFactory = () => {
  return (
    <>
      <div className="absolute top-10 left-10 w-[80px] lg:w-[100px] opacity-50">
        <LeafSvgComponent />
      </div>
      <div className="absolute top-20 right-10 w-[80px] lg:w-[100px] opacity-50">
        <TomatoSvgComponent />
      </div>
      <div className="absolute bottom-10 left-20 w-[80px] lg:w-[100px] opacity-50 max-lg:hidden">
        <LeafSvgComponent />
      </div>
      <div className="absolute bottom-10 right-20 w-[80px] lg:w-[100px] opacity-50 max-lg:hidden">
        <LeafSvgComponent />
      </div>
    </>
  );
};

export default SVGFactory;
