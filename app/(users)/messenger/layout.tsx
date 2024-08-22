export const metadata = {
  title: "Messenger App",
  description: "This is the Messenger App page",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
