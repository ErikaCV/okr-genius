'use client'

import Link from 'next/link'
import { useState } from 'react'
import { resetPassword } from './_action.js'
import logo from "@/assets/images/icon.webp";
import Image from "next/image";

export default function ForgotPassword() {
  const [error, setError] = useState('')

  const submit = async (data) => {
    const { error } = await resetPassword(data)
    setError(error)
  }

  return (
    <form  action={submit}
    className=" text-black  md:min-h-screen">
        <div className="flex flex-col items-center justify-center md:hidden">
        <Image
          src={logo}
          alt="logo"
          width={200}
          className="mb-3 mt-7"
        />
      </div>
      <div className="flex flex-col items-center justify-center text-4xl text-black mb-7  md:mx-12 md:pt-9">
        <span className="">OKR</span>
        <span className="">GENIUS</span>
      </div>
      <div className="md:mt-12 mx-16  md:mx-12 ">
        <div className="text-x ">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="style-input  rounded mb-2"
            maxLength="40"
            required
          />
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <div className="flex items-center justify-center w-full border-2 p-2 rounded my-4 text-sm   bg-custom-light-blue border-custom-blue hover:bg-custom-dark-blue p-0 md:mb-1 md:text-base md:px-3 md:py-1">
          <button type="submit" className="w-full">
            Recuperar contraseña
          </button>
        </div>
        <div className="text-left mb-2 md:my-4 text-sm">
          <p>
            ¿Estás registrado?<span className="mr-2"></span>
            <Link href={"/sign-in"} className="text-custom-light-green">
              Inicia sesión
            </Link>
          </p>
        </div>
        <div className="text-left mb-12 md:mb-2 text-sm">
          <p>
            ¿No tienes cuenta?<span className="mr-2"></span>
            <Link href={"/auth/sign-up"} className="text-custom-light-green ">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </form>
  )
}