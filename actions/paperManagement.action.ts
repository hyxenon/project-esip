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
export const getAllPapers = async (schoolId: string, category?: string) => {
  const papers = await db.researchPaper.findMany({
    where: {
      user: {
        schoolId: schoolId,
      },
      ...(category &&
        category !== "all" && {
          researchCategory: category,
        }),
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
    uniqueViews: paper._count.PaperView, // Include unique view count for each paper
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

  // Fetch the current authors linked to this paper
  const currentAuthors = await db.author.findMany({
    where: { researchPaperId: paperId },
  });

  // Find authors that are removed
  const removedAuthors = currentAuthors.filter(
    (current) => !authors!.some((newAuthor) => newAuthor.id === current.id)
  );

  // Ensure all authors exist in the database
  const connectedAuthors = await Promise.all(
    authors!.map(async (author) => {
      const existingAuthor = await db.author.findUnique({
        where: { id: author.id },
      });

      if (existingAuthor) {
        // Author exists, return it
        return { id: author.id };
      } else {
        // Author does not exist, create it first
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

  // Perform the update
  const updateData: any = {
    ...rest,
    grade: data.grade === "" ? null : data.grade,
    authors: {
      set: connectedAuthors, // Connect the existing or newly created authors
    },
  };

  const updatedPaper = await db.researchPaper.update({
    where: { id: paperId },
    data: updateData,
  });

  // Add History
  const session = await auth();

  await db.paperHistory.create({
    data: {
      action: "EDIT",
      performedById: session?.user?.id!,
      targetPaperName: updatedPaper.title,
    },
  });

  // Delete removed authors from the database
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

  // Add History
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
