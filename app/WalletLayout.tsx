'use client'

import "./globals.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>TON Connect Demo</title>
      </head>
      <body>
        <TonConnectUIProvider manifestUrl="https://jade-many-cricket-911.mypinata.cloud/ipfs/QmPfm6ZNMZFmJTYtdethfDgHj23ybDWwkjEu8s5JaBr7Ey">
          {children}
        </TonConnectUIProvider>
      </body>
    </html>
  );
}
