"use server";
import { signIn } from "@/auth";
import { generateVerificationToken } from "@/lib/token";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { LoginSchema } from "@/models/models";
import {
  DEFAULT_LOGIN_REDIRECT_ADMIN,
  DEFAULT_LOGIN_REDIRECT_STUDENT,
  DEFAULT_LOGIN_REDIRECT_TEACHER,
} from "@/routes";
import { AuthError } from "next-auth";
import * as z from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Confirmation email sent!" };
  }

  try {
    let defaultLogin;
    if (existingUser.role === "TEACHER") {
      defaultLogin = DEFAULT_LOGIN_REDIRECT_TEACHER;
    }

    if (existingUser.role === "STUDENT") {
      defaultLogin = DEFAULT_LOGIN_REDIRECT_STUDENT;
    }

    if (existingUser.role === "ADMIN") {
      defaultLogin = DEFAULT_LOGIN_REDIRECT_ADMIN;
    }
    await signIn("credentials", {
      email,
      password,
      redirectTo: defaultLogin,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return {
            error: "Account pending approval. Please contact your school.",
          };
      }
    }
    throw error;
  }
};
