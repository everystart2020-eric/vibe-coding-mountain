import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "바이브 코딩 산악 학교",
  description: "산을 오르듯, 단계별로 배우는 AI 코딩 여정",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
