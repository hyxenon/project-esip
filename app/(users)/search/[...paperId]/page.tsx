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
  let isPublic: boolean = true;

  if (!session?.user) {
    return <div>no session found</div>;
  }

  const paper = await getPaperDetails(
    params.paperId[0],
    session?.user?.schoolId!,
    session?.user?.id!
  );

  if (!paper) {
    return <PaperNotFound />;
  }

  if (paper.user.schoolId !== session.user.schoolId) {
    if (!paper.isPublic) {
      isPublic = false;
    }
  }

  return (
    <div className="">
      <PaperDetails paper1={paper} session={session} isPublic={isPublic} />
    </div>
  );
};

export default PaperId;
