"use client";

import { getDocumentUsers, getUsers } from "@/actions/userManagement";
import Loader from "@/components/Loader";
import {
  LiveblocksProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useSession } from "next-auth/react";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  return (
    <LiveblocksProvider
      resolveUsers={async ({ userIds }) => {
        const users = await getUsers({ userIds });

        return users;
      }}
      authEndpoint={"/api/liveblocks-auth"}
      resolveMentionSuggestions={async ({ text, roomId }) => {
        const roomUsers = await getDocumentUsers({
          roomId,
          currentUser: session?.user?.email!,
          text,
        });

        return roomUsers;
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  );
};

export default Provider;
