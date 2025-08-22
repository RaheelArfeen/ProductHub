'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';

// Custom components
const Badge = ({ variant, children, className, ...props }) => {
    const baseClasses = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
    const variants = {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    };
    return (
        <div className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
            {children}
        </div>
    );
};

const Card = ({ children, className, ...props }) => {
    return (
        <div className={`rounded-xl border bg-card text-card-foreground shadow ${className}`} {...props}>
            {children}
        </div>
    );
};

const CardHeader = ({ children, className, ...props }) => (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
        {children}
    </div>
);

const CardTitle = ({ children, className, ...props }) => (
    <h3 className={`font-semibold leading-none tracking-tight ${className}`} {...props}>
        {children}
    </h3>
);

const CardContent = ({ children, className, ...props }) => (
    <div className={`p-6 pt-0 ${className}`} {...props}>
        {children}
    </div>
);

const Page = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    const blogPosts = [
        {
            id: 1,
            title: "10 Essential Tips for Product Photography",
            excerpt: "Learn how to capture stunning product photos that convert browsers into buyers with these professional photography techniques.",
            author: "Sarah Johnson",
            date: "Dec 15, 2024",
            readTime: "5 min read",
            category: "Photography",
            image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=400&fit=crop"
        },
        {
            id: 2,
            title: "The Future of E-commerce Product Management",
            excerpt: "Discover the latest trends and technologies shaping the future of how we manage and showcase products online.",
            author: "Mike Chen",
            date: "Dec 12, 2024",
            readTime: "8 min read",
            category: "Technology",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop"
        },
        {
            id: 3,
            title: "Building Trust Through Product Transparency",
            excerpt: "Why being transparent about your products builds customer trust and how to implement transparency in your product listings.",
            author: "Emily Davis",
            date: "Dec 10, 2024",
            readTime: "6 min read",
            category: "Business",
            image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=400&fit=crop"
        },
        {
            id: 4,
            title: "Optimizing Product Descriptions for SEO",
            excerpt: "Master the art of writing product descriptions that rank well in search engines while engaging your customers.",
            author: "David Rodriguez",
            date: "Dec 8, 2024",
            readTime: "7 min read",
            category: "SEO",
            image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=400&fit=crop"
        },
        {
            id: 5,
            title: "Mobile-First Product Showcase Design",
            excerpt: "Best practices for designing product showcases that look amazing and function perfectly on mobile devices.",
            author: "Lisa Wang",
            date: "Dec 5, 2024",
            readTime: "5 min read",
            category: "Design",
            image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop"
        },
        {
            id: 6,
            title: "Analytics That Matter for Product Managers",
            excerpt: "Learn which metrics actually drive business results and how to track them effectively for your product portfolio.",
            author: "Tom Anderson",
            date: "Dec 3, 2024",
            readTime: "9 min read",
            category: "Analytics",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop"
        },
        {
            id: 7,
            title: "Customer-Centric Product Development",
            excerpt: "Focusing on customer needs is key to building successful products. Here's how to integrate their feedback into your development cycle.",
            author: "Jessica Lee",
            date: "Nov 28, 2024",
            readTime: "6 min read",
            category: "Business",
            image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=400&fit=crop"
        },
        {
            id: 8,
            title: "The Role of AI in Product Innovation",
            excerpt: "Explore how artificial intelligence is revolutionizing product development and creating new opportunities for innovation.",
            author: "Alex Kim",
            date: "Nov 25, 2024",
            readTime: "10 min read",
            category: "Technology",
            image: "https://imageio.forbes.com/specials-images/imageserve/67ba0219013eb40598a71966/AI-is-driving-a-fundamental-shift-in-how-innovation-happens-/960x0.jpg?format=jpg&width=960"
        },
        {
            id: 9,
            title: "Pricing Strategies for SaaS Products",
            excerpt: "A deep dive into different pricing models for Software-as-a-Service, and how to choose the right one for your business.",
            author: "Ben Carter",
            date: "Nov 22, 2024",
            readTime: "7 min read",
            category: "Business",
            image: "https://cdn.prod.website-files.com/6360dc4d3abe634a7570bbf9/64dcb98fbd89c3a87a06affe_saas%20pricing%20models%20strategies.png"
        }
    ];

    const categories = ["All", "Photography", "Technology", "Business", "SEO", "Design", "Analytics"];

    const categoryColors = {
        "Photography": "bg-pink-600 text-white dark:bg-pink-500",
        "Technology": "bg-green-600 text-white dark:bg-green-500",
        "Business": "bg-purple-600 text-white dark:bg-purple-500",
        "SEO": "bg-orange-600 text-white dark:bg-orange-500",
        "Design": "bg-yellow-600 text-white dark:bg-yellow-500",
        "Analytics": "bg-blue-600 text-white dark:bg-blue-500",
        "All": "bg-blue-600 text-white dark:bg-blue-500",
    };

    const filteredPosts = activeCategory === 'All'
        ? blogPosts
        : blogPosts.filter(post => post.category === activeCategory);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 font-sans transition-colors duration-300">
            <main className="lg:container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <Badge variant="secondary" className="mb-4 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                        ProductHub Blog
                    </Badge>
                    <motion.h1
                        className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Insights & Inspiration
                    </motion.h1>
                    <motion.p
                        className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Stay updated with the latest trends, tips, and best practices in product management and e-commerce.
                    </motion.p>
                </div>

                {/* Categories */}
                <motion.div
                    className="flex flex-wrap gap-2 justify-center mb-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    {categories.map((category) => (
                        <Badge
                            key={category}
                            variant={category === activeCategory ? "default" : "secondary"}
                            className={`cursor-pointer transition-colors duration-200 
                ${category === activeCategory
                                    ? categoryColors[category]
                                    : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                                }`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </Badge>
                    ))}
                </motion.div>

                {/* Blog Posts Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="wait">
                        {filteredPosts.map((post) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card className="overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-shadow duration-300 group cursor-pointer">
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <Badge className={`absolute top-4 left-4 ${categoryColors[post.category]}`}>
                                            {post.category}
                                        </Badge>
                                    </div>
                                    <CardHeader>
                                        <CardTitle className="text-xl group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors">
                                            {post.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-1">
                                                    <User className="h-3 w-3" />
                                                    {post.author}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    {post.date}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {post.readTime}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Newsletter Signup */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <Card className="mt-16 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-400/10 dark:to-purple-400/10 border border-blue-600/20 dark:border-blue-400/20 text-center">
                        <CardHeader>
                            <CardTitle className="text-2xl text-blue-600 dark:text-blue-400">Stay in the Loop</CardTitle>
                            <p className="text-gray-500 dark:text-gray-400">
                                Subscribe to our newsletter for the latest product management insights and updates.
                            </p>
                        </CardHeader>
                        <CardContent>
                            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    type="submit"
                                    className="px-6 py-2 rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-200"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            </main>
        </div>
    );
};

export default Page;