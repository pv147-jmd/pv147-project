import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/db";
import { users } from "@/db/schema/users";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";


export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile", // These scopes are standard for login
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials || {};

        
        // Fetch user from database
        const user = await db.select().from(users).where(eq(users.email, email)).get();

        if (user && (await bcrypt.compare(password, user.password))) {
          return { id: user.id, name: user.nickname, email: user.email };
        }

        return null;
      },
    }),
  ],
  debug: true, // TODO prec 
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user || token;
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.user = user;
      }
      if (account && account.provider === "google") {
        token.user = {
          name: user?.name,
          email: user?.email,
          image: user?.image,
        };
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET
};

export default NextAuth(authOptions);
