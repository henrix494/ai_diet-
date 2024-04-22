import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar/NavBar";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { heIL } from "@clerk/localizations";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={heIL}>
      <html lang="en" dir="rtl" data-theme="dark">
        <body className={inter.className}>
          <NavBar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
