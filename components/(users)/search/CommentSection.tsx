"use client";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { addComment } from "@/actions/search";
import { Session } from "next-auth";

interface Comment {
  id: string;
  user: {
    name: string;
  };
  content: string;
  createdAt: string;
  likes: number;
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
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log("Comments: ", comments);

  const handleAddComment = async (content: string, parentId?: string) => {
    try {
      setLoading(true);
      setError(null);

      const newComment = await addComment({
        content,
        userId: session.user?.id!,
        paperId: paperId,
        parentId,
      });

      setReplyingTo(null);
    } catch (err) {
      setError("Failed to add comment. Please try again.");
    } finally {
      setLoading(false);
    }
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

  const rootComments = buildCommentTree(comments);

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
