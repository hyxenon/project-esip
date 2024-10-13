"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

const WelcomePage = () => {
  const isDesktop = useMediaQuery("(min-width: 1679px)");
  return (
    <div className="">
      <div className="min-h-screen flex flex-col mx-auto max-w-[1920px]">
        <div className="flex flex-col items-center mt-4 ">
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl tracking-widest ${poppins} text-[#283618] opacity-5 font-bold`}
          >
            FOR EDUCATION
          </h1>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-widest ${poppins} text-[#283618] opacity-5 font-bold`}
          >
            WE STRIVE
          </h2>
        </div>
        <div className="hidden lg:flex mt-4">
          <Image
            src={"/landingImg1.svg"}
            alt="bg image"
            width={100}
            height={100}
            className={` ${
              isDesktop ? "w-[400px]" : "lg:w-[250px] xl:w-[300px]"
            }`}
          />
          <div className="flex lg:flex-col 2xl:flex-col justify-between">
            <div className="bg-dot px-6 py-8 2xl:px-12 2xl:py-8">
              <h1 className="text-2xl lg:text-5xl tracking-[.3em] opacity-80 text-[#283618] font-bold">
                WELCOME to
              </h1>
              <h2 className="text-xl lg:text-4xl font-bold mt-4 tracking-[.2em] text-[#BC6C25]">
                PROJECT E-SIP
              </h2>
            </div>
            <div className="hidden lg:flex items-center gap-x-4">
              <div className="bg-[#606C38] opacity-90 lg:px-6 lg:py-2 rounded-full max-w-[500px]">
                <p className="text-gray-100 font-semibold">
                  Explore a space where innovative ideas meet seamless
                </p>
                <p className="text-gray-100 font-semibold">
                  collaboration of voice and knowledge
                </p>
              </div>
              <div className="w-[40px] h-[40px] bg-[#606C38] rounded-full mt-24"></div>
              <div className="w-[20px] h-[20px] bg-[#283618] rounded-full mt-36"></div>
            </div>
          </div>
        </div>
        <div
          className={`hidden lg:flex lg:justify-end ${
            isDesktop ? "-mt-80" : "2xl:-mt-64 mt-8"
          }`}
        >
          <div className="flex flex-col gap-y-6 w-[300px] text-xl">
            <h1 className="text-gray-500 font-semibold">
              Elevating Student Interaction and Participation
            </h1>
            <h1 className="text-gray-500 font-semibold">
              Through innovative tools and an inclusive environment;
            </h1>
            <h1 className="text-gray-500 font-semibold">
              E-SIP fosters active student participation, creative expression,
              and meaningful connections.
            </h1>
            <h1 className="text-gray-500 text-center font-semibold">
              Come and Join Us!
            </h1>
            <Separator className="bg-gray-200" />
            <Link href={"/login"}>
              <Button className="bg-[#BC6C25] hover:bg-[#DDA15E] lg:text-xl lg:py-4 w-full 2xl:text-2xl font-bold 2xl:py-6 rounded-xl">
                Log - In
              </Button>
            </Link>
          </div>
          <Image
            src={"/landingImg2.svg"}
            alt="bg image"
            width={100}
            height={100}
            className={` ${
              isDesktop ? "w-[400px]" : "lg:w-[250px] xl:w-[300px]"
            }`}
          />
        </div>
        {/* Mobile View Only */}
        <div className="flex items-center lg:hidden mt-4">
          <Image
            src={"/landingImg1.svg"}
            alt="bg image"
            width={100}
            height={100}
            className="sm:w-[150px] md:w-[200px]"
          />
          <div className="flex w-full justify-between">
            <div className="bg-dot w-full px-6 py-8 sm:px-8 sm:py-12">
              <h1 className="text-2xl sm:text-3xl md:text-4xl tracking-[.3em] opacity-80 text-[#283618] font-bold">
                WELCOME to
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mt-4 tracking-[.2em] text-[#BC6C25]">
                PROJECT E-SIP
              </h2>
            </div>
          </div>
        </div>
        <div className="mt-4 lg:hidden">
          <div className="bg-[#606C38] opacity-90 px-8 py-4">
            <p className="text-gray-100 font-semibold">
              Explore a space where innovative ideas meet seamless
            </p>
            <p className="text-gray-100 font-semibold">
              collaboration of voice and knowledge
            </p>
          </div>
          <div className="space-y-4 px-2 mt-4">
            <p className="text-gray-500 font-semibold">
              Elevating Student Interaction and Participation
            </p>
            <p className="text-gray-500 font-semibold">
              Through innovative tools and an inclusive environment;
            </p>
            <p className="text-gray-500 font-semibold">
              E-SIP fosters active student participation, creative expression,
              and meaningful connections.
            </p>
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-y-2">
                <p className="text-gray-500 font-bold">Come and Join Us!</p>
                <Link href={"/login"}>
                  <Button className="bg-[#BC6C25] hover:bg-[#DDA15E] w-full text-xl font-bold rounded-xl">
                    Log - In
                  </Button>
                </Link>
              </div>
              <Image
                src={"/landingImg2.svg"}
                alt="bg image"
                width={120}
                height={120}
                className="sm:w-[150px] md:w-[200px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
