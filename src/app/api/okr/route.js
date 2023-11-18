import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function GET() {
  const okrs = await prisma.okr.findMany();

  return NextResponse.json(okrs);
}

export async function POST(req) {
  const session = await getServerSession(authOptions)
  
  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }else{
    const userId =  session.user.id;
    const { content } = await req.json();
    // console.log('SESSION POST',  session.user);
  
    const result = "Respuesta de la API de Mati"
    const newOkr = await prisma.okr.create({
      data: {
        content,
        userId,
        result
      },
    });

    return NextResponse.json(newOkr);
  }
  
  // Llamada simulada a la API externa
  // const externalApiResponse = await callExternalApi(content);
}

// Función para simular la respuesta de una API externa
// async function callExternalApi(promptContent) {
//   // Simula una respuesta basada en el contenido del prompt
//   console.log("result", promptContent);
//   return `Respuesta simulada para: ${promptContent}`;
// }