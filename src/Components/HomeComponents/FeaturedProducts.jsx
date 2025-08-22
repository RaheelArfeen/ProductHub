// components/FeaturedProducts.jsx
"use client";

import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/Components/Loader";

// Helper function to truncate text by word count
const truncateText = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length > maxWords) {
        return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
};

// Define a new fetch function for featured products
const fetchFeaturedProducts = async () => {
    const res = await fetch("/api/products");
    if (!res.ok) {
        throw new Error("Failed to fetch featured products");
    }
    return res.json();
};

const FeaturedProducts = () => {
    // Fetch featured products using TanStack Query
    const {
        data: featuredProducts,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["featuredProducts"],
        queryFn: fetchFeaturedProducts,
    });

    // Animation variants for the container (manages the stagger)
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3, // Delay between each child's animation
            },
        },
    };

    // Animation variants for individual cards
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    // Handle loading and error states
    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Loader />
            </div>
        );
    }

    if (isError || !featuredProducts) {
        return (
            <div className="text-center py-20 text-red-500">
                Failed to load featured products.
            </div>
        );
    }

    return (
        <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
            <div className="lg:container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                        Featured Products
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Discover our most popular products loved by thousands of users.
                    </p>
                </div>

                {/* Product Grid */}
                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                >
                    {featuredProducts.slice(0, 3).map((product) => (
                        <motion.div
                            key={product._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full"
                        >
                            {/* Product Image */}
                            <div className="h-64 bg-blue-100 dark:bg-blue-900 relative overflow-hidden flex items-center justify-center">
                                {product.productImage ? (
                                    <img
                                        src={product.productImage}
                                        alt={product.productName}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-blue-400 dark:text-blue-300 font-medium">
                                        No Image
                                    </span>
                                )}
                            </div>

                            {/* Card Content */}
                            <div className="p-6 flex flex-col flex-1 justify-between">
                                {/* Top Section: badges + title + description */}
                                <div>
                                    {/* Badges */}
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-blue-200 text-blue-800 dark:bg-blue-700 dark:text-blue-300">
                                            {product.category}
                                        </span>
                                        {!product.inStock && (
                                            <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-gray-400 text-white dark:bg-gray-500">
                                                Out of Stock
                                            </span>
                                        )}
                                    </div>

                                    {/* Title and Description */}
                                    <h2 className="text-xl font-bold line-clamp-2 mb-2 text-gray-900 dark:text-gray-100">
                                        {product.productName}
                                    </h2>
                                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                                        {truncateText(product.description, 20)}
                                    </p>
                                </div>

                                {/* Bottom Section: price + button */}
                                <div className="flex items-center justify-between mt-auto">
                                    <div>
                                        <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                            ${product.price}
                                        </span>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            /month
                                        </span>
                                    </div>
                                    <Link href={`/products/${product._id}`}>
                                        <button
                                            className={`px-4 py-2 rounded-md font-semibold transition-colors duration-300 ${product.inStock
                                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                                : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                                }`}
                                            disabled={!product.inStock}
                                        >
                                            {product.inStock ? "View Details" : "Unavailable"}
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* View All */}
                <div className="text-center mt-12">
                    <Link
                        href="/products"
                        className="inline-flex items-center px-6 py-3 text-lg rounded-md border border-gray-300 dark:border-gray-600 hover:bg-blue-500 hover:text-white text-gray-700 dark:text-gray-300 transition-colors"
                    >
                        View All Products
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;