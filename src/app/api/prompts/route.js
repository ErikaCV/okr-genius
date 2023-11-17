import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { getSession } from "next-auth/react";

export async function GET() {
  const prompts = await prisma.prompt.findMany();
  console.log(prompts);

  return NextResponse.json(prompts);
}

export async function POST(req) {
  const session = await getSession({ req });
  console.log(session)
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { content } = await req.json();
  const userId = session.user.id;

  const newPrompt = await prisma.prompt.create({
    data: {
      content,
      userId,
    },
  });

  // Llamada simulada a la API externa
  const externalApiResponse = await callExternalApi(newPrompt.content);

  // Actualizar el prompt en la base de datos con el resultado simulado
  const updatedPrompt = await prisma.prompt.update({
    where: { id: newPrompt.id },
    data: { result: externalApiResponse },
  });

  return NextResponse.json(updatedPrompt);
}

// Función para simular la respuesta de una API externa
async function callExternalApi(promptContent) {
  // Simula una respuesta basada en el contenido del prompt
  return `Respuesta simulada para: '${promptContent}'`;
}