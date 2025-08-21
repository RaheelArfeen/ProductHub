"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Users } from "lucide-react";

const FeaturesSection = () => {
    const features = [
        { icon: <Zap className="h-8 w-8" />, title: "Lightning Fast", description: "Build and manage products with incredible speed and efficiency." },
        { icon: <Shield className="h-8 w-8" />, title: "Secure & Reliable", description: "Enterprise-grade security with 99.9% uptime guarantee." },
        { icon: <Users className="h-8 w-8" />, title: "Team Collaboration", description: "Work seamlessly with your team in real-time collaboration." }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                when: "beforeChildren"
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl font-bold mb-4"
                    >
                        Why Choose ProductHub?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
                    >
                        Everything you need to build, manage, and scale your products in one powerful platform.
                    </motion.p>
                </div>

                <motion.div
                    className="grid md:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300"
                            variants={itemVariants}
                        >
                            <div className="text-center">
                                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            </div>
                            <div>
                                <p className="text-center text-gray-500 dark:text-gray-400">{feature.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturesSection;
