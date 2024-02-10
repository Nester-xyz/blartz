import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blartz - A NFT Marketplace on Blast Network",
  description: " A NFT Marketplace on Blast Network",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://db.onlinewebfonts.com/c/b0b8a10e9c97391e66297c8b5398984f?family=Geom+Graphic+W03+Regular"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          fontFamily: "Geom Graphic W03 Regular",
          backgroundColor: "black",
        }}
      >
        {children}
      </body>
    </html>
  );
}
