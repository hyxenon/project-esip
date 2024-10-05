"use server";

import { db } from "@/lib/db";

export const getAllResearchPapers = async (
  schoolId?: string,
  category?: string
) => {
  try {
    const researchPapers = await db.researchPaper.findMany({
      where: {
        user: {
          schoolId: schoolId || undefined,
        },
        ...(category &&
          category !== "all" && {
            researchCategory: category,
          }),
      },
      orderBy: [
        {
          researchType: "asc",
        },
        {
          PaperView: { _count: "desc" },
        },
      ],
      include: {
        PaperView: true,
        user: {
          select: {
            id: true,
            name: true,
            school: {
              select: {
                schoolName: true,
                image: true,
              },
            },
          },
        },
        authors: true,
        _count: {
          select: {
            PaperView: true,
          },
        },
      },
    });

    const resultPapers = researchPapers.map((paper) => ({
      ...paper,
      uniqueViews: paper._count.PaperView,
    }));

    return resultPapers;
  } catch (error) {
    console.error("Error fetching research papers:", error);
    throw new Error("Failed to fetch research papers");
  }
};
