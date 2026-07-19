import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { StoryProvider } from "../context/StoryContext";
import ClientLayoutWrapper from "../components/ClientLayoutWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Loreloom | AI Art Director for Visual Stories",
  description: "Create ongoing visual stories with persistent narrative memory, custom visual styles, and on-chain provenance registry.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${inter.variable}`} suppressHydrationWarning={true} data-scroll-behavior="smooth">
      <body style={{ margin: 0, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <StoryProvider>
          <ClientLayoutWrapper>
            {children}
          </ClientLayoutWrapper>
        </StoryProvider>
      </body>
    </html>
  );
}
