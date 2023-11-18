import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { revalidateTag } from "next/cache";

export async function GET(req, {params}) {
  const tag = req.nextUrl.searchParams.get('tag')
  revalidateTag(tag)

  const okr = await prisma.okr.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!okr) {
    return NextResponse.json({ message: "Okr no encontrado" }, { status: 404 });
  }

  return NextResponse.json(okr, { status: 200 });
}

export async function PUT(req, {params}) {
  const session = getServerSession(authOptions)
  const tag = req.nextUrl.searchParams.get('tag')
  revalidateTag(tag)
  const { content } = await req.json();

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const updatedOkr = await prisma.okr.update({
    where: { id: parseInt(params.id) },
    data: { content },
  });

  return NextResponse.json(updatedOkr, { status: 200 });
}

export async function DELETE(req, {params}) {
  const session = getServerSession(authOptions)
  const tag = req.nextUrl.searchParams.get('tag')
  revalidateTag(tag)

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await prisma.okr.delete({
    where: { id: parseInt(params.id) },
  });

  return NextResponse.json({ message: "Okr eliminado" }, { status: 200 });
}