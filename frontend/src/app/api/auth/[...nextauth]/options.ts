import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";

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
                    `https://spaceworld-springboot.azurewebsites.net/v1/api/users/${userId}`,
                );

                if (findUserResponse.status === 500) {
                    // If user doesn't exist, create the user
                    const createUserResponse = await fetch(
                        "https://spaceworld-springboot.azurewebsites.net/v1/api/users",
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
