import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import openai from "@/utils/openai";
import { OpenAIStream, StreamingTextResponse } from 'ai';


export async function GET() {
  const okrs = await prisma.okr.findMany();
  return NextResponse.json(okrs);
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  const { content } = await req.json();
  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  } else {
    const userId = session.user.id;
    

    if (typeof content !== "string" || content.trim() === "") {
      return NextResponse.json(
        { message: "Content is required" },
        { status: 400 }
      );
    }

 
    try{
    // Request the OpenAI API for the response based on the prompt
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "Eres 'OKR Genius', un asistente inteligente especializado en Objetivos y Resultados Clave (OKRs). Tu propósito es ayudar a los usuarios a definir, entender y alcanzar sus OKRs de manera efectiva.",
        },
        {
          role: "user",
          content: `Escribeuna lista de 1 Objetivo y 3 Resultados Clave (OKRs) para ${content} bien detallados`,
        }, 
      ],
      model: "gpt-3.5-turbo",
      stream: true, // Enable streaming response
    });
   
    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);
    // const newOkr = await prisma.okr.create({
    //   data: {
    //     content,
    //     userId,
    //     result,
    //   },
    // });

    // Respond with the stream
  

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