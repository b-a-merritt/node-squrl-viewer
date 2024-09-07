import React from "react";
import Image from "next/image";
import Link from "next/link";
import LocalFont from "next/font/local";
import type { Metadata } from "next";
import { NavBreadcrumb } from '@/components/nav';
import { AddRecordContextProvider } from '@/context/add-record';
import "./globals.css";

const poppinsRegular = LocalFont({
  src: "./fonts/Poppins-Regular.ttf",
  variable: "--font-poppins",
  weight: "400",
});

const poppinsSemiBold = LocalFont({
  src: "./fonts/Poppins-SemiBold.ttf",
  variable: "--font-poppins-semi-bold",
  weight: "600",
});

export const metadata: Metadata = {
  title: "SQURL Viewer",
  description: "A lightweight viewer for your PostgreSQL database",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={`${poppinsRegular.variable} ${poppinsSemiBold.variable}`}
      >
        <nav>
          <div>
            <Image alt="logo" src="/images/logo.png" width={96} height={96} />
            <ol>
              <li>
                <Link href="/">Tables</Link>
              </li>
              <NavBreadcrumb />
            </ol>
          </div>
        </nav>
        <AddRecordContextProvider>
          <main>{children}</main>
        </AddRecordContextProvider>
      </body>
    </html>
  );
}
