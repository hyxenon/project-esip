"use client";

import { Button } from "./ui/button";

const PaperNotFound = () => {
  const defaultMessage =
    "Paper not found or you don't have permission to view this paper.";
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-20vh)] lg:min-h-[calc(100vh-73px)]">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-red-500">404 - Not Found</h1>
        <p className="text-xl text-muted-foreground max-w-md">
          {defaultMessage}
        </p>
        <div className="space-x-4">
          <Button variant={"link"} onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaperNotFound;
