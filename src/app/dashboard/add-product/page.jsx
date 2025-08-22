"use client";

import { useAuth } from "@/Contexts/AuthContext";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Page = () => {
    const { user } = useAuth();
    const router = useRouter();

    // Dropdown state logic
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    // Form and Preview state
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [features, setFeatures] = useState(['']);
    const [inStock, setInStock] = useState(true);
    const [productImage, setProductImage] = useState('');

    const categories = ['Analytics', 'Automation', 'CRM', 'AI Tools', 'Storage', 'Management'];

    const handleSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        console.log("Selected category:", option);
    };

    const handleFeatureChange = (index, event) => {
        const newFeatures = [...features];
        newFeatures[index] = event.target.value;
        setFeatures(newFeatures);
    };

    const handleAddFeature = () => {
        setFeatures([...features, '']);
    };

    const handleRemoveFeature = (index) => {
        const newFeatures = features.filter((_, i) => i !== index);
        setFeatures(newFeatures);
    };

    const handleAddProduct = async () => {
        try {
            const res = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    productName,
                    description,
                    price,
                    category: selectedOption,
                    features,
                    inStock,
                    productImage
                })
            });

            if (!res.ok) throw new Error("Failed to add product");

            const data = await res.json();
            toast.success("Product added successfully!");
            router.push("/products");
        } catch (err) {
            console.error(err);
            toast.error("Failed to add product");
        }
    };

    // New function to truncate the description for the preview
    const truncateDescription = (text, wordLimit) => {
        if (!text) return '';
        const words = text.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return text;
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="lg:container mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-colors duration-500 min-h-screen"
            >
                <motion.div
                    initial="hidden"
                    animate="visible"
                    transition={{ staggerChildren: 0.1 }}
                    className="mb-8"
                >
                    <motion.h1
                        variants={itemVariants}
                        className="text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100 transition-colors duration-500"
                    >
                        Dashboard
                    </motion.h1>
                    <motion.p
                        variants={itemVariants}
                        className="text-2xl text-gray-700 font-medium dark:text-gray-300 transition-colors duration-500"
                    >
                        Welcome back, {user?.fullName || "Guest"}! Add new products to your catalog.
                    </motion.p>
                </motion.div>

                <div className="grid lg:grid-cols-3 grid-cols-1 gap-12">
                    {/* Input Section */}
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="p-4 space-y-4 lg:col-span-2 shadow-lg rounded-xl bg-white dark:bg-gray-800 transition-colors duration-500"
                    >
                        <div className="p-4 rounded-lg bg-blue-50 dark:bg-gray-700 transition-colors duration-500">
                            <h3 className="text-2xl font-semibold leading-none tracking-tight flex items-center gap-2 text-blue-800 dark:text-blue-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package h-5 w-5 text-blue-600 dark:text-blue-500"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path><path d="M12 22V12"></path><path d="m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7"></path><path d="m7.5 4.27 9 5.15"></path></svg>
                                Add New Product
                            </h3>
                            <span className="text-gray-600 font-medium dark:text-gray-400">Create a new product to add to your catalog. Fill in all the details below.</span>
                        </div>
                        <div className="p-4">
                            <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                                <label className="w-full">
                                    <p className="font-bold mb-1 text-blue-800 dark:text-blue-300">Product Name *</p>
                                    <input
                                        type="text"
                                        className="border border-blue-200 rounded-md py-2 px-3 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter product name"
                                        value={productName}
                                        onChange={(e) => setProductName(e.target.value)}
                                    />
                                </label>
                                <label className="w-full">
                                    <p className="font-bold mb-1 text-blue-800 dark:text-blue-300">Price (USD) *</p>
                                    <input
                                        type="text"
                                        className="border border-blue-200 rounded-md py-2 px-3 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="99"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </label>
                            </div>
                            <div className="mt-4">
                                <label>
                                    <p className="font-bold mb-1 text-blue-800 dark:text-blue-300">Category *</p>
                                </label>
                                <div className="relative w-full">
                                    <button
                                        type="button"
                                        onClick={() => setIsOpen(!isOpen)}
                                        className="w-full text-left p-3 border border-blue-200 rounded-md shadow-sm bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {selectedOption || 'Select a category'}
                                    </button>
                                    {isOpen && (
                                        <ul className="absolute z-10 w-full mt-1 bg-white border border-blue-200 rounded-md shadow-lg max-h-60 overflow-auto dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                            {categories.map((option) => (
                                                <li
                                                    key={option}
                                                    onClick={() => handleSelect(option)}
                                                    className={`p-3 cursor-pointer ${selectedOption === option ? 'bg-blue-600 text-white dark:bg-blue-800' : 'hover:bg-blue-100 dark:hover:bg-blue-600 dark:hover:text-white'
                                                        }`}
                                                >
                                                    {option}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="w-full">
                                    <p className="font-bold mb-1 text-blue-800 dark:text-blue-300">Description *</p>
                                    <textarea
                                        className="border border-blue-200 rounded-md py-2 px-3 w-full h-32 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Describe your product in detail..."
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                </label>
                            </div>

                            {/* Product Image Link Input */}
                            <div className="mt-4">
                                <label className="w-full">
                                    <p className="font-bold mb-1 text-blue-800 dark:text-blue-300">Product Image</p>
                                    <input
                                        type="text"
                                        className="border border-blue-200 rounded-md py-2 px-3 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="https://example.com/product-image.jpg"
                                        value={productImage}
                                        onChange={(e) => setProductImage(e.target.value)}
                                    />
                                    <span className="text-gray-500 text-sm font-medium dark:text-gray-400">Enter a URL for your product image (optional)</span>
                                </label>
                            </div>

                            {/* Features Section */}
                            <div className="mt-4">
                                <div className="flex items-center justify-between mb-3">
                                    <p className="font-bold text-lg text-blue-800 dark:text-blue-300">Features *</p>
                                    <button
                                        onClick={handleAddFeature}
                                        className="flex items-center gap-1 text-blue-700 font-semibold border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors dark:text-blue-400 dark:border-blue-500 dark:hover:bg-blue-900"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus h-5 w-5"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
                                        Add Feature
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    <AnimatePresence>
                                        {features.map((feature, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ scale: 0.9, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0.9, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="flex items-center gap-2"
                                            >
                                                <input
                                                    type="text"
                                                    className="border border-blue-200 rounded-md py-2 px-3 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder={`Feature ${index + 1}`}
                                                    value={feature}
                                                    onChange={(e) => handleFeatureChange(index, e)}
                                                />
                                                {features.length > 1 && (
                                                    <motion.button
                                                        onClick={() => handleRemoveFeature(index)}
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        className="text-gray-500 hover:text-red-500 transition-colors dark:text-gray-400 dark:hover:text-red-400"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x h-5 w-5"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                                                    </motion.button>
                                                )}
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* In Stock Toggle */}
                            <div className="mt-4 flex items-center gap-2">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" checked={inStock} onChange={() => setInStock(!inStock)} />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                                <p className="font-bold text-lg text-blue-800 dark:text-blue-300">In Stock</p>
                            </div>

                            {/* Add Product Button */}
                            <div className="mt-8">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleAddProduct}
                                    className="flex items-center justify-center w-full px-4 py-3 rounded-lg text-white font-bold text-lg bg-gradient-to-r from-blue-500 to-blue-800 dark:from-blue-700 dark:to-blue-900 transition-all hover:opacity-90"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus h-5 w-5 mr-2"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
                                    Add Product
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Preview Section */}
                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-10 lg:mt-4 lg:col-span-1"
                    >
                        <h2 className="text-2xl font-bold mb-2 text-blue-800 dark:text-blue-300">Preview</h2>
                        <p className="text-gray-600 font-medium mb-4 dark:text-gray-400">How your product will appear to customers</p>
                        <div className="bg-white border border-blue-200 rounded-xl p-6 shadow-md dark:bg-gray-800 dark:border-gray-700 transition-colors duration-500">
                            {/* Image Preview with bluish background */}
                            {productImage ? (
                                <motion.div
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="mb-4 bg-blue-100 rounded-md p-4 flex items-center justify-center dark:bg-blue-900"
                                >
                                    <img src={productImage} alt="Product Preview" className="w-full h-auto rounded-md object-cover" />
                                </motion.div>
                            ) : (
                                <div className="mb-4 bg-blue-100 rounded-md h-32 flex items-center justify-center text-blue-400 dark:bg-blue-900 dark:text-blue-300">
                                    <span className="font-medium">Product Image Placeholder</span>
                                </div>
                            )}
                            {/* Reordered tags to show category first */}
                            <div className="flex items-center gap-2 mb-2">
                                {selectedOption && (
                                    <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-blue-200 text-blue-800 dark:bg-blue-700 dark:text-blue-300">
                                        {selectedOption}
                                    </span>
                                )}
                                <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${inStock ? 'bg-blue-600 text-white dark:bg-blue-500' : 'bg-gray-400 text-white dark:bg-gray-500'}`}>
                                    {inStock ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-gray-100">{productName || 'Product Name'}</h3>
                            <p className="text-gray-700 text-sm mb-2 dark:text-gray-300">{truncateDescription(description, 50) || 'Product description will appear here...'}</p>
                            <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">${price || '0'}<span className="text-sm text-gray-500 dark:text-gray-400">/month</span></p>
                        </div>
                        {/* Tips for Success Section */}
                        <div className="p-6 mt-8 rounded-xl bg-blue-50 border border-blue-200 dark:bg-gray-800 dark:border-gray-700 transition-colors duration-500">
                            <h3 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2 dark:text-blue-300">
                                Tips for Success
                            </h3>
                            <ul className="list-disc list-inside space-y-2 text-blue-700 font-medium dark:text-blue-400">
                                <li>Use clear, descriptive product names</li>
                                <li>Write detailed descriptions highlighting benefits</li>
                                <li>List key features that solve customer problems</li>
                                <li>Set competitive pricing for your market</li>
                                <li>Keep product information up to date</li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Page;