import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";

import { Toaster } from "@/components/ui/toaster";
import ThemeProvider from "@/components/Providers/ThemeProvider";

import "./globals.css";
import QueryProvider from "@/components/Providers/QueryClientProvider";

const InterFont = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "RGB Split",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <QueryProvider>
        <ThemeProvider>
          <html lang="en">
            <body className={`${InterFont.className} antialiased`}>
              {children}
              <Toaster />
            </body>
          </html>
        </ThemeProvider>
      </QueryProvider>
    </ClerkProvider>
  );
}
