import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StorePilot",
  description: "Paint store management made simple",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={` w-full h-screen justify-center flex-center overflow-hidden ${inter.className}`}
      >
        <Navbar />
        <main className="px-4 w-full h-full">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
