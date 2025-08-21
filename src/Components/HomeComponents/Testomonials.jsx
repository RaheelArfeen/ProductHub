"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Product Manager",
        company: "TechCorp",
        content: "ProductHub transformed how we manage our product lifecycle. Incredible tool!",
        rating: 5
    },
    {
        name: "Mike Chen",
        role: "Startup Founder",
        company: "InnovateLab",
        content: "The easiest product management platform I've ever used. Highly recommended!",
        rating: 5
    },
    {
        name: "Emily Davis",
        role: "UX Designer",
        company: "CreativeWorks",
        content: "The interface is intuitive and really boosts team collaboration. Love it!",
        rating: 4
    },
    {
        name: "James Wilson",
        role: "Software Engineer",
        company: "NextGen Solutions",
        content: "Seamless integration with our existing tools and super fast performance.",
        rating: 5
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, when: "beforeChildren" } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
};

export default function TestimonialsSection() {
    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <div className="lg:container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl font-bold mb-4"
                    >
                        What Our Users Say
                    </motion.h2>
                </div>

                <motion.div
                    className="grid md:grid-cols-4 gap-8 mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                            variants={itemVariants}
                        >
                            <div className="flex mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">"{testimonial.content}"</p>
                            <div>
                                <p className="font-semibold text-gray-800 dark:text-gray-100">{testimonial.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {testimonial.role} at {testimonial.company}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
