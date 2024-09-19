import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
      user: {
        name?: string;
        email?: string;
        picture?: string;
        userId?: string;
        accessToken?: string;
      } 
    }
}