import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dòng Sử",
  description:
    "Web trải nghiệm lịch sử tương tác với scene, lựa chọn, timeline và tư liệu.",
  icons: {
    icon: "/favicon.svg",
  },
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
