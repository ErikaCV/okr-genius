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
  const { content, result, priority, state } = await req.json();

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
    const texto = result;

    const objetivoRegex = /Objetivo: (.+?)\./;
    const sugerenciasRegex = /- Sugerencia: (.+?)\./g;

    const objetivoMatch = texto.match(objetivoRegex);
    const objetivo = objetivoMatch ? objetivoMatch[1].trim() : null;
    console.log(objetivo);

    const sugerenciasMatches = Array.from(texto.matchAll(sugerenciasRegex), match => ({
      sugerencia: match[1].trim(),
      priority: "Baja",
      state: "Por hacer"
    }));
    console.log(sugerenciasMatches);
    const newOkr = await prisma.okr.create({
      data: {
        content,
        userId,
        result,
      },
    });

    for (const sugerenciaMatch of sugerenciasMatches) {
      await prisma.suggestions.create({
        data: {
          content: sugerenciaMatch.sugerencia,
          priority: sugerenciaMatch.priority,
          state: sugerenciaMatch.state,
          okrId: newOkr.id,
        },
      });
    }

    return NextResponse.json(newOkr);
  } catch (error) {
    console.error("Error al crear OKR:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// export async function PATCH(req, {params})
// {
//   const session = await getServerSession(authOptions);
//   const { priority, state } = await req.json();
//   const { id } = params.id
//   console.log("ESTADO Y PRIORIDAD",state, priority);
//   console.log(id);
//   if (!session || !session.user) {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const updatedOkr = await prisma.okr.update({
//       where: {
//         id: id
//       },
//       data:{
//         priority: priority,
//         state: state
//       }
//     })
//   } catch (error) {
//     console.log(error);
//   }
// }
