"use client";
import { useCallback, useEffect, useState } from "react";

import AuthFormWrapper from "./auth-form-wrapper";
import { useSearchParams, useRouter } from "next/navigation";

import { ClipLoader } from "react-spinners";
import { newVerification } from "@/actions/auth/new-verification";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const router = useRouter(); // Initialize router

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        if (data.success) {
          router.push("/login"); // Navigate to /login if successful
        }
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong.");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <AuthFormWrapper>
      <div className="flex items-center w-full justify-center">
        {!success && !error && <ClipLoader />}
        <FormError message={error} />
        {!success && <FormSuccess message={success} />}
      </div>
    </AuthFormWrapper>
  );
};

export default NewVerificationForm;
