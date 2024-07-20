import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/auth/SessionWrapper";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={inter.className}>
          <EdgeStoreProvider>
            {children} <Toaster />
          </EdgeStoreProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
