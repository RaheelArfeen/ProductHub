"use client"; // <--- THIS IS REQUIRED

import { createContext, useContext, useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { data: session } = useSession(); // now works
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (session?.user) {
            setUser({
                fullName: session.user.name,
                email: session.user.email,
                image: session.user.image,
            });
        } else {
            setUser(null);
        }
    }, [session]);

    const loginWithGoogle = async () => {
        await signIn("google");
    };

    const logout = async () => {
        await signOut();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loginWithGoogle, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
