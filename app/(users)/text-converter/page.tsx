"use client";
import Navbar from "@/components/(users)/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { converter } from "@/lib/converter";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { IoMdImage } from "react-icons/io";

const Page = () => {
  const imgInputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);
  const [convertedText, setConvertedText] = useState<string>("");
  const { data: session } = useSession();
  const { toast } = useToast();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setConvertedText("");
      setImageSrc(imageUrl);
      convert(imageUrl);
    }
  };

  const convert = async (url: string) => {
    if (url) {
      setProcessing(true);
      await converter(url).then((txt) => {
        if (txt) {
          setConvertedText(txt);
        }
      });
      setProcessing(false);
    }
  };

  const handleCopy = () => {
    if (convertedText) {
      navigator.clipboard.writeText(convertedText).then(() => {
        toast({
          variant: "success",
          title: "Text Copied",
          description:
            "The converted text has been successfully copied to your clipboard.",
        });
      });
    }
  };

  return (
    <div>
      {session?.user?.role === "TEACHER" ? (
        <Navbar role="TEACHER" />
      ) : (
        <Navbar role="STUDENT" />
      )}

      <div className="container py-12">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center text-[#606C38]">
          Image to Text Converter
        </h1>
        <div className="grid mt-12 gap-4 grid-cols-1 lg:grid-cols-2">
          <Card className="p-4">
            <Input
              type="file"
              accept=".jpeg, .jpg, .png, image/*"
              onChange={handleImageChange}
              ref={imgInputRef}
            />

            {imageSrc ? (
              <div className="mt-4 flex items-center justify-center">
                <Image
                  src={imageSrc}
                  alt="Selected Image"
                  width={400}
                  height={400}
                  objectFit="contain"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center flex-col py-8 md:py-12 lg:py-14 ">
                <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0 text-[#BC6C25]">
                  Choose an Image to convert to text
                </h2>
                <IoMdImage className="text-8xl" />
              </div>
            )}
          </Card>
          <Card className="flex items-center justify-center">
            {processing && (
              <div className="flex flex-col justify-center items-center">
                <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                  Processing...
                </h2>
                <IoMdImage className="text-8xl animate-pulse" />
              </div>
            )}

            {convertedText !== "" && (
              <div className="max-w-full flex flex-col gap-4 py-4 px-8 w-full overflow-y-auto max-h-[700px]">
                <Button
                  className="ml-auto bg-[#BC6C25] hover:bg-[#DDA15E]"
                  onClick={handleCopy}
                >
                  Copy
                </Button>
                <p className="whitespace-pre-wrap break-words leading-relaxed text-left">
                  {convertedText}
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;
