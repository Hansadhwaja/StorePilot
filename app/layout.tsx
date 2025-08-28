import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import LeftBar from "@/components/LeftBar";
import { Navbar } from "@/components/Navbar";
import BottomBar from "@/components/BottomBar";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`w-full justify-center flex-center ${poppins.className}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex bg-background text-foreground">
            <LeftBar />
            <div className="flex flex-col max-container">
              <Navbar />
              <main className="flex-1">{children}</main>
            </div>
            <BottomBar />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
