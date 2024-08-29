"use server";
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
      introduction: data.introduction,
      references: data.references,
      file: data.file,
      grade: data.grade,
      userId: data.userId,
      authors:
        data.authors && data.authors.length > 0
          ? {
              create: data.authors.map((author) => ({
                firstName: author.firstName,
                lastName: author.lastName,
              })),
            }
          : undefined,
    },
  });

  return researchProposalPaper;
};

export const getAllPapers = async () => {
  const papers = await db.researchPaper.findMany();
  return { message: papers };
};

export const deletePaper = async (paperId: string) => {
  const paper = await db.researchPaper.delete({
    where: {
      id: paperId,
    },
  });

  revalidatePath("/teacher/paper-management");

  return { message: "Deleted Paper" };
};
