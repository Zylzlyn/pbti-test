import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PBTI - 产品行为类型测试",
  description: "你是 SUDO 还是 NULL？30 道题测出你的产品人格。27 种产品人格类型等你解锁。",
  keywords: ["PBTI", "产品经理测试", "产品人格", "MBTI", "产品性格", "Vibe Coding"],
  icons: { icon: "/icon.svg", shortcut: "/icon.svg", apple: "/icon.svg" },
  openGraph: {
    title: "PBTI - 你是什么类型的产品经理？",
    description: "30 道题，测出你的产品人格。你是 SUDO 还是 NULL？",
    type: "website",
    url: "https://pbti.zylzlyn.cn",
  },
  metadataBase: new URL("https://pbti.zylzlyn.cn"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" className="antialiased">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
