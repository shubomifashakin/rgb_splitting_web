import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { Toaster } from "@/components/ui/toaster";

import AuthProvider from "@/components/Providers/AuthProvider";
import ThemeProvider from "@/components/Providers/ThemeProvider";
import ModalProvider from "@/components/Providers/ModalProvider";
import QueryProvider from "@/components/Providers/QueryClientProvider";

const InterFont = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "RGBreak",
  description: "Image processing simplified for developers and creators.",
  authors: [
    { name: "Olashubomi Fashakin", url: "https://github.com/shubomifashakin" },
  ],
  keywords: ["rgb", "image processing", "rgb channels", "grain effects"],
  openGraph: {
    title: "RGBreak",
    description: "Image processing simplified for developers and creators.",
    authors: ["Olashubomi Fashakin"],
    // images TODO: Add images
  },
  twitter: {
    title: "RGBreak",
    description: "Image processing simplified for developers and creators.",
    card: "summary_large_image",
    // images TODO: Add images
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <QueryProvider>
        <ThemeProvider>
          <ModalProvider>
            <html lang="en">
              <head>
                {/* <script
                crossOrigin="anonymous"
                src="//unpkg.com/react-scan/dist/auto.global.js"
              ></script> */}
              </head>
              <body className={`${InterFont.className} antialiased`}>
                {children}
                <Toaster />
              </body>
            </html>
          </ModalProvider>
        </ThemeProvider>
      </QueryProvider>
    </AuthProvider>
  );
}
