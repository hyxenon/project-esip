"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export const getUserHistoryLog = async () => {
  const session = await auth();
  const userHistoryLog = await db.userHistory.findMany({
    where: {
      performedBy: {
        schoolId: session?.user?.schoolId,
      },
    },
    include: {
      performedBy: {
        select: {
          name: true,
          email: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });

  return userHistoryLog;
};

export const getPaperHistoryLog = async () => {
  const session = await auth();
  const paperHistoryLog = await db.paperHistory.findMany({
    where: {
      performedBy: {
        schoolId: session?.user?.schoolId,
      },
    },
    include: {
      performedBy: {
        select: {
          name: true,
          email: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });

  return paperHistoryLog;
};
