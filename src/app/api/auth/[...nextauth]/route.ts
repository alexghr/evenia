import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import argon2 from "argon2";
import prismaClient from "@/prismaClient";
import { authLinks } from "@/links";

const handler = NextAuth({
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

        const user = await prismaClient.user.findUnique({
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

export { handler as GET, handler as POST };
