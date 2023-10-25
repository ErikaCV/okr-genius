"use client";

import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import logo from "@/assets/images/icon.webp";
import Image from "next/image";

const signUp = () => {
  const { handleSubmit } = useForm();
  const inputRef = useRef();

  const onSubmit = (data) => {
    console.log(data);
    // Aquí se agrega el código que se ejecuta cuando se envíe el formulario.
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F5F5F5] md:flex-row">
      <div className="hidden md:flex md:w-1/2 md:items-center md:justify-center">
        <Image src={logo} alt="logo" width={350} />
      </div>
      <div className="px-4 md:p-0 md:w-1/2">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="font-abel text-black md:bg-[#D9D9D9] md:min-h-screen"
        >
          <div className="flex flex-col items-center justify-center md:hidden">
            <Image
              src={logo}
              alt="logo"
              width={100}
              height={100}
              className="mb-3"
            />
          </div>
          <div className="flex flex-col items-center justify-center text-4xl text-black md:pt-2 md:text-3xl">
            <span className="font-kronaOne">OKR</span>
            <span className="font-kronaOne">GENIUS</span>
          </div>
          <div className="md:mx-20">
            <div className="text-x font-abel">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                ref={inputRef}
                type="email"
                className="w-full border-2 border-[#524e4e]"
                maxLength="40"
                required
              />
            </div>
            <div className="text-x font-abel">
              <label htmlFor="confirmEmail" className="form-label">
                Confirmar Email
              </label>
              <input
                type="email"
                className="w-full border-2 border-[#524e4e] rounded"
                required
              />
            </div>
            <div className="flex justify-between gap-4">
              <div className="text-x font-abel flex-1">
                <label htmlFor="firstName" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  className="w-full border-2 border-[#524e4e] rounded"
                  required
                />
              </div>
              <div className="text-x font-abel flex-1">
                <label htmlFor="lastName" className="form-label">
                  Apellido
                </label>
                <input
                  type="text"
                  className="w-full border-2 border-[#524e4e] rounded"
                  required
                />
              </div>
            </div>
            <div className="text-black text-x font-abel">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="w-full border-2 border-[#524e4e] rounded"
                minLength="8"
                maxLength="30"
                required
              />
            </div>
            <div className="text-black text-x font-abel pb-4">
              <label htmlFor="confirmPassword" className="form-label">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                className="w-full border-2 border-[#524e4e] rounded"
                minLength="8"
                maxLength="30"
                required
              />
            </div>
            <div className="flex items-center justify-center w-full border-2 p-1 rounded mb-4 text-base text-[#CA2A2A] bg-[#D9D9D9] border-[#CA2A2A] md:p-0 md:mb-1">
              <button type="submit" className="">
                Regístrate
              </button>
            </div>
            <div className="text-left mb-2 text-sm md:mb-0">
              <p>
                ¿Estás registrado?<span className="mr-2"></span>
                <Link href={"/"} className="text-[#01803C]">
                  Inicia sesión
                </Link>
              </p>
            </div>
            <div className="text-left mb-14 md:mb-2 text-sm">
              <p>
                ¿Olvidaste tu contraseña?<span className="mr-2"></span>
                <Link className="text-[#01803C]" href="/resend-confirmation">
                  Recuperar cotraseña
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default signUp;
