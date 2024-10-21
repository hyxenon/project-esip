"use server";

import { db } from "@/lib/db";

export const getAllResearchPapers = async (
  schoolId?: string,
  category?: string,
  authorSearch?: boolean,
  authorSearchValue?: string
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
        // If authorSearch is true, filter by author name
        ...(authorSearch && authorSearchValue
          ? {
              authors: {
                some: {
                  name: {
                    contains: authorSearchValue, // Perform partial match for the author's name
                    mode: "insensitive", // Case-insensitive search
                  },
                },
              },
            }
          : {}),
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
