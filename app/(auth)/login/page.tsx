import Social from "@/components/auth/Social";
import LoginForm from "@/components/auth/login-form";
import AuthFormWrapper from "@/components/auth/auth-form-wrapper";
import React from "react";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center py-8 px-4">
      <AuthFormWrapper
        title="login"
        backBtnRef="/register"
        backBtnLabel="Don't have an account? Click here to register."
        social
      >
        <LoginForm />
      </AuthFormWrapper>
    </div>
  );
};

export default LoginPage;
