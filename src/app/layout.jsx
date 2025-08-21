"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/Components/Navbar";
import FooterSection from "@/Components/Footer";
import { Toaster } from "sonner";
import AuthWrapper from "@/app/AuthWrapper"; // client wrapper
import { SessionProvider } from "next-auth/react";

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
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <SessionProvider>
                    <AuthWrapper>
                        <div className="flex flex-col justify-between min-h-screen">
                            <Navbar />
                            <main>{children}</main>
                            <FooterSection />
                        </div>
                        <Toaster />
                    </AuthWrapper>
                </SessionProvider>
            </body>
        </html>
    );
}
