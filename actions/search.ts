import { db } from "@/lib/db";
import { ResearchPaperModel } from "@/models/models";

export const searchPaper = async ({
  searchParams,
}: {
  searchParams: { query?: string; paperType?: string; categories?: string };
}) => {
  const searchQuery = searchParams.query || "";
  const paperType = searchParams.paperType || "all";
  const categoryFilter = searchParams.categories
    ? searchParams.categories.split(",")
    : [];

  const conditions: any[] = [];

  // Add title search condition
  if (searchQuery) {
    conditions.push({
      OR: [
        {
          title: {
            contains: searchQuery,
            mode: "insensitive", // Case-insensitive search
          },
        },
        {
          keywords: {
            hasSome: searchQuery.toLowerCase().split(" "), // Search based on keywords
          },
        },
      ],
    });
  }

  // Add paperType filter only if it's not "all"
  if (paperType !== "all") {
    conditions.push({
      researchType: paperType,
    });
  }

  // Add category filter if any categories are selected
  if (categoryFilter.length > 0) {
    conditions.push({
      researchCategory: {
        in: categoryFilter,
      },
    });
  }

  const papers = await db.researchPaper.findMany({
    where: {
      AND: conditions.length > 0 ? conditions : undefined,
    },
    include: {
      authors: true,
      user: {
        include: {
          school: true,
        },
      },
    },
  });

  return papers.map((paper) => ({
    ...paper,
    abstract: paper.abstract as string | null,
  })) as ResearchPaperModel[];
};

export const getPaperDetails = async (paperId: string, schoolId: string) => {
  try {
    const paper = await db.researchPaper.findFirst({
      where: {
        id: paperId,
        OR: [
          { isPublic: true },
          {
            AND: [
              { isPublic: false },
              {
                user: {
                  schoolId: schoolId,
                },
              },
            ],
          },
        ],
      },
      include: {
        user: {
          include: {
            school: true,
          },
        },
        authors: true,
        comments: true,
      },
    });

    return paper;
  } catch (error) {
    console.error("Error fetching paper details:", error);
    return null;
  }
};
