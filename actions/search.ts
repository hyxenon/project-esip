import { db } from "@/lib/db";

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
      title: {
        contains: searchQuery,
        mode: "insensitive", // Case-insensitive search
      },
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
  });

  return papers;
};
