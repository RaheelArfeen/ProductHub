import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],

    // Use a secret to encrypt/sign cookies (required in production)
    secret: process.env.NEXTAUTH_SECRET,

    // Optional: session settings
    session: {
        strategy: "jwt", // you can also use 'database' if using a DB for sessions
    },

    // Optional: callbacks for customizing user/session data
    callbacks: {
        async session({ session, token }) {
            // You can add custom fields to the session object here
            session.user.id = token.sub;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
