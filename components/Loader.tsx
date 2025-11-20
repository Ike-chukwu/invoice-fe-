import React from "react";
import { ClipLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="fixed bg-[#FFFFFF] z-50 flex h-full w-full items-center justify-center">
      <ClipLoader size={80} color={"#7C5DFA"} />
    </div>
  );
};

export default Loader;
