import { getDocument } from "@/actions/room.action";
import { getUsers } from "@/actions/userManagement";
import { auth } from "@/auth";
import CollaborativeRoom from "@/components/(users)/student/CollaborativeRoom";
import { redirect } from "next/navigation";

import React from "react";

const Document = async ({ params: { id } }: SearchParamProps) => {
  const session = await auth();
  if (!session) redirect("login");

  const room = await getDocument({
    roomId: id,
    userId: session.user?.email || "",
  });

  if (!room) redirect("/student/livedocs");

  const userIds = Object.keys(room.usersAccesses);
  const users = await getUsers({ userIds });

  const usersData = users.map((user: User) => ({
    ...user,
    userType: room.usersAccesses[user.email]?.includes("room:write")
      ? "editor"
      : "viewer",
  }));

  const currentUserType = room.usersAccesses[
    session.user?.email || ""
  ]?.includes("room:write")
    ? "editor"
    : "viewer";
  return (
    <div className="">
      <CollaborativeRoom
        roomId={id}
        roomMetadata={room.metadata}
        users={usersData}
        currentUserType={currentUserType}
      />
    </div>
  );
};

export default Document;
