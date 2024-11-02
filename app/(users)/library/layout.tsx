import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project E-SIP - My Library",
  description: "Saved Papers",
};

export default async function LibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="">{children}</div>
    </>
  );
}
