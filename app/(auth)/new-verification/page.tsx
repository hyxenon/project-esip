import NewVerificationForm from "@/components/auth/new-verification-form";
import React, { Suspense } from "react";

const NewVerificationPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="items-center justify-center flex">
        <NewVerificationForm />
      </div>
    </Suspense>
  );
};

export default NewVerificationPage;
