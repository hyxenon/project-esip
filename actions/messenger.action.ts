import { auth } from "@/auth";
import { StreamChat } from "stream-chat";

export const getToken = async () => {
  const session = await auth();
  if (!session) {
    return { status: false, error: "No session found" };
  }

  try {
    if (session?.user?.id) {
      const streamClient = StreamChat.getInstance(
        process.env.NEXT_PUBLIC_STREAM_KEY || "",
        process.env.STREAM_SECRET || ""
      );

      const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60;
      const issuedAt = Math.floor(Date.now() / 1000) - 60;

      const token = streamClient.createToken(
        session.user.id,
        expirationTime,
        issuedAt
      );

      return { status: true, token };
    } else {
      return { error: "User not authenticated", status: false };
    }
  } catch (error) {
    console.log(`Error getting token: ${error}`);
    return { error: `Error getting token: ${error}`, status: false };
  }
};
