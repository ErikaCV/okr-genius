import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";


export async function GET() {
  const prompts = await prisma.prompt.findMany();
  console.log(prompts);

  return NextResponse.json(prompts);
}

export async function POST(req) {
  const { content, userId } = await req.json();

  const newPrompt = await prisma.prompt.create({
    data: {
      content,
      userId,
    },
  });
  return NextResponse.json(newPrompt);
}
