import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlowBoard - Work Management Platform",
  description: "A modern work management platform built with Next.js, Tailwind CSS, and MongoDB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

