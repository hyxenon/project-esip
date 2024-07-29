"use server"

import { UserEditSchema } from '@/models/models'
import { db } from "@/lib/db"
import { z } from "zod";
import { User } from "@/components/(users)/admin/user-management/tables/teacherTable/column";

export const getAllUsersByTeacher = async (filter: string): Promise<User[]> => {
  try {
    let users;

    if (filter === 'all') {
      users = await db.user.findMany({
        where: {
          role: 'TEACHER',
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          image: true,
          createdAt: true,
          updatedAt: true,
          school: true,
          schoolId: true,
        },
      });
    } else {
      users = await db.user.findMany({
        where: {
          role: 'TEACHER',
          schoolId: filter,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          image: true,
          createdAt: true,
          updatedAt: true,
          school: true,
          schoolId: true,
        },
      });
    }

    // Ensure all users conform to the UserModel type
    return users.map(user => ({
      ...user,
      name: user.name || "",
      email: user.email || "", // Ensure email is always a string
      schoolId: user.schoolId || null,
    })) as User[];
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; // Handle error appropriately in your application
  }
};


export const getAllUsersByStudent = async (filter: string): Promise<User[]> => {
  try {
    let users;

    if (filter === 'all') {
      users = await db.user.findMany({
        where: {
          role: 'STUDENT',
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          image: true,
          createdAt: true,
          updatedAt: true,
          school: true,
          schoolId: true,
        },
      });
    } else {
      users = await db.user.findMany({
        where: {
          role: 'STUDENT',
          schoolId: filter,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          image: true,
          createdAt: true,
          updatedAt: true,
          school: true,
          schoolId: true,
        },
      });
    }

    return users.map(user => ({
      ...user,
      name: user.name || "",
      email: user.email || "",
      schoolId: user.schoolId || null,
    })) as User[];
  } catch (error) {
    console.error('Error fetching students:', error);
    return []; // Return an empty array in case of error
  }
};

export const getOneUserData = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
      include: {
        school: true, 
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching user data');
  } 
};


export const updateUser = async (id: string, values: z.infer<typeof UserEditSchema>) => {
  try {
    // Validate the input values
    const validatedValues = UserEditSchema.parse(values);

    // Find the existing user
    const existingUser = await db.user.findUnique({
      where: { id }
    });

    if (!existingUser) {
      throw new Error('User not found');
    }

    // Update the user
    const updatedUser = await db.user.update({
      where: { id },
      data: {
        name: validatedValues.name,
        email: validatedValues.email,
        schoolId: validatedValues.schoolId,
        role: validatedValues.role as "ADMIN" | "TEACHER" | "STUDENT",
        image: validatedValues.image,
        password: validatedValues.password // Ensure you handle hashing of passwords as needed
      },
      include: {
        school: true
      }
    });

    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};


export const deleteUser = async (userId: string) => {
  try {
    await db.user.delete({
      where: { id: userId },
    });
    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, error: "Failed to delete user." };
  }
}



