"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Package, LogOut, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/Contexts/AuthContext";

const Navbar = () => {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);

    const { user, logout } = useAuth();

    const isActive = (path) => pathname === path;

    const links = [
        { path: "/", label: "Home" },
        { path: "/products", label: "Products" },
        { path: "/about", label: "About" },
        { path: "/contact", label: "Contact" },
        { path: "/blog", label: "Blog" },
        ...(user ? [{ path: "/dashboard/add-product", label: "Dashboard" }] : []),
    ];

    // Load theme from localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem("nexttheme");
        if (savedTheme === "dark") {
            setDarkMode(true);
            document.documentElement.classList.add("dark");
        } else {
            setDarkMode(false);
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = !darkMode;
        setDarkMode(newTheme);
        if (newTheme) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("nexttheme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("nexttheme", "light");
        }
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setMobileMenuOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const dropdownVariants = {
        hidden: { opacity: 0, y: -10, transition: { duration: 0.2 } },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
        exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
    };

    const linkHoverVariants = {
        hover: { scale: 1.05, transition: { duration: 0.2 } },
    };

    return (
        <nav className="border-b border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900 backdrop-blur sticky top-0 z-50 shadow-md transition-colors duration-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <Package className="h-8 w-8 text-blue-600 dark:text-blue-400 transition-colors duration-300" />
                        <span className="font-bold text-xl text-gray-900 dark:text-white transition-colors duration-300">ProductHub</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-10">
                        {links.map((link) => (
                            <motion.div key={link.path} whileHover="hover" variants={linkHoverVariants}>
                                <Link
                                    href={link.path}
                                    className={`font-medium transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400 ${isActive(link.path) ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-300"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right side items */}
                    <div className="flex items-center space-x-4">
                        {/* Theme Toggle Button */}
                        <motion.button
                            onClick={toggleTheme}
                            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <AnimatePresence mode="wait">
                                {darkMode ? (
                                    <motion.div
                                        key="sun"
                                        initial={{ opacity: 0, rotate: -90 }}
                                        animate={{ opacity: 1, rotate: 0 }}
                                        exit={{ opacity: 0, rotate: -90 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Sun className="h-5 w-5 text-yellow-400" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="moon"
                                        initial={{ opacity: 0, rotate: 90 }}
                                        animate={{ opacity: 1, rotate: 0 }}
                                        exit={{ opacity: 0, rotate: 90 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Moon className="h-5 w-5 text-gray-900 dark:text-white" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>

                        {/* User Menu / Auth Buttons */}
                        {user ? (
                            <div className="relative hidden md:block">
                                <motion.button
                                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                                    className="flex items-center justify-center p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 overflow-hidden"
                                    whileTap={{ scale: 0.9 }}
                                >
                                    {user.image ? (
                                        <img
                                            src={user.image}
                                            alt={user.fullName || "User"}
                                            className="h-6 w-6 rounded-full object-cover"
                                        />
                                    ) : (
                                        <span className="h-6 w-6 flex items-center justify-center bg-blue-500 text-white font-semibold rounded-full">
                                            {user.fullName?.charAt(0).toUpperCase() || "U"}
                                        </span>
                                    )}
                                </motion.button>

                                <AnimatePresence>
                                    {userDropdownOpen && (
                                        <motion.div
                                            variants={dropdownVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg py-2 transition-colors duration-300"
                                        >
                                            <div className="flex items-center justify-start gap-2 p-2">
                                                <div className="flex flex-col space-y-1 leading-none">
                                                    <p className="font-medium text-gray-900 dark:text-white">{user.fullName || "User"}</p>
                                                    <p className="w-[200px] truncate text-sm text-gray-700 dark:text-gray-400">{user.email}</p>
                                                </div>
                                            </div>
                                            <div className="border-t border-gray-200 dark:border-gray-700 my-1" />
                                            <button
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 flex items-center"
                                                onClick={() => {
                                                    logout();
                                                    setUserDropdownOpen(false);
                                                }}
                                            >
                                                <LogOut className="mr-2 h-4 w-4" />
                                                Log out
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="hidden sm:flex items-center space-x-2">
                                <motion.div whileHover="hover" variants={linkHoverVariants}>
                                    <Link
                                        href="/login"
                                        className="px-4 py-2 font-medium bg-gray-100 dark:bg-gray-600 rounded-md text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                                    >
                                        Login
                                    </Link>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link
                                        href="/register"
                                        className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-300"
                                    >
                                        Get Started
                                    </Link>
                                </motion.div>
                            </div>
                        )}

                        {/* Mobile menu button */}
                        <motion.button
                            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-100 dark:bg-gray-800 transition-colors duration-300 md:hidden"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            whileTap={{ scale: 0.9 }}
                        >
                            <AnimatePresence mode="wait">
                                {mobileMenuOpen ? (
                                    <motion.div
                                        key="x"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <X className="h-6 w-6 text-gray-900 dark:text-white" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Menu className="h-6 w-6 text-gray-900 dark:text-white" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } }}
                            exit={{ height: 0, opacity: 0, transition: { duration: 0.2, ease: "easeInOut" } }}
                            className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors duration-300 overflow-hidden"
                        >
                            <div className="px-4 py-2 space-y-3">
                                {links.map((link) => (
                                    <motion.div
                                        key={link.path}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2, delay: 0.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Link
                                            href={link.path}
                                            className="block py-2 font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}

                                {!user && (
                                    <motion.div className="space-y-2" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: 0.2 }}>
                                        <Link
                                            href="/login"
                                            className="block w-full py-2 text-center bg-gray-200 dark:bg-gray-800 rounded-md text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-300"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="block w-full py-2 text-center bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Get Started
                                        </Link>
                                    </motion.div>
                                )}

                                {user && (
                                    <motion.div className="px-2 py-2 border-t border-gray-100 dark:border-gray-700" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: 0.25 }}>
                                        <div className="flex items-center gap-2">
                                            {user.image ? (
                                                <img src={user.image} alt={user.fullName || "User"} className="h-6 w-6 rounded-full object-cover" />
                                            ) : (
                                                <span className="h-6 w-6 flex items-center justify-center bg-blue-500 text-white font-semibold rounded-full">
                                                    {user.fullName?.charAt(0).toUpperCase() || "U"}
                                                </span>
                                            )}
                                            <div className="flex flex-col leading-none">
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">{user.fullName || "User"}</p>
                                                <p className="text-xs truncate text-gray-700 dark:text-gray-400">{user.email}</p>
                                            </div>
                                        </div>
                                        <button
                                            className="block mt-2 w-full py-2 text-center bg-gray-200 dark:bg-gray-800 rounded-md text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-300"
                                            onClick={() => {
                                                logout();
                                                setMobileMenuOpen(false);
                                            }}
                                        >
                                            Logout
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;
