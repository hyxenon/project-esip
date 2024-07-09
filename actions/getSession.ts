// actions/getSession.ts
import { auth } from "@/auth";
import { Session } from "next-auth";

const getSession = async (): Promise<Session | null> => {
  const session = await auth();
  return session;
};

export default getSession;
