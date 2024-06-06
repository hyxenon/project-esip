"use client";

import Image from "next/image";
import AuthNav from "./auth-nav";
import bgLogo from "../../assets/watermark_copy-removebg-preview 1.png";

type AuthFormWrapperProps = {
  children: React.ReactNode;
};

const AuthFormWrapper = ({ children }: AuthFormWrapperProps) => {
  return (
    <div className="h-screen">
      <AuthNav />
      {/* Container */}
      <div className="px-16 flex items-center justify-center h-[80%]">
        {/* Form Container*/}
        <div className="relative px-16 flex justify-center items-center flex-1">
          <Image
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            src={bgLogo}
            alt=""
          />
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthFormWrapper;
