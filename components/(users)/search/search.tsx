"use client";
import { useState, useRef } from "react";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

interface SearchComponentProps {
  queryTitle?: string;
}

export default function SearchComponent({ queryTitle }: SearchComponentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [paperType, setPaperType] = useState("all");
  const [categories, setCategories] = useState<string[]>([]);
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const categoriesLowerCase = categories.map((category) =>
      category.toLowerCase()
    );

    const queryString = new URLSearchParams({
      query: searchQuery,
      paperType: paperType,
      categories: categoriesLowerCase.join(","),
    }).toString();

    router.push(`/search?${queryString}`);
  };

  const handleCategoryChange = (category: string) => {
    setCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  return (
    <div
      className={`py-12 px-4 sm:px-6 lg:px-8 ${
        queryTitle ? "py-2" : "lg:mt-24"
      }`}
    >
      <div className="max-w-3xl mx-auto">
        {!queryTitle && (
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              <span className="text-[#283618]">PROJECT</span>{" "}
              <span className="text-[#BC6C25]">E-SIP</span>
            </h1>
            <p className="mt-5 text-xl text-gray-500">
              Search for research papers, proposals, and more
            </p>
          </div>
        )}

        <form onSubmit={handleSearch} className="mt-8">
          <div className="flex items-center border-b border-gray-300 py-2">
            <Input
              type="text"
              placeholder="Search for papers..."
              className="flex-grow bg-transparent border-none focus:ring-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" variant="ghost" className="ml-1">
              <Search className="h-5 w-5 text-gray-400" />
            </Button>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-4">
              <Label
                htmlFor="paper-type"
                className="text-sm font-medium text-gray-700"
              >
                Paper Type:
              </Label>
              <Select value={paperType} onValueChange={setPaperType}>
                <SelectTrigger id="paper-type" className="w-[180px]">
                  <SelectValue placeholder="Select paper type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Papers</SelectItem>
                  <SelectItem value="paper">Research Paper</SelectItem>
                  <SelectItem value="proposal">Research Proposal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              type="button"
              variant="outline"
              className="mt-4 sm:mt-0"
              onClick={openDialog}
            >
              <Filter className="h-4 w-4 mr-2" />
              Categories
            </Button>
          </div>
        </form>
        <dialog
          ref={dialogRef}
          className="p-6 rounded-lg shadow-xl backdrop:bg-black backdrop:opacity-50"
        >
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Select Categories
          </h3>
          <div className="space-y-2">
            {[
              "Life Science",
              "Physical Science",
              "Science Innovation Expo",
              "Robotics",
              "Mathematical and Computational",
            ].map((category) => (
              <div key={category} className="flex items-center">
                <Checkbox
                  id={category}
                  checked={categories.includes(category)}
                  onCheckedChange={() => handleCategoryChange(category)}
                />
                <Label
                  htmlFor={category}
                  className="ml-2 text-sm text-gray-700"
                >
                  {category}
                </Label>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <Button type="button" variant="outline" onClick={closeDialog}>
              Close
            </Button>
          </div>
        </dialog>
      </div>
    </div>
  );
}
