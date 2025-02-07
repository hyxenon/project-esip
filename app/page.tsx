import { auth } from "@/auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();

  if (session?.user?.role === "ADMIN") {
    return redirect("/admin");
  }

  if (session?.user?.role === "TEACHER") {
    return redirect("/teacher");
  }

  if (session?.user?.role === "STUDENT") {
    return redirect("/search");
  }
};

export default page;
