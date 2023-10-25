"use client";

import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import logo from "@/assets/images/icon.webp";
import icongl from "@/assets/images/google-icon.webp";
import Image from "next/image";

const SignIn = () => {
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
          className="font-abel text-black  md:bg-[#D9D9D9] md: min-h-screen"
        >
          <div className="flex flex-col items-center justify-center  md:hidden">
            <Image
              src={logo}
              alt="logo"
              width={100}
              height={100}
              className="mt-7 mb-3"
            />
          </div>
          <div className="flex flex-col items-center text-center text-4xl text-black pb-8 md:pt-8">
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
                className="w-full border-2 border-[#524e4e] bg[#000000]  rounded"
                maxLength="40"
                required
              />
            </div>
            <div className=" text-black text-x font-abel pb-4">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className=" required w-full border-2 border-[#524e4e] rounded "
                minLength="8"
                maxLength="30"
                required
              />
            </div>
            <div className="flex items-center justify-center w-full border-2 p-1 rounded mb-4 text-center text-base bg-[#D9D9D9] border-[#524e4e] hover:bg-[#afaeae]">
              <button type="submit" className="w-full">
                Iniciar sesión
              </button>
            </div>
            <div className="flex items-center justify-center w-full border-2 p-1 rounded mb-4 text-base bg-[#D9D9D9] border-[#CA2A2A] hover:bg-[#c97f7f] flex-grow text-center mr-8 text-[#CA2A2A] ">
              <Image
                src={icongl}
                alt="google"
                width={25}
                height={25}
                className="ml-8"
              />
              <button className="w-full">Inicia sesión con Google</button>
            </div>
            <div className="text-left mb-2 text-sm">
              <p>
                ¿No tienes cuenta?<span className="mr-2"></span>
                <Link href={"/sign-up"} className="text-[#01803C]">
                  Regístrate
                </Link>
              </p>
            </div>
            <div className="text-left mb-14 md:mb-2 text-sm">
              <p>
                ¿Olvidaste tu contraseña?<span className="mr-2"></span>
                <Link href={"/password-recovery"} className="text-[#01803C]">
                  Recuperar contraseña
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
