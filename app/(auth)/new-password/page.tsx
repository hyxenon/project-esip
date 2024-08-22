import AuthFormWrapper from "@/components/auth/auth-form-wrapper";
import NewPasswordForm from "@/components/auth/new-password-form";
import React, { Suspense } from "react";

const NewPassword = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex items-center justify-center py-8 px-4">
        <AuthFormWrapper>
          <NewPasswordForm />
        </AuthFormWrapper>
      </div>
    </Suspense>
  );
};

export default NewPassword;
