"use client";

import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const FeaturedProducts = () => {
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

    return (
        <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header (No animation) */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                        Featured Products
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Discover our most popular products loved by thousands of users.
                    </p>
                </div>

                {/* Product Grid - The parent motion.div manages the staggered animation */}
                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible" // Triggers the animation for the container and its children
                    viewport={{ once: true, amount: 0.5 }} // Triggers when 50% of the grid is visible
                >
                    {[1, 2, 3].map((item) => (
                        <motion.div
                            key={item}
                            className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow hover:shadow-lg dark:hover:shadow-xl transition-all duration-300"
                            variants={cardVariants} // Applies the child animation variants
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {/* Fake image placeholder */}
                            <div className="h-48 bg-gradient-to-r from-blue-200 to-blue-50 dark:from-blue-800 dark:to-blue-950"></div>

                            <div className="p-6">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Premium Product {item}</h3>
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                            />
                                        ))}
                                    </div>
                                </div>

                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    A revolutionary solution that transforms how you work with products.
                                </p>

                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-gray-900 dark:text-white">$99</span>
                                    <Link
                                        href={`/products/${item}`}
                                        className="px-4 py-2 text-sm rounded-md border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* View All (No animation) */}
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