"use server";
import { generateVerificationToken } from "@/lib/token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { RegisterSchema, registerSchema } from "@/models/models";
import bcrypt from "bcryptjs";
import * as z from "zod";
import { UserRole } from "@prisma/client";

function titleCase(str: string) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password, firstName, lastName, schoolId, role } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const userRole: UserRole = role as UserRole;

  const user = await db.user.create({
    data: {
      name: titleCase(`${firstName} ${lastName}`),
      email: email,
      password: hashedPassword,
      schoolId: schoolId,
      role: userRole
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation email sent!" };
};
