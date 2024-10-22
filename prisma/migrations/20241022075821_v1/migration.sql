/*
  Warnings:

  - You are about to drop the `_ResearchPaperAuthors` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserActionType" AS ENUM ('CREATE', 'EDIT', 'DELETE');

-- CreateEnum
CREATE TYPE "PaperActionType" AS ENUM ('CREATE', 'EDIT', 'DELETE');

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "_ResearchPaperAuthors" DROP CONSTRAINT "_ResearchPaperAuthors_A_fkey";

-- DropForeignKey
ALTER TABLE "_ResearchPaperAuthors" DROP CONSTRAINT "_ResearchPaperAuthors_B_fkey";

-- AlterTable
ALTER TABLE "Author" ADD COLUMN     "researchPaperId" TEXT;

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "parentId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ResearchPaper" ADD COLUMN     "keywords" TEXT[],
ADD COLUMN     "price" INTEGER,
ADD COLUMN     "wonCompetition" TEXT DEFAULT 'none',
ADD COLUMN     "wonCompetitonFile" TEXT;

-- DropTable
DROP TABLE "_ResearchPaperAuthors";

-- CreateTable
CREATE TABLE "Like" (
    "userId" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("userId","commentId")
);

-- CreateTable
CREATE TABLE "PaperView" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "paperId" TEXT NOT NULL,
    "viewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PaperView_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaperPurchase" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "paperId" TEXT NOT NULL,
    "paymentLink" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaperPurchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserHistory" (
    "id" TEXT NOT NULL,
    "action" "UserActionType" NOT NULL,
    "performedById" TEXT NOT NULL,
    "targetName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaperHistory" (
    "id" TEXT NOT NULL,
    "action" "PaperActionType" NOT NULL,
    "performedById" TEXT NOT NULL,
    "targetPaperName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PaperHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PaperView_userId_paperId_key" ON "PaperView"("userId", "paperId");

-- CreateIndex
CREATE UNIQUE INDEX "PaperPurchase_userId_paperId_key" ON "PaperPurchase"("userId", "paperId");

-- AddForeignKey
ALTER TABLE "Author" ADD CONSTRAINT "Author_researchPaperId_fkey" FOREIGN KEY ("researchPaperId") REFERENCES "ResearchPaper"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaperView" ADD CONSTRAINT "PaperView_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaperView" ADD CONSTRAINT "PaperView_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES "ResearchPaper"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaperPurchase" ADD CONSTRAINT "PaperPurchase_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES "ResearchPaper"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaperPurchase" ADD CONSTRAINT "PaperPurchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHistory" ADD CONSTRAINT "UserHistory_performedById_fkey" FOREIGN KEY ("performedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaperHistory" ADD CONSTRAINT "PaperHistory_performedById_fkey" FOREIGN KEY ("performedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
