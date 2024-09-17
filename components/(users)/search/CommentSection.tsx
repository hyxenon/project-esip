"use client";
import React, { useState, useTransition } from "react";
import { useMediaQuery } from "react-responsive"; // Import useMediaQuery
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, ChevronDown, ChevronUp } from "lucide-react"; // Import icons
import {
  addComment,
  editComment,
  deleteComment,
  likeComment,
  unlikeComment,
} from "@/actions/search";
import { Session } from "next-auth";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

interface Comment {
  id: string;
  user: {
    name: string;
    id: string;
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

  // Function to handle adding a new comment or reply
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

      const newComment: Comment = {
        ...newCommentData,
        likesCount: 0,
        hasLiked: false,
        children: [],
        user: {
          id: session.user?.id!,
          name: session.user?.name || "Unknown",
        },
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

  // Function to handle editing a comment
  const handleEditComment = async (commentId: string, content: string) => {
    try {
      setLoading(true);
      setError(null);

      const updatedComment = await editComment({
        commentId,
        content,
        userId: session.user?.id!,
        paperId: paperId,
      });

      // Update local state
      setAllComments((prevComments) =>
        prevComments.map((c) =>
          c.id === commentId ? { ...c, content: updatedComment.content } : c
        )
      );
    } catch (err) {
      setError("Failed to edit comment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle deleting a comment
  const handleDeleteComment = async (commentId: string) => {
    try {
      setLoading(true);
      setError(null);

      await deleteComment({
        commentId,
        userId: session.user?.id!,
        paperId: paperId,
      });

      // Update local state by removing the deleted comment and its replies
      setAllComments((prevComments) =>
        prevComments.filter(
          (c) => c.id !== commentId && c.parentId !== commentId
        )
      );
    } catch (err) {
      setError("Failed to delete comment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle liking a comment
  const handleLike = (comment: Comment) => {
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

  // Function to build a tree structure from flat comments array
  function buildCommentTree(comments: Comment[]) {
    const commentMap: { [key: string]: Comment } = {};
    const roots: Comment[] = [];

    comments.forEach((comment) => {
      comment.children = [];
      commentMap[comment.id] = comment;
    });

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

  // Component to render individual comments and their replies
  const CommentCard = ({
    comment,
    depth = 0,
  }: {
    comment: Comment;
    depth?: number;
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(comment.content);
    const isOwnComment = comment.user.id === session.user?.id;

    // Limit indentation depth
    const maxIndentationDepth = 2;
    const indentationDepth =
      depth > maxIndentationDepth ? maxIndentationDepth : depth;
    const indentationClass = `ml-${indentationDepth * 4}`;

    // State to control collapsing of replies
    const [isCollapsed, setIsCollapsed] = useState(true);

    // Detect if the device is mobile
    const isMobile = useMediaQuery({ maxWidth: 640 });

    return (
      <div
        className={`flex flex-col ${
          indentationDepth > 0 ? `${indentationClass}` : ""
        }`}
      >
        <div className="flex">
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
                {isEditing ? (
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      await handleEditComment(comment.id, editContent);
                      setIsEditing(false);
                    }}
                  >
                    <Input
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="flex-1 bg-gray-100"
                    />
                    <div className="flex space-x-2 mt-2">
                      <Button type="submit" size="sm" className="p-2">
                        Save
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        className="p-2"
                        onClick={() => {
                          setIsEditing(false);
                          setEditContent(comment.content);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                ) : (
                  <p className="text-sm">{comment.content}</p>
                )}
              </CardContent>
            </Card>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              {isOwnComment && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="h-auto p-0 text-gray-500 hover:text-blue-600"
                  >
                    Edit
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 text-red-500 hover:text-red-600"
                      >
                        Delete
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                      </DialogHeader>
                      <p>
                        Are you sure you want to delete this comment? This
                        action cannot be undone.
                      </p>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="ghost">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button
                            variant="destructive"
                            onClick={() => handleDeleteComment(comment.id)}
                          >
                            Delete
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </>
              )}
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
              <span>
                {new Date(comment.createdAt).toLocaleDateString([], {
                  month: "numeric",
                  day: "numeric",
                  year: "numeric",
                })}
                ,{" "}
                {new Date(comment.createdAt).toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>
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
            {comment.children && comment.children.length > 0 && (
              <div className="mt-2">
                {isMobile ? (
                  // Use collapsible replies on mobile
                  <div>
                    <button
                      className="text-blue-600 text-sm flex items-center"
                      onClick={() => setIsCollapsed(!isCollapsed)}
                    >
                      {isCollapsed ? (
                        <ChevronDown className="h-4 w-4 mr-1" />
                      ) : (
                        <ChevronUp className="h-4 w-4 mr-1" />
                      )}
                      {isCollapsed
                        ? `View Replies (${comment.children.length})`
                        : "Hide Replies"}
                    </button>
                    {!isCollapsed && (
                      <div>
                        {comment.children.map((reply) => (
                          <CommentCard
                            key={reply.id}
                            comment={reply}
                            depth={depth + 1}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  // Show replies directly on larger screens
                  <div>
                    {comment.children.map((reply) => (
                      <CommentCard
                        key={reply.id}
                        comment={reply}
                        depth={depth + 1}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render the main comment section
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
