"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, when: "beforeChildren" } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export default function FooterSection() {
    return (
        <motion.footer
            className="bg-blue-600 text-white py-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <div className="lg:container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8">
                    <motion.div variants={itemVariants}>
                        <h3 className="font-bold text-lg mb-4">ProductHub</h3>
                        <p className="text-blue-200">
                            The modern way to build and manage products.
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <h4 className="font-semibold mb-4">Product</h4>
                        <ul className="space-y-2 text-blue-200">
                            <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
                            <li><Link href="/login" className="hover:text-white transition-colors">Dashboard</Link></li>
                        </ul>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-blue-200">
                            <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                            <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                        </ul>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <h4 className="font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-blue-200">
                            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                        </ul>
                    </motion.div>
                </div>

                <motion.div
                    className="border-t border-blue-400 mt-8 pt-8 text-center text-blue-200"
                    variants={itemVariants}
                >
                    <p>&copy; 2024 ProductHub. All rights reserved.</p>
                </motion.div>
            </div>
        </motion.footer>
    );
}
