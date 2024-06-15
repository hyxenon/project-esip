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
    <div className="h-screen relative">
      <Image
        draggable="false"
        alt=""
        src={authTopBg}
        className="absolute top-0 left-0 max-w-[550px]"
      />
      <AuthNav />
      <Image
        draggable="false"
        alt=""
        src={authBotBg}
        className="absolute bottom-0 right-0 max-w-[550px]"
      />
      {/* Container */}
      <div className=" flex items-center justify-center h-[80%]">
        {/* Form Container*/}
        <div className="relative px-16 flex justify-center items-center flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthFormWrapper;
