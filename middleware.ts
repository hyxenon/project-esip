import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { auth as authv } from "@/auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  DEFAULT_LOGIN_REDIRECT_ADMIN,
  DEFAULT_LOGIN_REDIRECT_STUDENT,
  DEFAULT_LOGIN_REDIRECT_TEACHER,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "./routes";
const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const session = await authv();

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      if (session?.user?.role === "ADMIN") {
        return Response.redirect(
          new URL(DEFAULT_LOGIN_REDIRECT_ADMIN, nextUrl)
        );
      }
      if (session?.user?.role === "TEACHER") {
        return Response.redirect(
          new URL(DEFAULT_LOGIN_REDIRECT_TEACHER, nextUrl)
        );
      }
      if (session?.user?.role === "STUDENT") {
        return Response.redirect(
          new URL(DEFAULT_LOGIN_REDIRECT_STUDENT, nextUrl)
        );
      }
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
