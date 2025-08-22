"use client";

import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import AuthWrapper from "./AuthWrapper";
import Loader from "@/Components/Loader";

export default function ProvidersWrapper({ children }) {
    const [loading, setLoading] = useState(true);
    const [queryClient] = useState(() => new QueryClient());

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    if (loading) return <Loader />;

    return (
        <SessionProvider>
            <QueryClientProvider client={queryClient}>
                <AuthWrapper>{children}</AuthWrapper>
            </QueryClientProvider>
        </SessionProvider>
    );
}
