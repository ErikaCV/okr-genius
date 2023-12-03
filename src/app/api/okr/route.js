import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function GET() {
  const okrs = await prisma.okr.findMany();
  return NextResponse.json(okrs);
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  const { content, result } = await req.json();

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  if (
    typeof content !== "string" ||
    content.trim() === "" ||
    typeof result !== "string" ||
    result.trim() === ""
  ) {
    return NextResponse.json(
      { message: "Content and result are required" },
      { status: 400 }
    );
  }

  try {
    const newOkr = await prisma.okr.create({
      data: {
        content,
        userId,
        result,
      },
    });

    return NextResponse.json(newOkr);
  } catch (error) {
    console.error("Error al crear OKR:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
