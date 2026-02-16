import type { Metadata } from "next";
import "./globals.css";
import TopBar from "./components/TopBar";
import ProofFooter from "./components/ProofFooter";

export const metadata: Metadata = {
  title: "KodNest Premium Build System",
  description: "A calm, intentional build system for serious products.",
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
