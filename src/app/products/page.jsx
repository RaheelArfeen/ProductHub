// app/products/page.js
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "@/Components/Loader";
import { Search, Filter, ChevronDown } from "lucide-react";

// Define your static categories here
const categories = ['All Categories', 'Analytics', 'Automation', 'CRM', 'AI Tools', 'Storage', 'Management'];

// Helper function to truncate text by word count
const truncateText = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length > maxWords) {
        return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
};

const fetchProducts = async () => {
    const res = await fetch("/api/products");
    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }
    return res.json();
};

export default function page() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Fetch products using TanStack Query
    const {
        data: products,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts,
    });

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                <Loader />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center text-center text-red-500 bg-gray-100 dark:bg-gray-900">
                <p>Failed to load products. Please try again later.</p>
            </div>
        );
    }

    // Filtering Logic
    const filteredProducts = products.filter((product) => {
        const matchesSearch =
            product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
            selectedCategory === "All Categories" || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="lg:container mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-500 min-h-screen bg-white dark:bg-gray-900">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                    Our Products
                </h1>
                <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                    Discover our comprehensive suite of business tools designed to help
                    you grow and succeed.
                </p>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                    />
                </div>
                {/* Custom Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-gray-400" />
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-48 px-4 py-2 border rounded-md shadow-sm flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                        >
                            <span>{selectedCategory}</span>
                            <ChevronDown className={`h-4 w-4 transform transition-transform ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
                        </button>
                    </div>
                    {isDropdownOpen && (
                        <div className="absolute z-10 max-w-48 w-full mt-1 ml-6 bg-white dark:bg-gray-800 dark:text-gray-100 border dark:border-gray-700 rounded-md shadow-lg overflow-hidden">
                            {categories.map((category) => (
                                <div
                                    key={category}
                                    onClick={() => {
                                        setSelectedCategory(category);
                                        setIsDropdownOpen(false);
                                    }}
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    {category}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 flex-1">
                <AnimatePresence>
                    {filteredProducts.map((product) => (
                        <motion.div
                            key={product._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full"
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
                </AnimatePresence>
            </div>

            {/* No Products Found State */}
            {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                    <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                        No products found
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                        Try adjusting your search criteria or browse all products.
                    </p>
                    <button
                        onClick={() => {
                            setSearchQuery("");
                            setSelectedCategory("All Categories");
                        }}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
                    >
                        Clear Filters
                    </button>
                </div>
            )}
        </div>
    );
}