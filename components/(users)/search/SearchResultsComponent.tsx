import { ResearchPaperModel } from "@/models/models";
import PaperCard from "./PaperCard";

interface SearchResultsComponentProps {
  papers: ResearchPaperModel[];
}

const SearchResultsComponent = ({ papers }: SearchResultsComponentProps) => {
  return (
    <div className="container space-y-4 py-8">
      {papers.length > 0 ? (
        papers.map((paper) => <PaperCard key={paper.id} paper={paper} />)
      ) : (
        <h1 className="text-center">No Paper Found.</h1>
      )}
    </div>
  );
};

export default SearchResultsComponent;
