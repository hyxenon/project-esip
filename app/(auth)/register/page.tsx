import RegisterForm from "@/components/auth/regiser-form";
import AuthFormWrapper from "@/components/auth/auth-form-wrapper";
import React from "react";

const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center py-8 px-4">
      <AuthFormWrapper
        title="Register"
        backBtnRef="/login"
        backBtnLabel="Already have an account? Log in here"
      >
        <RegisterForm />
      </AuthFormWrapper>
    </div>
  );
};

export default RegisterPage;
