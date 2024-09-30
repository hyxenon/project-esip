import Image from "next/image";
import leftBg from "../assets/welcomePage/leftBg.svg";
import rightBg from "../assets/welcomePage/rightBg.svg";
import bigLogo from "../assets/welcomePage/bigLogo.svg";
import { Gothic_A1 } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const copperPlate = Gothic_A1({
  weight: "900",
  subsets: ["latin"],
});

const copperPlateRegular = Gothic_A1({
  weight: "500",
  subsets: ["latin"],
});

const WelcomePage = () => {
  return (
    <div className="h-screen flex relative">
      <Button className="absolute z-50 left-0 right-0 bottom-20 m-auto w-[150px] bg-[#283618] hover:bg-[#1f2a13]">
        <Link href={"/login"}>LOGIN HERE</Link>
      </Button>
    </div>
  );
};

export default WelcomePage;
