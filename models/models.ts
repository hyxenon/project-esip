import { SchoolModel } from "@/components/(users)/admin/school-management/SchoolForm";
import * as z from "zod";

export type registerSchema = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type PaperItemModel = {
  title: string;
  id: string;
  date: Date;
  category: string;
};

export type ResearchPaperModel1 = {
  title: string;
  id: string;
  date: Date;
  category: string;
  adviser: string;
  type: string;
};

export type AuthorPaper = {
  id?: string; // id can be optional since it might be generated automatically
  name: string;
};

export type ResearchPaperModel = {
  id?: string;
  title: string;
  researchAdviser: string;
  researchConsultant: string;
  researchCategory: string;
  researchType: string;
  date: Date;
  abstract?: string | null;
  introduction: string;
  references: string;
  file?: string | null;
  grade?: string | null;
  price?: number | null;
  wonCompetition?: string;
  wonCompetitonFile?: string | null;
  views?: number;
  isPublic: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  userId: string;
  authors?: AuthorPaper[];
  keywords?: string[];
  user?: any;
  uniqueViews?: number;
};

export type PendingUserModel = {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  schoolId: string | null;
  school?: SchoolModel | null;
  isPending?: boolean;
};

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  firstName: z.string().min(1, {
    message: "First name is required",
  }),
  lastName: z.string().min(1, {
    message: "Last name is required",
  }),
  schoolId: z.string().min(1, {
    message: "School is required",
  }),
  role: z.string().min(1, {
    message: "Role is required",
  }),
  image: z.string().optional(),
});

export const AddUserTeacherSchema = z.object({});

export const UserEditSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  schoolId: z.string().min(1, {
    message: "School is required",
  }),
  role: z.string().min(1, {
    message: "Role is required",
  }),
  image: z.string().optional(),
  password: z.string().optional(),
});

export const AddSchoolSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  schoolName: z.string().trim().min(1, {
    message: "Enter your school name",
  }),
  streetAddress: z.string().trim().min(1, {
    message: "Enter your street address",
  }),
  city: z.string().trim().min(1, {
    message: "Enter your school city",
  }),
  province: z.string().trim().min(1, {
    message: "Enter your school province",
  }),
  postalCode: z.string().regex(/^\d{4}$/, {
    message: "Enter a valid 4-digit postal code",
  }),
  image: z.string().min(1, {
    message: "Please Upload School Logo",
  }),
  contactNumber: z
    .string()
    .regex(/^09\d{9}$/, {
      message: "Enter a valid phone number starting with 09",
    })
    .min(11, { message: "Phone number must be 11 digits long" })
    .max(11, { message: "Phone number must be 11 digits long" }),
});
