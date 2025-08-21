"use client";

import { AuthProvider } from "@/Contexts/AuthContext";

export default function AuthWrapper({ children }) {
    return <AuthProvider>{children}</AuthProvider>;
}
