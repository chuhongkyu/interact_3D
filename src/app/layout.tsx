import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/styles/style.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>마리오 개발자 월드</title>
	      <meta name="description" content="마리오 월드에서 개발자의 인생을 엿보세요."/>
        <link rel="icon" href="/assets/favicon.ico" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
