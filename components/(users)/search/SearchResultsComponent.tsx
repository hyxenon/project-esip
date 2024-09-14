import { ResearchPaperModel } from "@/models/models";
import PaperCard from "./PaperCard";

interface SearchResultsComponentProps {
  papers: ResearchPaperModel[];
}

const SearchResultsComponent = ({ papers }: SearchResultsComponentProps) => {
  console.log(papers);
  return (
    <div className="container">
      <PaperCard />
    </div>
  );
};

export default SearchResultsComponent;
