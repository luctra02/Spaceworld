import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        DiscordProvider({
            clientId: process.env.DISCORD_ID as string,
            clientSecret: process.env.DISCORD_SECRET as string,
        }),
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "jsmith",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const user = {
                    id: "1",
                    name: "J Smith",
                    email: "jsmith@example.com",
                };

                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user;
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null;

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            },
        }),
    ],

    callbacks: {
        async jwt({ token, account, profile }) {
            if (account && profile) {
                const userId = account.providerAccountId;
                const username =
                    profile.name ??
                    (profile as { username?: string }).username ??
                    "";

                // First, try to find the user
                const findUserResponse = await fetch(
                    `http://localhost:8001/v1/api/users/${userId}`,
                );

                if (findUserResponse.status === 500) {
                    // If user doesn't exist, create the user
                    const createUserResponse = await fetch(
                        "http://localhost:8001/v1/api/users",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                userId: userId,
                                username: username,
                            }),
                        },
                    );

                    if (!createUserResponse.ok) {
                        throw new Error("Failed to create user");
                    }

                    await createUserResponse.json();
                }

                // Only store userId and accessToken in the token
                token.userId = userId;
                token.accessToken = account.access_token;
            }

            return token;
        },

        async session({ session, token }) {
            // Pass userId and accessToken to the session
            session.user = token as any;
            return session;
        },
    },
};
