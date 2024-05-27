import AuthFormWrapper from "@/components/auth/auth-form-wrapper";
import ResetForm from "@/components/auth/reset-form";
import React from "react";

const ResetPage = () => {
  return (
    <div className="flex items-center justify-center py-8 px-4">
      <AuthFormWrapper
        title="Forgot your password?"
        backBtnLabel="Back to login"
        backBtnRef="/login"
      >
        <ResetForm />
      </AuthFormWrapper>
    </div>
  );
};

export default ResetPage;
