import { db } from "@/lib/db";

export const getRecentAddedPapers = async (
  schoolId: string,
  page: number = 1,
  perPage: number = 5
) => {
  const currentDate = new Date();

  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
  const skip = (page - 1) * perPage;

  // Fetch research papers added within the last year, filtered by schoolId
  const recentPapers = await db.researchPaper.findMany({
    where: {
      user: {
        schoolId: schoolId,
      },
      date: {
        gte: oneYearAgo,
      },
    },
    orderBy: {
      date: "desc",
    },
    include: {
      authors: true,
    },
    skip,
    take: perPage,
  });

  const totalCount = await db.researchPaper.count({
    where: {
      user: {
        schoolId: schoolId,
      },
      date: {
        gte: oneYearAgo,
      },
    },
  });

  return { papers: recentPapers, totalCount };
};

export const getRecentUsers = async (schoolId: string) => {
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  const recentTeachers = await db.user.findMany({
    where: {
      schoolId: schoolId,
      role: "TEACHER",
      createdAt: {
        gte: threeMonthsAgo,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });

  const recentStudents = await db.user.findMany({
    where: {
      schoolId: schoolId,
      role: "STUDENT",
      createdAt: {
        gte: threeMonthsAgo,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });

  return { recentTeachers, recentStudents };
};
