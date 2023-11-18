import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { revalidateTag } from "next/cache";

export async function GET(req, { params }) {
    const session = await getServerSession(authOptions)

    const tag = req.nextUrl.searchParams.get('tag')
    revalidateTag(tag)

    if (!session || !session.user || session.user.id != params.id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    
    const okr = await prisma.okr.findMany({
        where: { userId: parseInt(params.id) },
    });

    if (!okr) {
        return NextResponse.json({ message: "Okr no encontrado" }, { status: 404 });
    }

    return NextResponse.json(okr, { status: 200 });
}