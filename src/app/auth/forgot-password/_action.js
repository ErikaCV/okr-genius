'use server'

import { prisma } from "@/libs/prisma";
import { randomUUID } from 'crypto'
import formData from 'form-data'
import Mailgun from 'mailgun.js'
import { redirect } from 'next/navigation'

const API_KEY = process.env.MAILGUN_API_KEY || ''
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN || ''
const DOMAIN = process.env.DOMAIN || 'localhost:3000'
const PROTOCOL = process.env.NODE_ENV === 'production' ? 'https' : 'http'

const mailgun = new Mailgun(formData)
const client = mailgun.client({ username: 'api', key: API_KEY })

export async function resetPassword(data) {
  const email = data.get('email')
  if (!email || typeof email !== 'string') {
    return {
      error: 'Email inválido',
    }
  }

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    return {
      error: 'Este email no está registrado',
    }
  }

  const token = await prisma.passwordResetToken.create({
    data: {
      userId: user.id,
      token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
    },
  })

  const messageData = {
    from: `Cambio de contraseña <security@${MAILGUN_DOMAIN}>`,
    to: user.email,
    subject: 'Solicitud de cambio de contraseña',
    text: `Hola ${user.name}, alguien (esperemos que tú) solicitó cambiar la contraseña de esta cuenta. Si desea restablecer su contraseña, haga clic aquí: ${PROTOCOL}://${DOMAIN}/auth/password-reset/${token.token}

    Por motivos de seguridad, este enlace sólo es válido durante cuatro horas.
    
Si no solicitó este cambio, ignore este correo electrónico.`,
  }

  await client.messages.create(MAILGUN_DOMAIN, messageData)
  redirect('/auth/forgot-password/success')
}