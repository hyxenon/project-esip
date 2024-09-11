import { auth } from "@/auth";
import Navbar from "@/components/(users)/navbar";

const GrammarChecker = async () => {
  const session = await auth();

  if (!session?.user) {
    return <div>no session found</div>;
  }

  return (
    <div>
      <Navbar role={session.user.role} />
      <p>Grammar checker</p>
    </div>
  );
};

export default GrammarChecker;
