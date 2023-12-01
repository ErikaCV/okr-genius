import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import openai from "@/utils/openai";

export async function GET() {
  const okrs = await prisma.okr.findMany();
  return NextResponse.json(okrs);
}

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  } else {
    const userId = session.user.id;
    const { content } = await req.json();

    if (typeof content !== "string" || content.trim() === "") {
      return NextResponse.json(
        { message: "Content is required" },
        { status: 400 }
      );
    }

    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "Eres 'OKR Genius', un asistente inteligente especializado en Objetivos y Resultados Clave (OKRs). Tu propósito es ayudar a los usuarios a definir, entender y alcanzar sus OKRs de manera efectiva.",
          },
          {
            role: "user",
            content: `Escribe una lista de 1 Objetivos y 3 Resultados Clave por cada objetivo (OKRs) que esten medianamente para ${content}.`,
          },
        ],
        model: "gpt-3.5-turbo",
        max_tokens: 150,
      });

      console.log(completion);
      console.log(completion.choices);
      console.log(completion.choices[0].message.content);
      const result = completion.choices[0].message.content;

      const newOkr = await prisma.okr.create({
        data: {
          content,
          userId,
          result,
        },
      });

      return NextResponse.json(result);
    } catch (error) {
      console.error("Error en la solicitud:", error);
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}
