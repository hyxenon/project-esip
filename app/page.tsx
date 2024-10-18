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
        <div className="flex items-center lg:hidden">
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
      <div className="min-h-screen py-8 relative">
        <Image
          src={"/landingPageImg3.svg"}
          width={10}
          height={10}
          alt="background image"
          className="w-[100px] absolute z-0"
        />
        <Image
          src={"/landingPageImg4.svg"}
          width={10}
          height={10}
          alt="background image"
          className="w-[50px] absolute right-0 bottom-12 z-0"
        />
        <div className="flex flex-col items-center gap-4 relative z-10">
          <h1
            className={`mb-4 font-bold text-[#283618] opacity-80 text-3xl ${poppins} tracking-wider`}
          >
            Features
          </h1>
          {/* <ResearchLibraryCard />
          <FlexibleCard />
          <CollaborativeCard />
          <MessengerCard />
          <PayToViewCard /> */}
        </div>
      </div>
      <div className="gap-16 pb-8 lg:py-16 bg-white flex flex-col lg:flex-row mx-auto max-w-[1920px]">
        <div className="max-w-[1024px] lg:bg-[url('/dotted-bg.svg')] lg:p-8">
          <div className="bg-[#606C38] py-4 px-8 rounded-r-full">
            <h1 className="font-bold text-gray-100">
              Be Part of a Growing Community
            </h1>
          </div>
          <p className="mt-16 lg:px-16 text-justify px-4 font-bold text-lg lg:text-2xl text-gray-600">
            PROJECT E-SIP is more than just a tool—it’s a movement to inspire
            and connect the brightest young minds. Join a network of schools
            sharing their knowledge, collaborating on projects, and pushing the
            boundaries of what students can achieve.
          </p>
          <div className="flex gap-4 px-4 mt-8 lg:px-16">
            <div className="w-[30px] h-[30px] bg-[#283618] rounded-full"></div>
            <div className="w-[30px] h-[30px] bg-[#606C38] rounded-full"></div>
            <div className="w-[30px] h-[30px] bg-[#DDA15E] rounded-full"></div>
          </div>
        </div>
        <div className="flex flex-col items-center w-full lg:px-16 2xl:py-8">
          <Image
            src={"/landingPageImage5.svg"}
            alt="bg image"
            height={50}
            width={50}
            className="w-[300px] h-[300px] lg:w-[500px] lg:h-[500px]"
          />
          {/* <div className="flex w-full items-end flex-col">
            <div className="w-[50px] h-[50px] bg-[#606C38] rounded-full"></div>
            <div className="w-[30px] h-[30px] bg-[#283618] rounded-full"></div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
