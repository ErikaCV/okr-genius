import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const prisma = new PrismaClient();
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });
          console.log("USER", user);

          if (!user) {
            return null;
          }

          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );
          console.log(isValidPassword);

          if (!isValidPassword) {
            return null;
          }

          return user;
        } catch (e) {
          console.log(e);
          return null;
        } finally {
          await prisma.$disconnect();
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, account, user }) {
      const prisma = new PrismaClient();

      if (account) {
        if (account.provider === "google") {
          let userToUpdate = user;

          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
          });

          if (!existingUser) {
            const newUser = await prisma.user.create({
              data: {
                email: user.email,
                username: `google_user_${Date.now()}`,
              },
            });
            userToUpdate = newUser;
          }

          token.id = existingUser ? existingUser.id : userToUpdate.id;
        } else {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
          });

          if (existingUser) {
            token.id = existingUser.id;
          }
        }
      }

      await prisma.$disconnect();
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;

      return session;
    },
  },
};