'use client'

import { Button, Card, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function SuccessPage() {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.push('/')
    }, 5000)
  })

  return (
    <main className="max-w-xl px-4 mx-auto flex flex-col justify-center h-screen">
      <Card className="gap-4 flex flex-col">
        <Flex gap="4" direction="column">
          <h1 className="text-2xl font-light mb-2">
            Tu contraseña ha sido actualizada.
          </h1>
          <p className='mb-2'>
            Ahora será redirigido a la página de inicio de sesión donde podrá iniciar sesión.
            de nuevo.
          </p>
          <Button type="submit">
            <Link href={"/"} className="text-[#01803C]">
              Volver al login
            </Link>          
          </Button>
        </Flex>
      </Card>
    </main>
  )
}