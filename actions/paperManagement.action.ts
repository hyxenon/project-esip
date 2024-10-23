"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { ResearchPaperModel } from "@/models/models";
import { revalidatePath } from "next/cache";

export const addResearchProposalPaper = async (data: ResearchPaperModel) => {
  const researchProposalPaper = await db.researchPaper.create({
    data: {
      title: data.title,
      researchAdviser: data.researchAdviser.toLowerCase(),
      researchConsultant: data.researchConsultant.toLowerCase(),
      researchCategory: data.researchCategory.toLowerCase(),
      researchType: data.researchType.toLowerCase(),
      date: data.date,
      abstract: data.abstract,
      introduction: data.introduction,
      references: data.references,
      file: data.file,
      wonCompetition: data.wonCompetition,
      wonCompetitonFile: data.wonCompetitonFile,
      isPublic: data.isPublic,
      price: data.price,
      grade: data.grade,
      userId: data.userId,
      keywords: data.keywords,
      authors:
        data.authors && data.authors.length > 0
          ? {
              create: data.authors.map((author) => ({
                name: author.name,
              })),
            }
          : undefined,
    },
  });

  // Add History
  const session = await auth();

  await db.paperHistory.create({
    data: {
      action: "CREATE",
      performedById: session?.user?.id!,
      targetPaperName: researchProposalPaper.title,
    },
  });

  return researchProposalPaper;
};

export const getAllPapers = async (
  schoolId: string,
  category?: string,
  authorSearch?: boolean,
  authorSearchValue?: string
) => {
  console.log(authorSearchValue);
  const papers = await db.researchPaper.findMany({
    where: {
      user: {
        schoolId: schoolId,
      },

      ...(category &&
        category !== "all" && {
          researchCategory: category,
        }),

      ...(authorSearch && authorSearchValue
        ? {
            authors: {
              some: {
                name: {
                  contains: authorSearchValue,
                  mode: "insensitive",
                },
              },
            },
          }
        : {}),
    },
    include: {
      user: true,
      authors: true,
      comments: true,
      _count: {
        select: {
          PaperView: true,
        },
      },
    },
    orderBy: [
      {
        researchType: "asc",
      },
      {
        PaperView: { _count: "desc" },
      },
    ],
  });

  const resultPapers = papers.map((paper) => ({
    ...paper,
    uniqueViews: paper._count.PaperView,
  }));

  return { message: resultPapers };
};

export const getPaper = async (paperId: string) => {
  const paper = await db.researchPaper.findFirst({
    where: { id: paperId },
    include: {
      authors: true,
    },
  });

  return paper;
};

export const updatePaper = async (
  paperId: string,
  data: ResearchPaperModel
) => {
  const { authors, ...rest } = data;

  const currentAuthors = await db.author.findMany({
    where: { researchPaperId: paperId },
  });

  const removedAuthors = currentAuthors.filter(
    (current) => !authors!.some((newAuthor) => newAuthor.id === current.id)
  );

  const connectedAuthors = await Promise.all(
    authors!.map(async (author) => {
      const existingAuthor = await db.author.findUnique({
        where: { id: author.id },
      });

      if (existingAuthor) {
        return { id: author.id };
      } else {
        const newAuthor = await db.author.create({
          data: {
            id: author.id,
            name: author.name,
          },
        });
        return { id: newAuthor.id };
      }
    })
  );

  const updateData: any = {
    ...rest,
    grade: data.grade === "" ? null : data.grade,
    authors: {
      set: connectedAuthors,
    },
  };

  const updatedPaper = await db.researchPaper.update({
    where: { id: paperId },
    data: updateData,
  });

  const session = await auth();

  await db.paperHistory.create({
    data: {
      action: "EDIT",
      performedById: session?.user?.id!,
      targetPaperName: updatedPaper.title,
    },
  });

  await db.author.deleteMany({
    where: {
      id: {
        in: removedAuthors.map((author) => author.id),
      },
    },
  });

  revalidatePath("/teacher/paper-management/add-paper");
  return updatedPaper;
};

export const deletePaper = async (paperId: string) => {
  const paper = await db.researchPaper.delete({
    where: {
      id: paperId,
    },
  });

  const session = await auth();

  await db.paperHistory.create({
    data: {
      action: "DELETE",
      performedById: session?.user?.id!,
      targetPaperName: paper.title,
    },
  });

  revalidatePath("/teacher/paper-management");

  return { message: "Deleted Paper" };
};

export const savePaper = async (userId: string, paperId: string) => {
  await db.savedPaper.create({
    data: {
      userId: userId,
      paperId: paperId,
    },
  });
};

export const userSavedPapers = async (userId: string) => {
  const userSavedPapers = await db.savedPaper.findMany({
    where: {
      userId: userId,
    },
    select: {
      paperId: true,
    },
  });

  const savedPaperIds = userSavedPapers.map((paper) => paper.paperId);

  return savedPaperIds;
};

export const unsavePaper = async (userId: string, paperId: string) => {
  await db.savedPaper.deleteMany({
    where: {
      userId,
      paperId,
    },
  });
  revalidatePath("/library");
};

export const userSavedPapersWithDetails = async (
  userId: string,
  perPage: number = 10,
  currentPage: number = 1
) => {
  const skip = (currentPage - 1) * perPage;

  const papers = await db.savedPaper.findMany({
    where: {
      userId: userId,
    },
    include: {
      paper: {
        include: {
          authors: true,
          user: {
            include: {
              school: true,
            },
          },
          _count: {
            select: {
              PaperView: true,
            },
          },
        },
      },
    },
    skip,
    take: perPage,
  });

  const totalSavedPapers = await db.savedPaper.count({
    where: {
      userId: userId,
    },
  });

  const totalPages = Math.ceil(totalSavedPapers / perPage);

  return {
    searchPaperResults: papers.map((savedPaper) => ({
      ...savedPaper.paper,
      abstract: savedPaper.paper.abstract as string | null,
      uniqueViews: savedPaper.paper._count.PaperView,
    })),
    totalPages,
  };
};
