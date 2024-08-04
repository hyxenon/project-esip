import { auth } from "@/auth";
import { getUserById } from "@/data/user";
import { liveblocks } from "@/lib/liveblocks";
import { getUserColor } from "@/lib/utils";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const session = await auth();

  if (session?.user?.id) {
    const existingUser = await getUserById(session?.user?.id);
    if (!existingUser) redirect("/login");

    const { id, name, email, image } = existingUser;

    const user = {
      id: id,
      info: {
        id,
        name: name || "",
        email: email || "",
        avatar: image || "https://github.com/shadcn.png",
        color: getUserColor(id),
      },
    };

    // Identify the user and return the result
    const { status, body } = await liveblocks.identifyUser(
      {
        userId: user.info.email || "",
        groupIds: [],
      },
      { userInfo: user.info }
    );

    return new Response(body, { status });
  }
}
