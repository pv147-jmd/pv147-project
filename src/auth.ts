import NextAuth, { Account, Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/db";
import { users } from "@/db/schema/users"; 
import { eq } from 'drizzle-orm';
import { debug } from "console";
import { JWT } from "next-auth/jwt";

export const authOptions = {
  providers: [
    GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
              params: {
                prompt: "consent",
                access_type: "offline",
                response_type: "code",
                scope: "openid email profile", 
              },
            },
          }),
  ],
  debug: true,  
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token.user) {

        session.user = token.user as User;
      }
      return session;
    },
    async jwt({ token, user, account }: {
      token: JWT;
      user?: User; // user can be undefined on subsequent calls
      account?: Account | null; // account is also optional during the session callback
  }) {
      if (user) {
        token.user = user; 
      }

      if (account?.provider === "google") {
        
        const existingUser = await db.select().from(users).where(eq(users.email, (user?.email || ""))).get();

        if (!existingUser) {
          
          await db.insert(users).values({
            email: user?.email || "",
            nickname: user?.name || "",
            password: ""
          });
        }

        // Attach user info to the token
        token.user = {
          id: user?.id,
          email: user?.email,
          name: user?.name,
          image: user?.image,
        };
      }
      return token;
    },
  }
};
 