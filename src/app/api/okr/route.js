// Importaciones necesarias para la ruta
import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma"; // Importa el cliente de Prisma para interactuar con la base de datos
import { getServerSession } from "next-auth"; // Función para obtener la sesión actual del usuario
import { authOptions } from "../auth/[...nextauth]/options"; // Opciones de configuración para next-auth

// Ruta GET para obtener todos los OKRs
export async function GET() {
  const okrs = await prisma.okr.findMany(); // Consulta todos los OKRs en la base de datos
  return NextResponse.json(okrs); // Devuelve los OKRs como respuesta JSON
}

// Ruta POST para crear un nuevo OKR
export async function POST(req) {
  const session = await getServerSession(authOptions); // Obtiene la sesión del usuario
  const { content, result } = await req.json(); // Extrae 'content' y 'result' del cuerpo de la solicitud

  // Verifica si el usuario está autenticado
  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 }); // Si no está autenticado, devuelve un error 401
  }

  const userId = session.user.id; // Obtiene el ID del usuario de la sesión

  // Verifica si 'content' y 'result' son cadenas de texto válidas
  if (typeof content !== "string" || content.trim() === "" || 
      typeof result !== "string" || result.trim() === "") {
    return NextResponse.json(
      { message: "Content and result are required" },
      { status: 400 } // Si no son válidos, devuelve un error 400
    );
  }

  try {
    // Intenta crear un nuevo OKR en la base de datos
    const newOkr = await prisma.okr.create({
      data: {
        content, // Contenido del OKR
        userId,  // ID del usuario asociado al OKR
        result,  // Resultado procesado para el OKR
      },
    });

    // Procesa 'result' para extraer sugerencias
    const sugerenciasMatches = Array.from(result.matchAll(/- Sugerencia: (.+?)\./g), match => ({
      sugerencia: match[1].trim(),
      priority: "Baja", // Valor por defecto
      state: "Por hacer" // Valor por defecto
    }));
    
    for (const sugerenciaMatch of sugerenciasMatches) {
      await prisma.suggestions.create({
        data: {
          content: sugerenciaMatch.sugerencia, // Contenido de la sugerencia
          priority: sugerenciaMatch.priority,  // Prioridad por defecto
          state: sugerenciaMatch.state,        // Estado por defecto
          okrId: newOkr.id,                    // Asocia la sugerencia con el ID del OKR creado
        },
      });
    }

    return NextResponse.json(newOkr); // Devuelve el OKR creado como respuesta JSON
  } catch (error) {
    console.error("Error al crear OKR:", error); // Registra el error en caso de fallo
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 } // Devuelve un error 500
    );
  }
}
