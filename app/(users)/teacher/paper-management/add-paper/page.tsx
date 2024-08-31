import { getPaper } from "@/actions/paperManagement.action";
import AddPaperForm from "@/components/(users)/teacher/paper-management/addPaperForm";

const AddPaper = async ({
  searchParams,
}: {
  searchParams?: {
    edit?: string;
    paperId?: string;
  };
}) => {
  let paperData: any;
  if (searchParams?.edit && searchParams.paperId) {
    const paper = await getPaper(searchParams.paperId);
    paperData = paper || null;
  }
  return (
    <div className="flex flex-col py-4 gap-8 px-3 md:px-8 lg:py-4 lg:px-16 xl:px-28">
      <AddPaperForm
        isEdit={searchParams?.edit === "true" ? true : false}
        paperId={searchParams?.paperId}
        paper={paperData}
      />
    </div>
  );
};

export default AddPaper;
