"use server";

import { UserEditSchema } from "@/models/models";
import { db } from "@/lib/db";
import { z } from "zod";
import { User } from "@/components/(users)/admin/user-management/tables/teacherTable/column";
import { parseStringify } from "@/lib/utils";
import { liveblocks } from "@/lib/liveblocks";
import { revalidatePath } from "next/cache";

export const getAllUsersByTeacher = async (filter: string): Promise<User[]> => {
  try {
    let users;

    if (filter === "all") {
      users = await db.user.findMany({
        where: {
          role: "TEACHER",
          isPending: false,
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
          role: "TEACHER",
          schoolId: filter,
          isPending: false,
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

    return users.map((user) => ({
      ...user,
      name: user.name || "",
      email: user.email || "",
      schoolId: user.schoolId || null,
    })) as User[];
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getAllUsersByStudent = async (filter: string): Promise<User[]> => {
  try {
    let users;

    if (filter === "all") {
      users = await db.user.findMany({
        where: {
          role: "STUDENT",
          isPending: false,
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
          role: "STUDENT",
          schoolId: filter,
          isPending: false,
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

    return users.map((user) => ({
      ...user,
      name: user.name || "",
      email: user.email || "",
      schoolId: user.schoolId || null,
    })) as User[];
  } catch (error) {
    console.error("Error fetching students:", error);
    return []; // Return an empty array in case of error
  }
};

export const getUsers = async ({ userIds }: { userIds: string[] }) => {
  try {
    const data = await db.user.findMany({
      where: {
        email: {
          in: userIds,
        },
      },
    });
    const users = data.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.image || "https://github.com/shadcn.png",
    }));

    const sortedUsers = userIds.map((email) =>
      users.find((user) => user.email === email)
    );

    return parseStringify(sortedUsers);
  } catch (error) {
    console.log(`Error fetching users: ${error}`);
  }
};

export const getDocumentUsers = async ({
  roomId,
  currentUser,
  text,
}: {
  roomId: string;
  currentUser: string;
  text: string;
}) => {
  try {
    const room = await liveblocks.getRoom(roomId);

    const users = Object.keys(room.usersAccesses).filter(
      (email) => email !== currentUser
    );

    if (text.length) {
      const lowerCaseText = text.toLowerCase();

      const filteredUsers = users.filter((email: string) =>
        email.toLowerCase().includes(lowerCaseText)
      );

      return parseStringify(filteredUsers);
    }

    return parseStringify(users);
  } catch (error) {
    console.log(`Error fetching users: ${error}`);
  }
};

export const getPendingUsers = async (schoolId: string): Promise<User[]> => {
  try {
    const users = await db.user.findMany({
      where: {
        schoolId: schoolId,
        isPending: true,
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

    return users.map((user) => ({
      ...user,
      name: user.name || "",
      email: user.email || "",
      schoolId: user.schoolId || null,
    })) as User[];
  } catch (error) {
    console.error("Error fetching pending users:", error);
    throw error;
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
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching user data");
  }
};

export const updateUser = async (
  id: string,
  values: z.infer<typeof UserEditSchema>
) => {
  try {
    // Validate the input values
    const validatedValues = UserEditSchema.parse(values);

    // Find the existing user
    const existingUser = await db.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new Error("User not found");
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
        password: validatedValues.password, // Ensure you handle hashing of passwords as needed
      },
      include: {
        school: true,
      },
    });

    revalidatePath("/admin/user-management");
    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const acceptPendingUser = async (userId: string) => {
  try {
    const existingUser = await db.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new Error("User not found");
    }

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: { isPending: false },
      include: { school: true },
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating user: ", error);
    return { success: false, error: "Failed to remove user request." };
  }
};

export const deleteUser = async (userId: string) => {
  try {
    await db.user.delete({
      where: { id: userId },
    });
    revalidatePath("/admin/user-management");
    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, error: "Failed to delete user." };
  }
};

export const deletePendingUser = async (userId: string) => {
  try {
    await db.user.delete({
      where: { id: userId },
    });
    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, error: "Failed to delete user." };
  }
};
