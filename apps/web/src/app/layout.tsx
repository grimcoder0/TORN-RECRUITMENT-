import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Torn Recruitment & Marketplace Platform",
  description: "Discovery, recruitment, matching, verification, and marketplace layer for Torn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/compiled.css" />
      </head>
      <body className="antialiased bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}
