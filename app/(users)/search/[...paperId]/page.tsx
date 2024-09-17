import { getPaperDetails } from "@/actions/search";
import { auth } from "@/auth";
import PaperDetails from "@/components/(users)/search/PaperDetails";
import PaperNotFound from "@/components/PaperNotFound";
import React from "react";

interface PaperIdProps {
  params: {
    paperId: string;
  };
}

const PaperId = async ({ params }: PaperIdProps) => {
  const session = await auth();

  if (!session?.user) {
    return <div>no session found</div>;
  }

  const paper = await getPaperDetails(
    params.paperId[0],
    session?.user?.schoolId!
  );

  if (!paper) {
    return <PaperNotFound />;
  }

  return (
    <div className="">
      <PaperDetails paper1={paper} session={session} />
    </div>
  );
};

export default PaperId;
