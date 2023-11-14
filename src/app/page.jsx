"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Link from "next/link";
import logo from "@/assets/images/icon.webp";
import icongl from "@/assets/images/google-icon.webp";
import Image from "next/image";
import { signIn , useSession } from "next-auth/react"
import { useRouter } from "next/navigation";

const SignIn = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { data: session, status } = useSession();
  const router = useRouter();
  const inputRef = useRef();
  const [errorMessage, setErrorMessage] = useState('');

  if (session) {
    router.replace('/create-okr');
  }
  const onSubmit = async (data) => {
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })
    console.log(response)
 

    if (response.ok) {
      router.push("/create-okr")
    } else {
      
      setErrorMessage('Credenciales incorrectas.');
    }
  };


  // useEffect(() => {
  //   if (status === "loading") return;
  //   if (session) {
  //     router.replace('/create-okr');
  //   }
  // }, [session, status, router]);

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
              <label htmlFor="email">Correo electrónico</label>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: "El email es requerido",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message:
                      "Dirección de correo inválida. Debe ser un formato email@ejemplo.com",
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="email"
                    className={`style-input ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    maxLength="40"
                    required
                  />
                )}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="password">Contraseña</label>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{ required: true, minLength: 8, maxLength: 12 }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="password"
                    className={`style-input ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    maxLength="40"
                    required
                  />
                )}
              />
              {errors.password && (
                <div className="invalid-feedback">
                  La contraseña es requerida y debe tener entre 8 y 12
                  caracteres.
                </div>
              )}
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
              <button
              className="w-full"
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/create-okr" })}
              >Inicia sesión con Google</button>
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
       
        {errorMessage && (
        <div className="toast toast-end">
        <div className="alert alert-error transition-opacity duration-300 ease-in-out opacity-100">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{errorMessage}</span>
        </div>
      </div>
      )}
      </div>
    </div>
  );
};

export default SignIn;
