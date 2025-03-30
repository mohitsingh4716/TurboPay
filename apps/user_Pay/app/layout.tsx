import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "../provider";
import { Toaster } from "sonner";
import { AppbarClient } from "../components/AppbarClient";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "TurboPay",
  description: "A payment app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="min-w-screen min-h-screen bg-[#ebe6e6]">
            <AppbarClient />
            {/* <Header /> */}
            {children}
          </div>
          <Toaster
          richColors
            position="bottom-left"
          />
        </body>
      </Providers>
    </html>
  );
}
