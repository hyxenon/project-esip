/*
  Warnings:

  - Added the required column `status` to the `School` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "School" ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isPending" BOOLEAN,
ADD COLUMN     "schoolId" TEXT,
ALTER COLUMN "role" DROP DEFAULT;

-- CreateTable
CREATE TABLE "ResearchPaper" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "researchAdviser" TEXT NOT NULL,
    "researchConsultant" TEXT NOT NULL,
    "researchCategory" TEXT NOT NULL,
    "researchType" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "introduction" TEXT NOT NULL,
    "abstract" TEXT,
    "references" TEXT NOT NULL,
    "file" TEXT,
    "grade" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "views" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ResearchPaper_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Author" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "researchPaperId" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ResearchPaperAuthors" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ResearchPaperAuthors_AB_unique" ON "_ResearchPaperAuthors"("A", "B");

-- CreateIndex
CREATE INDEX "_ResearchPaperAuthors_B_index" ON "_ResearchPaperAuthors"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResearchPaper" ADD CONSTRAINT "ResearchPaper_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_researchPaperId_fkey" FOREIGN KEY ("researchPaperId") REFERENCES "ResearchPaper"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResearchPaperAuthors" ADD CONSTRAINT "_ResearchPaperAuthors_A_fkey" FOREIGN KEY ("A") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResearchPaperAuthors" ADD CONSTRAINT "_ResearchPaperAuthors_B_fkey" FOREIGN KEY ("B") REFERENCES "ResearchPaper"("id") ON DELETE CASCADE ON UPDATE CASCADE;
