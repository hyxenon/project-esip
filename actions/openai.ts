"use server";
import { db } from "@/lib/db";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getAiResponse = async (jsonData: any, schoolId: string) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are an AI model that analyzes school data.",
      },
      {
        role: "user",
        content: `Here is the data: ${JSON.stringify(jsonData)}`,
      },
    ],
  });

  const aiResponse = response.choices[0].message?.content;

  await db.school.update({
    where: { id: schoolId },
    data: {
      AIDataAnalytics: aiResponse,
    },
  });

  return response.choices[0].message?.content;
};

export const getAiResponseSchool = async (schoolId: string) => {
  const response = await db.school.findFirst({
    where: {
      id: schoolId,
    },
    select: {
      AIDataAnalytics: true,
    },
  });

  return response?.AIDataAnalytics;
};
