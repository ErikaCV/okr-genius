import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

// Inicializa Prisma
const prisma = new PrismaClient();

const handler = NextAuth({
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
      async authorize(credentials, req) {
        // Busca al usuario por email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // Si el usuario no existe, retorna null
        if (!user) {
          return null;
        }

        // Compara la contraseña proporcionada con la contraseña almacenada
        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        // Si la contraseña no es válida, retorna null
        if (!isValidPassword) {
          return null;
        }

        // Si las credenciales son válidas, retorna un objeto con la información del usuario
        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  callbacks: {
    jwt({ account, token, user, profile, session }) {
      if (user) token.user = user;
      return token;
    },
    sessions({ session, token }) {
      session.user = token.user;
      // No es necesario castear token.user a ningún tipo en JavaScript puro session.user = token.user as any
      return session;
    },
  },
});

export { handler as GET, handler as POST };
