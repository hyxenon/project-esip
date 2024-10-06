import { auth } from "@/auth";
import { initEdgeStore } from "@edgestore/server";
import {
  CreateContextOptions,
  createEdgeStoreNextHandler,
} from "@edgestore/server/adapters/next/app";

type Context = {
  schoolId: string;
  role?: string;
};

async function createContext({ req }: CreateContextOptions): Promise<Context> {
  const session = await auth();

  if (!session) {
    console.error("No session found.");
    throw new Error("Session is missing.");
  }

  const schoolId = session.user?.schoolId ? session.user.schoolId : "none";
  const role = session.user?.role === "ADMIN" ? "ADMIN" : "USER";

  if (!schoolId) {
    console.error("School ID is missing in session:", session);
    throw new Error("School ID is missing in the session.");
  }

  return {
    schoolId,
    role,
  };
}

const es = initEdgeStore.context<Context>().create();
/**
 * This is the main router for the Edge Store buckets.
 */
const edgeStoreRouter = es.router({
  publicFiles: es.fileBucket().beforeDelete(({ ctx, fileInfo }) => {
    console.log("beforeDelete", ctx, fileInfo);
    return true; // allow delete
  }),
  myProtectedFiles: es
    .fileBucket()
    .path(({ ctx }) => [{ owner: ctx.schoolId }])
    .accessControl({
      OR: [
        {
          schoolId: { path: "owner" },
        },
        {
          role: { eq: "ADMIN" },
        },
      ],
    })
    .beforeDelete(({ ctx, fileInfo }) => {
      console.log("beforeDelete", ctx, fileInfo);
      return true; // allow delete
    }),
});
const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
  createContext,
});
export { handler as GET, handler as POST };
/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = typeof edgeStoreRouter;
