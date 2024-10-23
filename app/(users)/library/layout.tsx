import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Library",
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
