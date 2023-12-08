import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
    const okrs = await prisma.suggestions.findMany();
    return NextResponse.json(okrs);
}