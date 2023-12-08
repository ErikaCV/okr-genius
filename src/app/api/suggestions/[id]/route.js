import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options"
import { revalidateTag } from "next/cache";

export async function PATCH(req, { params }) {
    const session = await getServerSession(authOptions)
    const tag = req.nextUrl.searchParams.get('tag')
    revalidateTag(tag)
    const { state, priority } = await req.json();
    if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const updatedSuggestion = await prisma.suggestions.update({
        where: { id: parseInt(params.id) },
        data: { state, priority },
    });

    return NextResponse.json(updatedSuggestion, { status: 200 });
}