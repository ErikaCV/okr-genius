import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
    try {
        const suggestions = await prisma.suggestions.findMany();
        return NextResponse.json(suggestions);
    } catch (error) {
    
        console.error("Error al obtener sugerencias:", error);
        return NextResponse.json({ error: "Error al obtener sugerencias" }, { status: 500 });
    }
}