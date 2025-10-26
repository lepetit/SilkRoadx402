import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SilkRoadx402 - Anonymous Software Marketplace",
  description: "The first decentralized marketplace for private software sales using x402 payments on Solana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-gray-100">
        {children}
      </body>
    </html>
  );
}

