'use server'

import { prisma } from "@/libs/prisma";
import { hash } from 'bcrypt'
import { redirect } from 'next/navigation'

export async function resetPassword(token, data) {
  const password = data.get('password')
  const confirmPassword = data.get('confirm')
  if (
    !password ||
    typeof password !== 'string' ||
    password !== confirmPassword
  ) {
    return {
      error:
        'Las contraseñas no coinciden. Intenta reescribir e intentalo de nuevo.',
    }
  }

  const passwordResetToken = await prisma.passwordResetToken.findUnique({
    where: {
      token,
      createdAt: { gt: new Date(Date.now() - 1000 * 60 * 60 * 4) },
      resetAt: null,
    },
  })

  if (!passwordResetToken) {
    return {
      error:
        'Token de solicitud de cambio de contraseña no válido. Por favor intenta reestablecerla otra vez.',
    }
  }

  const encrypted = await hash(password, 12)

  const updateUser = prisma.user.update({
    where: { id: passwordResetToken.userId },
    data: {
      password: encrypted,
    },
  })

  const updateToken = prisma.passwordResetToken.update({
    where: {
      id: passwordResetToken.id,
    },
    data: {
      resetAt: new Date(),
    },
  })

  try {
    await prisma.$transaction([updateUser, updateToken])
  } catch (err) {
    console.error(err)
    return {
      error: `Ocurrió un error inesperado. Por favor intentalo de nuevo y si el problema persiste, contacte con el soporte.`,
    }
  }
  redirect('/auth/password-reset/success')
}