"use server"
import { db } from "@/lib/db";
import { AddSchoolSchema } from "@/models/models";
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
            OR: [
                { email: values.email }
            ]
        }
    });

    if (existingUser) {
        throw new Error("Email already exists");
    }

    // Check if school name already exists in School model
    const existingSchool = await db.school.findFirst({
        where: {
            schoolName: values.schoolName
        }
    });

    if (existingSchool) {
        throw new Error("School name already exists");
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
                status: "Active"
                
            }
        });

        return { success: school.schoolName }; // Assuming 'school' represents the created school object
    } catch (error) {
        console.error("Error adding school:", error);
        throw error; // Propagate the error for handling at a higher level
    }
};


export const getSchool = async () => {
    const schools = await db.school.findMany()
    return { message: schools}
}
