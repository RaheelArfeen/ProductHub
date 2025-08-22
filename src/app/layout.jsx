"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/Components/Navbar";
import FooterSection from "@/Components/Footer";
import { Toaster } from "sonner";
import AuthWrapper from "@/app/AuthWrapper"; // client wrapper
import { SessionProvider } from "next-auth/react";
import { useState, useEffect } from "react";
import Loader from "@/Components/Loader"; // import loader
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function RootLayout({ children }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // simulate loading (e.g., fetching session or data)
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const [queryClient] = useState(() => new QueryClient());

    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <SessionProvider>
                    <QueryClientProvider client={queryClient}>
                        <AuthWrapper>
                            {loading ? (
                                <Loader /> // show loader
                            ) : (
                                <div className="flex flex-col justify-between min-h-screen bg-white dark:bg-gray-900">
                                    <Navbar />
                                    <main>{children}</main>
                                    <FooterSection />
                                </div>
                            )}
                            <Toaster />
                        </AuthWrapper>
                    </QueryClientProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
