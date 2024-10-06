// layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Inter } from "next/font/google";
import StarsCanvas from "./components/main/StarBackground";
import Script from 'next/script'

const geistSans = Inter({ subsets: ["latin"] });
const geistMono = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Telegram Mini App',
  description: 'A simple Telegram mini app using Next.js and Prisma',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      </head>

      <body className={`${geistSans.className} bg-[#030014] overflow-y-scroll overflow-x-hidden`}>
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        
        {children}
      </body>
    </html>
  );
}