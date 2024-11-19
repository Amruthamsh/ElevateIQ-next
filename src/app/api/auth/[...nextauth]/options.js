import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import User from "../../../../models/user";

export const options = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await User.findOne({ username: credentials.username });
        if (
          user.username === credentials.username &&
          user.password === credentials.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.role = user.role; // Explicitly include the role
      }
      return token;
    },

    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.role = token.role; // Pass role to session
      }
      return session;
    },
  },
};
