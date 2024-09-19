import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
      user: {
        // Add properties based on your session object
        name?: string;
        email?: string;
        picture?: string;
        userId?: string;
        accessToken?: string;
      } & DefaultSession["user"];
    }
}