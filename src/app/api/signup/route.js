import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const { email, username, password } = await request.json();

   
    if (password.length < 6) {
     
      return new NextResponse(JSON.stringify({ message: "La contraseña es demasiado corta" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

   
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
     
      return new NextResponse(JSON.stringify({ message: "El email ya está en uso" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

  
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    
    delete newUser.password;

   
    return NextResponse.json(newUser, {
      status: 201, 
    });
  } catch (error) {
  
    console.error(error);
    return new NextResponse(JSON.stringify({ message: "Ocurrió un error en el servidor" }), {
      status: 500, 
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
