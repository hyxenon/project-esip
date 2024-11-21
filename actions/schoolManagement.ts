"use server";
import { db } from "@/lib/db";
import { AddSchoolSchema } from "@/models/models";
import { revalidatePath } from "next/cache";
import { z } from "zod";

function titleCase(str: string) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export const addSchool = async (values: z.infer<typeof AddSchoolSchema>) => {
  // Check if email already exists in User model
  const existingUser = await db.user.findFirst({
    where: {
      OR: [{ email: values.email }],
    },
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const existingSchool = await db.school.findFirst({
    where: {
      OR: [{ schoolName: values.schoolName }, { email: values.email }],
    },
  });

  if (existingSchool) {
    throw new Error("School name or email already exists");
  }

  try {
    // Create school if no duplicates found
    const school = await db.school.create({
      data: {
        ...values,
        schoolName: titleCase(values.schoolName),
        streetAddress: titleCase(values.streetAddress),
        city: titleCase(values.city),
        province: titleCase(values.province),
        status: "Active",
      },
    });
    revalidatePath("/admin/school-management");
    return { success: school.schoolName, data: school }; // Assuming 'school' represents the created school object
  } catch (error) {
    return { message: "Something went wrong." };
  }
};

export const getSchools = async () => {
  const schools = await db.school.findMany();
  return { message: schools };
};

export const getSchoolsActive = async () => {
  const schools = await db.school.findMany({
    where: {
      status: "Active",
    },
  });
  return { message: schools };
};

export const getSchool = async (schoolId: string) => {
  if (schoolId) {
    const school = await db.school.findFirst({
      where: {
        id: schoolId,
      },
    });

    if (!school) {
      throw new Error("School not found");
    }

    return { message: school };
  }
};

export const editSchool = async (
  schoolId: string,
  values: z.infer<typeof AddSchoolSchema>
) => {
  try {
    // Fetch the school to check if it exists
    const existingSchool = await db.school.findFirst({
      where: {
        id: schoolId,
      },
    });

    if (!existingSchool) {
      return { message: "School not found" };
    }

    // Update the school with the new values
    const updatedSchool = await db.school.update({
      where: {
        id: schoolId,
      },
      data: {
        ...values,
        schoolName: titleCase(values.schoolName), // Assuming titleCase is defined to format strings
        streetAddress: titleCase(values.streetAddress),
        city: titleCase(values.city),
        province: titleCase(values.province),
      },
    });
    revalidatePath("admin/school-management");
    return { message: updatedSchool.schoolName }; // Return success message or updated school data
  } catch (error: any) {
    return { message: "Error updating school" + error.message };
  }
};

export const deleteSchool = async (schoolId: string) => {
  try {
    const deletedSchool = await db.school.delete({
      where: { id: schoolId },
    });

    revalidatePath("/admin/school-management");
    return {
      message: "School deleted successfully",
      data: deletedSchool,
      success: true,
    };
  } catch (error) {
    return { message: "Failed to delete school", success: false };
  }
};

export const statusChange = async (schoolId: string, newStatus: string) => {
  try {
    const updatedSchool = await db.school.update({
      where: { id: schoolId },
      data: { status: newStatus },
    });
    revalidatePath("/admin/school-management");
    return { success: true, message: updatedSchool };
  } catch (error: any) {
    console.error("Error updating school status:", error);
    return { success: false, message: error.message };
  }
};
