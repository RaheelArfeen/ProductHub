"use client";

import { useEffect, useState } from "react";

export default function Loader() {
    const [theme, setTheme] = useState('dark')

    useEffect(() => {
        const getTheme = localStorage.getItem('nexttheme')
        setTheme(getTheme)
    })

    return (
        <div className={`fixed inset-0 flex items-center justify-center ${theme == 'dark' ? 'bg-gray-800' : 'bg-white'} z-50`}>
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
}
