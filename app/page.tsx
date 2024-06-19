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
      <Image
        draggable={false}
        alt=""
        src={bigLogo}
        className="absolute z-50 w-[45%] left-0 right-0 top-0 bottom-24 m-auto"
      />
      <Button className="absolute z-50 left-0 right-0 bottom-20 m-auto w-[150px] bg-[#283618] hover:bg-[#1f2a13]">
        <Link href={"/login"}>LOGIN HERE</Link>
      </Button>
      {/* Left Side */}
      <div className="w-1/2 bg-[#FEFAE0] relative flex flex-col items-center">
        <Image
          draggable={false}
          className="absolute bottom-0 left-0 w-[70%]"
          src={leftBg}
          alt=""
        />
        <div className="flex flex-col items-center justify-center">
          <div className="mb-16 flex items-center justify-center">
            <p className={`w-1/2 mt-52 mr-52 ${copperPlateRegular.className}`}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis earum iusto hic, at quia sapiente? Omnis, nam rem
              vitae libero earum officia corrupti, vero et molestiae dolor,
              quidem ipsa voluptatem? Corporis architecto consequuntur hic
              facere distinctio quia maiores earum. Quasi in, dolores ex odio
              libero nulla eligendi! Autem, molestiae dolor! Repudiandae
              asperiores optio molestias beatae nobis qui quas ducimus officia.
            </p>
          </div>
          <h1
            className={`${copperPlate.className} text-5xl tracking-[1.5em] mr-24 `}
          >
            PROJECT
          </h1>
        </div>
      </div>

      {/* Right side */}
      <div className="w-1/2 bg-[#606C38] relative flex flex-col items-center justify-center">
        <Image
          draggable={false}
          className="absolute top-0 right-0 w-[70%]"
          src={rightBg}
          alt=""
        />
        <div className="flex flex-col items-center justify-center">
          <h1
            className={`${copperPlate.className} text-5xl tracking-[1.5em] text-white mt-64 mb-16 ml-52 `}
          >
            E-SIP
          </h1>
          <div className="flex items-center justify-center ">
            <p
              className={`w-1/2 text-white ml-24 ${copperPlateRegular.className}`}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis earum iusto hic, at quia sapiente? Omnis, nam rem
              vitae libero earum officia corrupti, vero et molestiae dolor,
              quidem ipsa voluptatem? Corporis architecto consequuntur hic
              facere distinctio quia maiores earum. Quasi in, dolores ex odio
              libero nulla eligendi! Autem, molestiae dolor! Repudiandae
              asperiores optio molestias beatae nobis qui quas ducimus officia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
