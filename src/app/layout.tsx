import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dòng Sử",
  description: "A historical interactive story web app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
