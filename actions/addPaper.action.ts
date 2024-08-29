"use server";
import { db } from "@/lib/db";
import { ResearchPaperModel } from "@/models/models";

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
