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
          console.log("USER", user);
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
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ account, token, user, profile, session }) {
      if (account && account.provider === "google") {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user.email,
            username: `google_user_${Date.now()}`, // Genera un username único
            // No se incluye la contraseña
          }),
        });
        console.log(username)
        const data = await response.json();
        if (response.ok) {
          token.user = data;
        } else {
          console.error('Error al crear usuario:', data.message);
        }
      } else if (user) {
        token.user = user;
      }
      return token;
    },
  },
};
