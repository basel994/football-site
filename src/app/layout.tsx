import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Header/Navbar";
import { UserProvider } from "@/context/userContext/userContext";

const lemonada = localFont({
  src: "./fonts/Lemonada-Regular.woff",
  variable: "--font-lemonada",
  weight: "100 - 900",
});

export const metadata: Metadata = {
  title: "تطـبيق ريــاضـي",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <UserProvider>
        <body className={`${lemonada.variable}`}>
          <Navbar />
          <div className="content">
            {children}
          </div>
        </body>
      </UserProvider>
    </html>
  );
}
