import React from "react";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "../app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hadap Tutoring",
  description: "Tutoring Powered by AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
        <head>
          <link rel="icon" href="/HadapLogo.png" sizes="any" />
        </head>
        <body className={inter.className}>{children}</body>
      </html>
    </>
  );
}
