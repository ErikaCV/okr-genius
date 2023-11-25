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
    async jwt({ token, account, user }) {
      const prisma = new PrismaClient();
      
      // Si el usuario inicia sesión con Google o con credenciales
      if (account) {
        if (account.provider === "google") {
          // Manejo para inicio de sesión con Google
          let userToUpdate = user;
  
          // Busca si el usuario ya existe en la base de datos
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email }
          });
  
          if (!existingUser) {
            // Crea un nuevo usuario sin contraseña
            const newUser = await prisma.user.create({
              data: {
                email: user.email,
                username: `google_user_${Date.now()}`, // Genera un username único
              },
            });
            userToUpdate = newUser;
          } 
  
          // Asigna el ID del usuario al token
          token.id = existingUser ? existingUser.id : userToUpdate.id;
        } else {
          // Manejo para otros proveedores o credenciales
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email }
          });
  
          if (existingUser) {
            token.id = existingUser.id;
          }
        }
      }
  
      // Desconecta la instancia de Prisma
      await prisma.$disconnect();
      return token;
    },
    async session({ session, token }) {
      // En el callback de la sesión, asigna el ID del usuario al objeto de sesión
      session.user.id = token.id;
  
      return session;
    },
    // ...otros callbacks que puedas tener
  }
};