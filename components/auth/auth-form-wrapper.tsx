"use client";

import Image from "next/image";
import AuthNav from "./auth-nav";
import authTopBg from "../../assets/authForm/bgTop.svg";
import authBotBg from "../../assets/authForm/bgBot.svg";

type AuthFormWrapperProps = {
  children: React.ReactNode;
};

const AuthFormWrapper = ({ children }: AuthFormWrapperProps) => {
  return (
    <div className="min-h-screen h-auto pb-8 relative w-full ">
      <Image
        draggable="false"
        alt=""
        src={authTopBg}
        className="absolute w-[200px] md:w-[300px] lg:w-[400px] xl:w-auto  top-0 left-0 max-w-[550px]"
      />
      <AuthNav />
      <Image
        draggable="false"
        alt=""
        src={authBotBg}
        className="absolute w-[200px] md:w-[300px] lg:w-[400px] xl:w-auto bottom-0 right-0 max-w-[550px]"
      />
      {/* Container */}
      <div className=" flex w-full">
        {/* Form Container*/}
        <div className="relative px-2 flex justify-center items-center flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthFormWrapper;
