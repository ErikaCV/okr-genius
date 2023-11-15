'use client'

import Link from 'next/link'
import { useState } from 'react'
import { resetPassword } from './_action.js'

export default function ForgotPassword() {
  const [error, setError] = useState('')

  const submit = async (data) => {
    const { error } = await resetPassword(data)
    setError(error)
  }

  return (
    <form className="font-abel text-black md:bg-[#D9D9D9] md:min-h-screen" action={submit}>
      <div className="flex flex-col items-center text-center text-4xl text-black pb-8 md:pt-16">
        <span className="font-kronaOne">OKR</span>
        <span className="font-kronaOne">GENIUS</span>
      </div>
      <div className="md:mx-20">
        <div className="text-x font-abel">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="w-full border-2 border-[#524e4e] bg[#000000]  rounded mb-5"
            maxLength="40"
            required
          />
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <div className="flex items-center justify-center w-full border-2 p-1 rounded mb-4 text-center text-base bg-[#D9D9D9]  border-[#CA2A2A]  text-[#CA2A2A] hover:bg-[#c97f7f]">
          <button type="submit" className="w-full">
            Recuperar contraseña
          </button>
        </div>
        <div className="text-left mb-2 md:mb-2 text-sm">
          <p>
            ¿Estás registrado?<span className="mr-2"></span>
            <Link href={"/"} className="text-[#01803C]">
              Inicia sesión
            </Link>
          </p>
        </div>
        <div className="text-left mb-2 md:mb-2 text-sm">
          <p>
            ¿No estás registrado?<span className="mr-2"></span>
            <Link href={"/auth/sign-up"} className="text-[#01803C]">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </form>
  )
}