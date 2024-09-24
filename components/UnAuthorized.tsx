"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Unauthorized() {
  const defaultMessage = "You do not have permission to access this page.";
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-red-500">401 - Unauthorized</h1>
        <p className="text-xl text-muted-foreground max-w-md">
          {defaultMessage}
        </p>
        <div className="space-x-4">
          <Button
            variant={"link"}
            onClick={() => {
              router.push("/");
            }}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
