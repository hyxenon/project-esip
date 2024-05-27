import AuthFormWrapper from "@/components/auth/auth-form-wrapper";
import NewPasswordForm from "@/components/auth/new-password-form";
import React from "react";

const NewPassword = () => {
  return (
    <div className="flex items-center justify-center py-8 px-4">
      <AuthFormWrapper
        title="Enter your new password"
        backBtnLabel="Back to login"
        backBtnRef="/login"
      >
        <NewPasswordForm />
      </AuthFormWrapper>
    </div>
  );
};

export default NewPassword;
