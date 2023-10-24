"use client";

import React, { useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import Link from "next/link";
import logo from "../assets/images/icon.webp";
import icongl from "../assets/images/google-icon.webp";
import Image from "next/image";

const signIn = () => {
  const { handleSubmit, control } = useForm();
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
    <div className="flex items-center justify-center h-screen ">
      <div className="h-screen lg:bg-custom-gray px-4">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="flex flex-col items-center justify-center ">
            <Image
              src={logo}
              alt="logo"
              width={100}
              height={100}
              className="mt-16 mb-3 lg:hidden"
            />
            <div className="flex flex-col items-center text-center text-4xl  text-black ">
              <span className="font-kronaOne">OKR</span>
              <span className="font-kronaOne">GENIUS</span>
            </div>
          </div>
          <div className=" text-black text-x font-abel ">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: "Este campo es requerido",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message:
                    "Dirección de correo inválida. Debe ser un formato @gmail.com o @hotmail.com",
                },
              }}
              render={({ field, fieldState }) => (
                <div>
                  <input
                    {...field}
                    ref={inputRef}
                    type="email"
                    className={`w-full border-2 border-gray-300 p-1 rounded custom-input ${
                      fieldState.error ? "is-invalid" : ""
                    }`}
                    maxLength="40"
                    required
                  />
                  {fieldState.error && (
                    <p className="text-danger">{fieldState.error.message}</p>
                  )}
                </div>
              )}
            />
          </div>
          <div className=" text-black text-x font-abel pb-4">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: true, maxLength: 30 }}
              render={({ field }) => (
                <input
                  {...field}
                  type="password"
                  className="custom-input required w-full border-2 border-gray-300 p-1 rounded custom-input"
                  minLength="8"
                  maxLength="30"
                  required
                />
              )}
            />
          </div>
          <div className="flex items-center justify-center w-full border-2 p-1 rounded mb-4 text-center text-base">
            <button type="submit" className="" >
              Iniciar sesión
            </button>
          </div>
          <div className="flex items-center justify-center w-full border-2 p-1 rounded mb-4 text-base">
            <Image src={icongl} alt="google" width={25} height={25} className="ml-14" />
            <button className="flex-grow text-center ">
              Inicia sesión con Google
            </button>
          </div>
          <div className="text-left mb-2 text-sm">
            <p>
            ¿No tienes cuenta?<span className="mr-2"></span>
              <Link className="" href="/registration">
                Regístrate
              </Link>
            </p>
          </div>
          <div className="text-left mb-6 text-sm">
            <p>
            ¿Olvidaste tu contraseña?<span className="mr-2"></span>
              <Link className="" href="/registration">
                Recuperar contraseña
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default signIn;

