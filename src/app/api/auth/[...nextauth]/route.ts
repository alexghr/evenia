import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import argon2 from "argon2";
import { authLinks } from "@/links";
import getPrismaClient from "@/prismaClient";

export const authOptions = NextAuth({
  pages: {
    signIn: authLinks.signIn,
    newUser: authLinks.signUp,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "you@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await getPrismaClient().user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          return null;
        }

        if (await argon2.verify(user.password, credentials.password)) {
          return user as any;
        }

        return null;
      },
    }),
  ],
});

export { authOptions as GET, authOptions as POST };
