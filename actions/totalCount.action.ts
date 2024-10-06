"use server";

import { db } from "@/lib/db";

export const getTotalCountsSchoolDetails = async (schooldId: string) => {
  const totalUsers = await db.user.count({
    where: {
      schoolId: schooldId,
      isPending: false,
    },
  });

  const totalPapers = await db.researchPaper.count({
    where: {
      user: {
        schoolId: schooldId,
      },
    },
  });

  return { totalUsers, totalPapers };
};

export const getTotalCounts = async () => {
  try {
    const totalSchools = await db.school.count();

    const totalTeachers = await db.user.count({
      where: {
        role: "TEACHER",
      },
    });

    const totalStudents = await db.user.count({
      where: {
        role: "STUDENT",
      },
    });

    return {
      totalSchools,
      totalTeachers,
      totalStudents,
    };
  } catch (error) {
    console.error("Error fetching total counts:", error);
    throw new Error("Failed to fetch total counts.");
  }
};

export const getTotalCountTeacherDashboard = async (schoolId: string) => {
  const totalUsers = await db.user.count({
    where: {
      schoolId: schoolId,
      isPending: false,
    },
  });

  const totalTeachers = await db.user.count({
    where: {
      schoolId: schoolId,
      role: "TEACHER",
      isPending: false,
    },
  });

  const totalStudents = await db.user.count({
    where: {
      schoolId: schoolId,
      role: "STUDENT",
      isPending: false,
    },
  });

  const lifeScienceCount = await db.researchPaper.count({
    where: {
      user: {
        schoolId: schoolId,
      },
      researchCategory: "life science",
    },
  });

  const physicalScienceCount = await db.researchPaper.count({
    where: {
      user: {
        schoolId: schoolId,
      },
      researchCategory: "physical science",
    },
  });

  const scienceInnovationExpoCount = await db.researchPaper.count({
    where: {
      user: {
        schoolId: schoolId,
      },
      researchCategory: "science innovation expo",
    },
  });

  const roboticsCount = await db.researchPaper.count({
    where: {
      user: {
        schoolId: schoolId,
      },
      researchCategory: "robotics",
    },
  });

  const mathematicalComputationalCount = await db.researchPaper.count({
    where: {
      user: {
        schoolId: schoolId,
      },
      researchCategory: "mathematical and computational",
    },
  });

  const totalResearchProposalCount = await db.researchPaper.count({
    where: {
      user: {
        schoolId: schoolId,
      },
      researchType: "proposal",
    },
  });

  const totalResearchPaperCount = await db.researchPaper.count({
    where: {
      user: {
        schoolId: schoolId,
      },
      researchType: "paper",
    },
  });

  return {
    totalUsers,
    totalTeachers,
    totalStudents,
    totalResearchProposalCount,
    totalResearchPaperCount,
    researchCategories: {
      lifeScienceCount,
      physicalScienceCount,
      scienceInnovationExpoCount,
      roboticsCount,
      mathematicalComputationalCount,
    },
  };
};

export const getTotalSchools = async () => {
  const totalSchools = await db.school.count();

  return totalSchools;
};

export const getTotalActiveSchools = async () => {
  const totalActiveSchool = await db.school.count({
    where: {
      status: "Active",
    },
  });

  return totalActiveSchool;
};

export const getNewSchoolThisMonth = async () => {
  try {
    // Get the first day of the current month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    // Get the last day of the current month
    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    endOfMonth.setDate(0);
    endOfMonth.setHours(23, 59, 59, 999);

    // Count all schools created in the current month
    const count = await db.school.count({
      where: {
        createdAt: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    });

    return count;
  } catch (error) {
    console.error("Error fetching new schools this month:", error);
    throw new Error("Failed to fetch new schools.");
  }
};
