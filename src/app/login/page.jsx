"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Loader2, Package } from "lucide-react";

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);

    // Google login with NextAuth
    const handleGoogleLogin = async () => {
        setIsLoading(true);
        try {
            await signIn("google", { callbackUrl: "/products" });
        } catch {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-300 px-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl dark:shadow-xl p-8 sm:p-10 flex flex-col border border-gray-200 dark:border-gray-700">
                {/* Logo & Header */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center space-x-2 mb-3">
                        <Package className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                        <span className="font-extrabold text-3xl text-blue-700 dark:text-blue-500">
                            ProductHub
                        </span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                        Welcome Back!
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Sign in with Google to continue
                    </p>
                </div>

                {/* Google Login */}
                <button
                    type="button"
                    className="w-full flex justify-center items-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 py-3 rounded-xl font-semibold text-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition disabled:opacity-50"
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <Loader2 className="animate-spin h-5 w-5" />
                    ) : (
                        <svg
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC04"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                    )}
                    <span>Sign in with Google</span>
                </button>
            </div>
        </div>
    );
}
