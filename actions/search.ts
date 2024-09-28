"use server";
import { db } from "@/lib/db";
import { ResearchPaperModel } from "@/models/models";
import { revalidatePath } from "next/cache";

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
            mode: "insensitive",
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
      _count: {
        select: {
          PaperView: true,
        },
      },
    },
  });

  return papers.map((paper) => ({
    ...paper,
    abstract: paper.abstract as string | null,
    uniqueViews: paper._count.PaperView,
  })) as ResearchPaperModel[];
};

export const getPaperDetails = async (
  paperId: string,
  schoolId: string,
  userId: string
) => {
  try {
    const paper = await db.researchPaper.findFirst({
      where: {
        id: paperId,
      },
      include: {
        user: {
          include: {
            school: true,
          },
        },
        authors: true,
        comments: {
          include: {
            user: true,
            Likes: true,
            _count: {
              select: { Likes: true },
            },
            children: {
              include: {
                user: true,
                Likes: true,
                _count: {
                  select: { Likes: true },
                },
              },
            },
          },
        },
      },
    });

    if (paper) {
      const uniqueViews = await db.paperView.count({
        where: { paperId: paper.id },
      });

      (paper as any).uniqueViews = uniqueViews;

      const existingView = await db.paperView.findUnique({
        where: {
          userId_paperId: {
            userId,
            paperId: paper.id,
          },
        },
      });

      if (!existingView) {
        await db.paperView.create({
          data: {
            userId,
            paperId: paper.id,
          },
        });

        (paper as any).uniqueViews += 1;
      }

      paper.comments = paper.comments.map((comment) => ({
        ...comment,
        likesCount: comment._count.Likes,
        hasLiked: comment.Likes.some((like) => like.userId === userId),
        // Process children comments similarly
        children: comment.children.map((child) => ({
          ...child,
          likesCount: child._count.Likes,
          hasLiked: child.Likes.some((like) => like.userId === userId),
        })),
      }));
    }

    return paper;
  } catch (error) {
    console.error("Error fetching paper details:", error);
    return null;
  }
};

export const addComment = async ({
  content,
  userId,
  paperId,
  parentId = null,
}: {
  content: string;
  userId: string;
  paperId: string;
  parentId?: string | null;
}) => {
  try {
    const newComment = await db.comment.create({
      data: {
        content,
        userId,
        researchPaperId: paperId,
        parentId,
      },
      include: {
        user: true,
      },
    });
    revalidatePath(`/search/${paperId}`);
    return newComment;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw new Error("Failed to add comment.");
  }
};

export const likeComment = async (
  commentId: string,
  userId: string,
  paperId: string
) => {
  try {
    await db.like.create({
      data: {
        userId,
        commentId,
      },
    });

    revalidatePath(`/search/${paperId}`);

    return { success: true };
  } catch (error) {
    console.error("Error liking comment:", error);
    throw new Error("Failed to like comment.");
  }
};

export const unlikeComment = async (
  commentId: string,
  userId: string,
  paperId: string
) => {
  try {
    await db.like.delete({
      where: {
        userId_commentId: {
          userId,
          commentId,
        },
      },
    });

    revalidatePath(`/search/${paperId}`);

    return { success: true };
  } catch (error) {
    console.error("Error unliking comment:", error);
    throw new Error("Failed to unlike comment.");
  }
};

export const editComment = async ({
  commentId,
  content,
  userId,
  paperId,
}: {
  commentId: string;
  content: string;
  userId: string;
  paperId: string;
}) => {
  try {
    const comment = await db.comment.findUnique({
      where: { id: commentId },
      select: { userId: true },
    });

    if (comment?.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const updatedComment = await db.comment.update({
      where: { id: commentId },
      data: { content },
    });

    revalidatePath(`/search/${paperId}`);
    return updatedComment;
  } catch (error) {
    console.error("Error editing comment:", error);
    throw new Error("Failed to edit comment.");
  }
};

export const deleteComment = async ({
  commentId,
  userId,
  paperId,
}: {
  commentId: string;
  userId: string;
  paperId: string;
}) => {
  try {
    const comment = await db.comment.findUnique({
      where: { id: commentId },
      select: { userId: true },
    });

    if (comment?.userId !== userId) {
      throw new Error("Unauthorized");
    }

    await db.comment.delete({
      where: { id: commentId },
    });

    revalidatePath(`/search/${paperId}`);

    return { success: true };
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw new Error("Failed to delete comment.");
  }
};
