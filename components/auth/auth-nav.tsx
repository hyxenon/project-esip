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
    <nav className="flex items-center ml-24 py-8 z-20 relative">
      <Image alt="" src={logo} className="w-[100px]" />
      <h1 className={`text-5xl ${lalezar.className} mt-4`}>
        <span className="text-[#293618]">PROJECT</span>{" "}
        <span className="text-[#BC6C25]">E-SIP</span>
      </h1>
    </nav>
  );
};

export default AuthNav;
