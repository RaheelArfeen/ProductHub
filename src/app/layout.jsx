import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/Components/Navbar";
import FooterSection from "@/Components/Footer";
import ProvidersWrapper from "@/app/ProviderWrapper";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
        <title>ProductHub</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ProvidersWrapper>
          <div className="flex flex-col justify-between min-h-screen bg-white dark:bg-gray-900">
            <Navbar />
            <main>{children}</main>
            <FooterSection />
          </div>
          <Toaster />
        </ProvidersWrapper>
      </body>
    </html>
  );
}
