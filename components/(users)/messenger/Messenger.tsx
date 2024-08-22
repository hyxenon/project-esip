"use client";

import { Chat, LoadingIndicator } from "stream-chat-react";
import useInitializeChatClient from "./useInitializeChatClient";
import { useSession } from "next-auth/react";
import ChatSidebar from "./chat/ChatSidebar";
import ChatChannel from "./chat/ChatChannel";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import useWindowSize from "@/lib/hooks/useWindowSize";
import { mdBreakpoint } from "@/lib/tailwind";

const Messenger = () => {
  const chatClient = useInitializeChatClient();
  const { data: session } = useSession();

  const [chartSidebarOpen, setChartSidebarOpen] = useState(false);

  const windowSize = useWindowSize();
  const isLargeScreen = windowSize.width >= mdBreakpoint;

  useEffect(() => {
    if (windowSize.width >= mdBreakpoint) setChartSidebarOpen(false);
  }, [windowSize.width]);

  const handleSidebarOnClose = useCallback(() => {
    setChartSidebarOpen(false);
  }, []);

  if (!chatClient || !session) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingIndicator size={40} />
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#faf9f6]">
      <div className="max-w-[1600px] min-w-[350px] h-full shadow-sm m-auto flex flex-col">
        <Chat client={chatClient}>
          <div className="border-b border-b-[#DBDDE1] p-2 md:hidden">
            <Button
              type="button"
              variant={"ghost"}
              onClick={() => setChartSidebarOpen(!chartSidebarOpen)}
            >
              {!chartSidebarOpen ? (
                <span className="flex items-center gap-1">
                  <Menu /> Menu
                </span>
              ) : (
                <X />
              )}
            </Button>
          </div>
          <div className="flex flex-row h-full overflow-y-auto">
            <ChatSidebar
              onClose={handleSidebarOnClose}
              userId={session.user?.id!}
              show={isLargeScreen || chartSidebarOpen}
            />
            <ChatChannel
              show={isLargeScreen || !chartSidebarOpen}
              hideChannelOnThread={!isLargeScreen}
            />
          </div>
        </Chat>
      </div>
    </div>
  );
};

export default Messenger;
