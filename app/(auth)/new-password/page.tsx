import AuthFormWrapper from "@/components/auth/auth-form-wrapper";
import NewPasswordForm from "@/components/auth/new-password-form";
import React from "react";

const NewPassword = () => {
  return (
    <div className="flex items-center justify-center py-8 px-4">
      <AuthFormWrapper>
        <NewPasswordForm />
      </AuthFormWrapper>
    </div>
  );
};

export default NewPassword;
