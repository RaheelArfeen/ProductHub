"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/Components/Loader";
import Link from "next/link";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { toast } from "sonner"; // <-- import toast

// Fetch single product by ID
const fetchProductById = async (id) => {
    const res = await fetch(`/api/products/${id}`);
    if (!res.ok) {
        throw new Error("Failed to fetch product");
    }
    return res.json();
};

export default function ProductDetailPage({ params }) {
    const { id } = params;
    const router = useRouter();

    const {
        data: product,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["product", id],
        queryFn: () => fetchProductById(id),
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                <Loader />
            </div>
        );
    }

    if (isError || !product) {
        return (
            <div className="min-h-screen flex items-center justify-center text-center text-red-500 bg-gray-100 dark:bg-gray-900">
                <p>Failed to load product. Please try again later.</p>
                <Link href="/products" className="text-blue-600 dark:text-blue-400 underline ml-2">
                    Go Back
                </Link>
            </div>
        );
    }

    // Handle Purchase Click
    const handlePurchase = () => {
        toast.success("Purchase successful!");
        setTimeout(() => {
            router.push("/products");
        }, 1500); // redirect after 1.5s
    };

    return (
        <div className="lg:container mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white dark:bg-gray-900 min-h-screen">
            {/* Back Link */}
            <Link
                href="/products"
                className="text-blue-600 dark:text-blue-400 mb-6 flex items-center gap-2"
            >
                <ArrowLeft size={20} /> Back to Products
            </Link>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center h-96">
                    {product.productImage ? (
                        <img
                            src={product.productImage}
                            alt={product.productName}
                            className="object-cover w-full h-full"
                        />
                    ) : (
                        <span className="text-gray-400 dark:text-gray-300 font-medium">
                            No Image
                        </span>
                    )}
                </div>

                {/* Product Info */}
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                            {product.productName}
                        </h1>

                        {/* Badges */}
                        <div className="flex items-center gap-2 mb-4">
                            <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-blue-200 text-blue-800 dark:bg-blue-700 dark:text-blue-300">
                                {product.category}
                            </span>
                            {!product.inStock && (
                                <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-gray-400 text-white dark:bg-gray-500">
                                    Out of Stock
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            {product.description}
                        </p>

                        {/* Price */}
                        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                            ${product.price} <span className="text-sm text-gray-500 dark:text-gray-400">/month</span>
                        </div>
                    </div>

                    {/* Action Button */}
                    <div>
                        <button
                            className={`px-6 py-3 rounded-md font-semibold transition-colors duration-300 w-full flex items-center gap-3 justify-center ${product.inStock
                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                }`}
                            disabled={!product.inStock}
                            onClick={handlePurchase}
                        >
                            <ShoppingCart size={20} /> {product.inStock ? "Purchase Now" : "Unavailable"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
