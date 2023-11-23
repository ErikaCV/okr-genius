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
          // Busca al usuario por email
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });
          console.log("USER",user);
          // Si el usuario no existe, retorna null
          if (!user) {
            return null;
          }

          // Compara la contraseña proporcionada con la contraseña almacenada
          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );
          console.log(isValidPassword);
          // Si la contraseña no es válida, retorna null
          if (!isValidPassword) {
            return null;
          }

          // Si las credenciales son válidas, retorna un objeto con la información del usuario
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
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ account, token, user, profile, session }) {
       if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
       session.user = token.user;
      // console.log('SESSIONNN',session);
      // console.log('TOKEN', token);
      return session;
    },
  },
};