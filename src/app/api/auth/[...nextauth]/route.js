import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (user.email && user.email.endsWith('@ssn.edu.in')) {
                return true;
            }
            return false; // Sign-in failed
        },
    },
});

export { handler as GET, handler as POST }
