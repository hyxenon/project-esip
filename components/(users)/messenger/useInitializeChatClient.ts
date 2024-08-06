import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";

const useInitializeChatClient = () => {
  const { data: session } = useSession();
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);

  useEffect(() => {
    const initializeChatClient = async () => {
      if (!session?.user?.id) return;
      try {
        const response = await fetch("/api/get-token", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to get token");
        }

        const tokenData = await response.json();

        if (!tokenData?.status) {
          throw new Error("Failed to get token");
        }

        const client = StreamChat.getInstance(
          process.env.NEXT_PUBLIC_STREAM_KEY || ""
        );

        console.log(session.user.image);

        client.connectUser(
          {
            id: session.user.id,
            name: session.user.name || "",
            image: session.user.image || "https://github.com/shadcn.png",
          },
          tokenData.token
        );

        setChatClient(client);
      } catch (error) {
        console.error("Failed to connect user ", error);
      }
    };

    initializeChatClient();

    // Cleanup function to disconnect the user
    return () => {
      if (chatClient) {
        chatClient
          .disconnectUser()
          .catch((error) => console.error("Failed to disconnect user: ", error))
          .then(() => console.log("connection closed"));
        setChatClient(null);
      }
    };
  }, [session?.user?.id, chatClient]);

  return chatClient;
};

export default useInitializeChatClient;
