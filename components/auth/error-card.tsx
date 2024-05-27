import React from "react";
import { Card, CardFooter, CardHeader } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";

const ErrorCard = () => {
  return (
    <Card className="w-[400px] shadow-md flex flex-col items-center">
      <CardHeader className="text-red-600">
        Oops! Something went wrong!
      </CardHeader>
      <CardFooter>
        <Link className="" href={"/login"}>
          <Button variant={"link"}>Back to Login</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ErrorCard;
