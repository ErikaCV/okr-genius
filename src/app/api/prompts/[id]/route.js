import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { getSession } from "next-auth/react";

// GET - Obtener un prompt específico
export async function GET(req) {
  const { id } = req.query; // Obtener el ID del prompt desde la URL

  const prompt = await prisma.prompt.findUnique({
    where: { id: parseInt(id) },
  });

  if (!prompt) {
    return NextResponse.json({ message: "Prompt no encontrado" }, { status: 404 });
  }

//   return new Response(JSON.stringify(prompt), { status: 200 });
    return NextResponse.json(prompt, { status: 200 });
}

// PUT - Actualizar un prompt
export async function PUT(req) {
  const session = await getSession({ req });
  const { id } = req.query;
  const { content } = await req.json();

  if (!session) {
    // return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const updatedPrompt = await prisma.prompt.update({
    where: { id: parseInt(id) },
    data: { content },
  });

//   return new Response(JSON.stringify(updatedPrompt), { status: 200 });
return NextResponse.json(updatedPrompt, { status: 200 });
}

// DELETE - Eliminar un prompt
export async function DELETE(req) {
  const session = await getSession({ req });
  const { id } = req.query;

  if (!session) {
    // return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await prisma.prompt.delete({
    where: { id: parseInt(id) },
  });

//   return new Response(JSON.stringify({ message: "Prompt eliminado" }), { status: 200 });
return NextResponse.json({ message: "Prompt eliminado" }, { status: 200 });
}