"use client";
import { getSchool } from "@/actions/schoolManagement";
import { convertJsonToExcel } from "@/actions/teacherDashboard.action";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { SchoolModel } from "../../admin/school-management/SchoolForm";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getAiResponse, getAiResponseSchool } from "@/actions/openai";
import { SkeletonCard } from "../../SkeletonCard";
import { useToast } from "@/components/ui/use-toast";

const Header = ({
  jsonData,
  schoolId,
}: {
  jsonData: any;
  schoolId: string;
}) => {
  const [schoolData, setSchoolData] = useState<SchoolModel>();
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState<boolean>(false);
  const { toast } = useToast();

  const onClick = async () => {
    await convertJsonToExcel(jsonData, "data");
  };

  const onClickAnalyze = async () => {
    setLoadingAnalysis(true);
    try {
      const analysis = await getAiResponse(jsonData, schoolId);
      setAiAnalysis(analysis);
      toast({
        variant: "success",
        title: "AI analysis generated successfully!",
        description: ``,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to generate analysis. Please try again.",
        description: error.message,
      });
    }
    setLoadingAnalysis(false);
  };

  useEffect(() => {
    const fetchSchoolData = async () => {
      const res = await getSchool(schoolId);
      setSchoolData(res?.message);

      const aiResponse = await getAiResponseSchool(schoolId);

      setAiAnalysis(aiResponse);
    };

    fetchSchoolData();
  }, [schoolId]);
  return (
    <div className="flex justify-between my-8 items-center">
      <div className="flex items-center gap-4">
        <Image
          src={
            schoolData?.image
              ? schoolData.image
              : `https://api.dicebear.com/6.x/initials/svg?seed=${schoolData?.schoolName}`
          }
          alt="school logo"
          height={50}
          width={50}
          loading="lazy"
          className="rounded-full"
        />
        <h1 className="text-2xl lg:text-3xl font-bold text-[#283618]">
          {schoolData?.schoolName}
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-2 items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="hover:bg-[#283618] bg-[#606C38] transition-all">
              AI Analytics
            </Button>
          </DialogTrigger>
          <DialogContent
            className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen"}
          >
            <DialogHeader>
              <DialogTitle>AI Analytics</DialogTitle>
              <div className="py-4">
                <div>
                  {loadingAnalysis ? (
                    <SkeletonCard />
                  ) : (
                    <div>
                      {aiAnalysis ? (
                        <AiAnalysisDisplay analysis={aiAnalysis} />
                      ) : (
                        <p>No Analysis please click Generate Analysis.</p>
                      )}
                    </div>
                  )}
                </div>

                <Button
                  onClick={onClickAnalyze}
                  disabled={loadingAnalysis}
                  className="mt-8 hover:bg-[#DDA15E] bg-[#BC6C25]"
                >
                  Generate Analysis
                </Button>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Button
          className="hover:bg-[#283618] bg-[#606C38] transition-all"
          onClick={onClick}
        >
          Export Data
        </Button>
      </div>
    </div>
  );
};

interface AiAnalysisDisplayProps {
  analysis: string;
}

const AiAnalysisDisplay: React.FC<AiAnalysisDisplayProps> = ({ analysis }) => {
  const parseAnalysis = (text: string) => {
    const sections = text.split(/(?=### )/).map((section, index) => {
      const lines = section.split("\n").filter((line) => line.trim() !== "");
      const title = lines.shift()?.replace(/### /, "").trim();

      return (
        <div
          key={index}
          className="my-6 p-4 border rounded-lg shadow-md bg-white"
        >
          {title && (
            <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
          )}
          <div>
            {lines.map((line, lineIndex) => {
              const formattedLine = line.replace(
                /\*\*(.*?)\*\*/g,
                "<strong>$1</strong>"
              );

              // Identify bullet points
              if (line.startsWith("- ")) {
                return (
                  <p
                    key={lineIndex}
                    className="ml-5 list-disc text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: formattedLine.replace("- ", ""),
                    }}
                  />
                );
              }
              // Identify numbered lists
              if (/^\d+\./.test(line)) {
                return (
                  <p
                    key={lineIndex}
                    className="ml-5 list-decimal text-gray-700"
                    dangerouslySetInnerHTML={{ __html: formattedLine }}
                  />
                );
              }
              // Render other lines as paragraph text
              return (
                <p
                  key={lineIndex}
                  className="text-gray-700 mb-1"
                  dangerouslySetInnerHTML={{ __html: formattedLine }}
                />
              );
            })}
          </div>
        </div>
      );
    });

    return sections;
  };

  return <div className="space-y-4">{parseAnalysis(analysis)}</div>;
};

export default Header;
