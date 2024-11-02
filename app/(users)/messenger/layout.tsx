import { auth } from "@/auth";
import Navbar from "@/components/(users)/navbar";

export const metadata = {
  title: "Messenger App",
  description: "This is the Messenger App page",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session?.user) {
    return <div>no session found</div>;
  }
  return (
    <>
      <Navbar isMessenger={true} role={session.user.role} />
      {children}
    </>
  );
}
