import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import openai from "@/utils/openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  const { content } = await req.json();
  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  } else {
    if (typeof content !== "string" || content.trim() === "") {
      return NextResponse.json(
        { message: "Content is required" },
        { status: 400 }
      );
    }

    try {
      const response = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "Eres 'OKR Genius', un asistente inteligente especializado en Objetivos y Resultados Clave (OKRs). Tu propósito es ayudar a los usuarios a definir, entender y alcanzar sus OKRs de manera efectiva y concisa.",
          },
          {
            role: "user",
            content: `Por favor, genera una lista concisa de 1 Objetivo y 3 Resultados Clave (OKRs) para ${content}.`,
          },
        ],
        model: "gpt-3.5-turbo",
        stream: true,
        max_tokens: 100,
        temperature: 0.6,
      });

      const stream = OpenAIStream(response);

      return new StreamingTextResponse(stream);
    } catch (error) {
      console.error("Error en la solicitud:", error);
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}
