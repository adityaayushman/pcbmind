import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PCBMind AI - Manufacturing Intelligence",
  description: "AI-powered PCB defect detection and predictive analytics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-brand-dark text-white`}>
        {children}
      </body>
    </html>
  );
}
