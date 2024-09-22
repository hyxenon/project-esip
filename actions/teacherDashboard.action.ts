import { db } from "@/lib/db";
import * as XLSX from "xlsx";

export const getRecentAddedPapers = async (
  schoolId: string,
  page: number = 1,
  perPage: number = 5
) => {
  const currentDate = new Date();

  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
  const skip = (page - 1) * perPage;

  // Fetch research papers added within the last year, filtered by schoolId
  const recentPapers = await db.researchPaper.findMany({
    where: {
      user: {
        schoolId: schoolId,
      },
      date: {
        gte: oneYearAgo,
      },
    },
    orderBy: {
      date: "desc",
    },
    include: {
      authors: true,
    },
    skip,
    take: perPage,
  });

  const totalCount = await db.researchPaper.count({
    where: {
      user: {
        schoolId: schoolId,
      },
      date: {
        gte: oneYearAgo,
      },
    },
  });

  return { papers: recentPapers, totalCount };
};

export const getRecentUsers = async (schoolId: string) => {
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  const recentTeachers = await db.user.findMany({
    where: {
      schoolId: schoolId,
      role: "TEACHER",
      createdAt: {
        gte: threeMonthsAgo,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 9,
  });

  const recentStudents = await db.user.findMany({
    where: {
      schoolId: schoolId,
      role: "STUDENT",
      createdAt: {
        gte: threeMonthsAgo,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });

  return { recentTeachers, recentStudents };
};

export const getPopularPapers = async (schoolId: string) => {
  const popularPapers = await db.researchPaper.findMany({
    where: {
      user: {
        schoolId: schoolId,
      },
    },
    include: {
      PaperView: true,
    },
    orderBy: {
      PaperView: {
        _count: "desc",
      },
    },
    take: 10,
  });

  const filteredPapers = popularPapers.map((paper) => ({
    paper: paper.title,
    views: paper.PaperView.length,
  }));
  return filteredPapers;
};

export const getPopularKeywords = async (schoolId: string) => {
  const researchPapers = await db.researchPaper.findMany({
    where: {
      user: {
        schoolId,
      },
    },
    select: {
      keywords: true,
    },
  });

  const allKeywords = researchPapers.flatMap((paper) => paper.keywords);

  const keywordCount: { [key: string]: number } = allKeywords.reduce(
    (acc, keyword) => {
      if (keyword.trim() === "") {
        return acc;
      }
      if (acc[keyword]) {
        acc[keyword] += 1;
      } else {
        acc[keyword] = 1;
      }
      return acc;
    },
    {} as { [key: string]: number }
  );

  const keywordArray = Object.entries(keywordCount).map(([keyword, count]) => ({
    keyword,
    count,
  }));

  const topKeywords = keywordArray
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return topKeywords;
};

const applyStylesToHeader = (
  worksheet: XLSX.WorkSheet,
  headerRows: number[]
) => {
  headerRows.forEach((rowNumber) => {
    const cell = worksheet[`A${rowNumber}`];
    if (cell) {
      cell.s = {
        font: { bold: true },
      };
    }
  });
};

export const convertJsonToExcel = (jsonData: any, filename: string) => {
  const ws = XLSX.utils.json_to_sheet(jsonData);

  applyStylesToHeader(ws, [1, 8, 14, 18]);

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  const excelData = XLSX.write(wb, { bookType: "xlsx", type: "array" });

  const blob = new Blob([excelData], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.xlsx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
