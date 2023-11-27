'use client'

import { useState } from 'react'
import { resetPassword } from './_actions'

export default function A({ params }) {
  const [error, setError] = useState('')

  async function submit(data) {
    const { error } = await resetPassword(params.token, data)
    setError(error || '')
  }

  return (
    <form className="font-abel text-black md:min-h-screen" action={submit}>
      <div className="flex flex-col items-center text-center text-4xl text-black pb-8 md:pt-16">
        <span className="font-kronaOne">OKR</span>
        <span className="font-kronaOne">GENIUS</span>
      </div>
      <div className="md:mx-20">
        <div className="text-x font-abel">
          <label htmlFor="password" className="form-label">
            Contraseña nueva
          </label>
          <input
            type="password"
            name="password"
            className="w-full border-2 border-[#524e4e] bg[#000000]  rounded mb-5"
            maxLength="40"
            required
          />
          <label htmlFor="confirm" className="form-label">
            Confirma la contraseña
          </label>
          <input
            type="password"
            name="confirm"
            className="w-full border-2 border-[#524e4e] bg[#000000]  rounded mb-5"
            maxLength="40"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <div className="flex items-center justify-center w-full border-2 p-1 rounded mb-4 text-center text-base bg-[#D9D9D9]  border-[#CA2A2A]  text-[#CA2A2A] hover:bg-[#c97f7f]">
          <button type="submit" className="w-full">
            Recuperar contraseña
          </button>
        </div>
      </div>
    </form>
  )
}