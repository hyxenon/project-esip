import AuthFormWrapper from "@/components/auth/auth-form-wrapper";
import NewPasswordForm from "@/components/auth/new-password-form";
import { Suspense } from "react";

const NewPassword = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex items-center justify-center">
        <AuthFormWrapper>
          <NewPasswordForm />
        </AuthFormWrapper>
      </div>
    </Suspense>
  );
};

export default NewPassword;
