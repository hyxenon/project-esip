import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";

import { db } from "./lib/db";
import { getUserById } from "./data/user";

declare module "@auth/core/types" {
  interface User {
    role: "ADMIN" | "TEACHER" | "STUDENT";
    schoolId: string | null;
    image?: string | null;
    isPending?: boolean;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role: "ADMIN" | "TEACHER" | "STUDENT";
    schoolId: string | null;
    image?: string | null;
    isPending?: boolean;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/login",
    error: "/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      if (user.id) {
        const existingUser = await getUserById(user.id);

        // Prevent sign in without email verification
        if (!existingUser?.emailVerified) return false;

        // Prevent sign in if school is status is inactive
        if (existingUser.school?.status === "Inactive") return false;

        // Prevent sign in if user is pending
        if (user.isPending === true) return false;

        return true;
      }

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      if (token.image && session.user) {
        session.user.image = token.image;
      }

      if (token.schoolId && session.user) {
        session.user.schoolId = token.schoolId;
      }

      if (typeof token.isPending !== "undefined" && session.user) {
        session.user.isPending = token.isPending;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;
      token.schoolId = existingUser.schoolId;
      token.image = existingUser.image;
      token.isPending = existingUser.isPending ?? undefined;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
