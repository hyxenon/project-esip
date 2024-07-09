import React from "react";
import logo from "../../assets/authForm/authLogo.svg";
import Image from "next/image";
import { Lalezar } from "next/font/google";

const lalezar = Lalezar({
  subsets: ["latin"],
  weight: "400",
});
const AuthNav = () => {
  return (
    <nav className="flex items-center px-4 py-4 xl:ml-16 xl:py-8 z-20 relative">
      <Image alt="" src={logo} className="w-[60px] xl:w-[100px]" />
      <h1
        className={`text-2xl md:text-3xl lg:text-4xl ${lalezar.className} mt-4`}
      >
        <span className="text-[#293618]">PROJECT</span>{" "}
        <span className="text-[#BC6C25]">E-SIP</span>
      </h1>
    </nav>
  );
};

export default AuthNav;
