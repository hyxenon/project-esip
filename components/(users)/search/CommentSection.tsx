"use client";
import { useState, useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { addComment, likeComment, unlikeComment } from "@/actions/search";
import { Session } from "next-auth";

interface Comment {
  id: string;
  user: {
    name: string;
  };
  content: string;
  createdAt: string;
  likesCount: number;
  hasLiked: boolean;
  parentId?: string | null;
  children: Comment[];
}

interface CommentSectionProps {
  comments: Comment[];
  paperId: string;
  session: Session;
}

export default function CommentSection({
  comments,
  paperId,
  session,
}: CommentSectionProps) {
  const [allComments, setAllComments] = useState<Comment[]>(comments);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleAddComment = async (content: string, parentId?: string) => {
    try {
      setLoading(true);
      setError(null);

      const newCommentData = await addComment({
        content,
        userId: session.user?.id!,
        paperId: paperId,
        parentId,
      });

      // Construct a Comment object with all required properties
      const newComment: Comment = {
        ...newCommentData,
        likesCount: 0, // Assuming new comments start with 0 likes
        hasLiked: false, // Assuming the user hasn't liked their own comment yet
        children: [], // New comments won't have replies initially
        // If 'user' in newCommentData doesn't match, ensure it conforms to { name: string }
        user: {
          name: session.user?.name || "Unknown", // Use session data or a default value
        },
        // Ensure 'createdAt' is a string, if it's a Date object, convert it
        createdAt: new Date().toISOString(),
      };

      // Update local state
      setAllComments((prevComments) => [...prevComments, newComment]);

      setReplyingTo(null);
    } catch (err) {
      setError("Failed to add comment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLike = (comment: Comment) => {
    // Optimistic UI Update
    setAllComments((prevComments) =>
      prevComments.map((c) =>
        c.id === comment.id
          ? {
              ...c,
              hasLiked: !c.hasLiked,
              likesCount: comment.hasLiked
                ? comment.likesCount - 1
                : comment.likesCount + 1,
            }
          : c
      )
    );

    startTransition(async () => {
      try {
        if (comment.hasLiked) {
          await unlikeComment(comment.id, session.user?.id!, paperId);
        } else {
          await likeComment(comment.id, session.user?.id!, paperId);
        }
      } catch (error) {
        // Revert optimistic update on error
        setAllComments((prevComments) =>
          prevComments.map((c) =>
            c.id === comment.id
              ? {
                  ...c,
                  hasLiked: comment.hasLiked,
                  likesCount: comment.likesCount,
                }
              : c
          )
        );
        console.error(error);
      }
    });
  };

  function buildCommentTree(comments: Comment[]) {
    const commentMap: { [key: string]: Comment } = {};
    const roots: Comment[] = [];

    comments.forEach((comment) => {
      comment.children = [];
      commentMap[comment.id] = comment;
    });

    // Build the tree
    comments.forEach((comment) => {
      if (comment.parentId) {
        const parentComment = commentMap[comment.parentId];
        if (parentComment) {
          parentComment.children.push(comment);
        }
      } else {
        roots.push(comment);
      }
    });

    return roots;
  }

  const rootComments = buildCommentTree(allComments);

  const CommentCard = ({
    comment,
    depth = 0,
  }: {
    comment: Comment;
    depth?: number;
  }) => (
    <div className={`flex ${depth > 0 ? "ml-8 relative" : ""}`}>
      {depth > 0 && (
        <div className="absolute left-[-16px] top-0 bottom-0 w-[2px] bg-gray-200"></div>
      )}
      <Avatar className="h-8 w-8 mr-2 z-10">
        <AvatarImage
          src={`https://api.dicebear.com/6.x/initials/svg?seed=${comment.user.name}`}
        />
        <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <Card className="bg-gray-100">
          <CardContent className="p-3">
            <p className="text-sm font-semibold">{comment.user.name}</p>
            <p className="text-sm">{comment.content}</p>
          </CardContent>
        </Card>
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setReplyingTo(comment.id)}
            className="h-auto p-0 text-gray-500 hover:text-blue-600"
          >
            Reply
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleLike(comment)}
            disabled={isPending}
            className={`h-auto p-0 hover:text-blue-600 ${
              comment.hasLiked ? "text-blue-600" : "text-gray-500"
            }`}
          >
            {comment.hasLiked ? "Unlike" : "Like"} ({comment.likesCount})
          </Button>
          <span>{new Date(comment.createdAt).toLocaleString()}</span>
        </div>
        {replyingTo === comment.id && (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const replyText = (
                e.target as HTMLFormElement
              ).reply.value.trim();
              if (replyText) {
                await handleAddComment(replyText, comment.id);
                setReplyingTo(null);
                (e.target as HTMLFormElement).reset();
              }
            }}
          >
            <div className="flex gap-0.5 items-center">
              <Input
                name="reply"
                placeholder="Write a reply..."
                className="flex-1 bg-gray-100"
              />
              <Button type="submit" size="sm" className="p-2">
                <Send className="h-4 w-4" />
                <span className="sr-only">Send reply</span>
              </Button>
            </div>
          </form>
        )}
        {/* Recursive rendering of children (replies) */}
        {comment.children && comment.children.length > 0 && (
          <div className="mt-2">
            {comment.children.map((reply) => (
              <CommentCard key={reply.id} comment={reply} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-4 mx-auto p-4">
      <h3 className="text-xl font-semibold text-gray-800">Comments</h3>
      {error && <p className="text-red-500">{error}</p>}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const commentText = (
            e.target as HTMLFormElement
          ).comment.value.trim();
          if (commentText) {
            await handleAddComment(commentText);
            (e.target as HTMLFormElement).reset();
          }
        }}
      >
        <div className="flex items-center gap-0.5">
          <Input
            name="comment"
            placeholder="Write a comment..."
            className="flex-1"
            disabled={loading}
          />
          <Button type="submit" size="sm" className="p-2" disabled={loading}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Post comment</span>
          </Button>
        </div>
      </form>
      <div className="space-y-4">
        {rootComments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
