import { userSavedPapers } from "@/actions/paperManagement.action";
import { existingPurchase } from "@/actions/paymongo.action";
import { getPaperDetails } from "@/actions/search";
import { auth } from "@/auth";
import PaperDetails from "@/components/(users)/search/PaperDetails";
import PaperNotFound from "@/components/PaperNotFound";

interface PaperIdProps {
  params: {
    paperId: string;
  };
}

const PaperId = async ({ params }: PaperIdProps) => {
  const session = await auth();

  let isPublic: boolean = true;
  let isPaid: boolean = false;

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

  const existingUserPurchase = await existingPurchase(
    session.user.id!,
    paper.id
  );

  if (existingUserPurchase) {
    const url = `https://api.paymongo.com/v1/links/${existingUserPurchase.paymentLink}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization: "Basic c2tfdGVzdF9iQXZrQnRYemNBOEVjSHlxYTl1YVNTOFE6",
      },
    };

    try {
      const res = await fetch(url, options);
      const json = await res.json();
      if (json.data.attributes.status === "paid") {
        isPaid = true;
      }
    } catch (error) {
      console.error("Error fetching payment status:", error);
    }
  }

  const savedPaperIds = await userSavedPapers(session?.user?.id!);

  return (
    <div className="">
      <PaperDetails
        paper1={paper}
        session={session}
        isPublic={isPublic}
        isPaid={isPaid}
        userSavedPapers={savedPaperIds}
      />
    </div>
  );
};

export default PaperId;
