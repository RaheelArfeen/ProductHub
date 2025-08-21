"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Banner = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image & Overlay */}
            <div className="absolute inset-0">
                <Image
                    src={heroImage}
                    alt="Hero background"
                    className="w-full h-full object-cover opacity-20"
                    fill
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-800/50 via-purple-400/50 to-purple-800/50"></div>
            </div>

            {/* Banner Content */}
            <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                    Build Amazing{" "}
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                        Products
                    </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                    The all-in-one platform for modern product management. Create, collaborate, and scale your products with ease.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/products"
                        className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
                    >
                        Explore Products <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>

                    <Link
                        href="/login"
                        className="inline-flex items-center justify-center px-6 py-3 border border-white/50 text-white font-semibold rounded-lg hover:bg-white/10 transition"
                    >
                        Get Started Free
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Banner;
