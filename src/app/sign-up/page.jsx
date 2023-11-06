"use client";

import React, { useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Link from "next/link";
import logo from "@/assets/images/icon.webp";
import Image from "next/image";

const SignUp = () => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const usernameRef = useRef();

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  const password = watch("password");

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
          <div className="flex flex-col items-center justify-center text-4xl text-black md:mx-12 md:pt-12 md:text-3xl">
            <span className="font-kronaOne">OKR</span>
            <span className="font-kronaOne">GENIUS</span>
          </div>
          <div className="md:mx-24 md:mt-12  text-x font-abel">
            <div className="mb-4">
              <label htmlFor="username">Nombre de usuario</label>
              <Controller
                name="username"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    ref={usernameRef}
                    className={`style-input ${
                      errors.username ? "is-invalid" : ""
                    }`}
                    maxLength="25"
                    minLength="3"
                    required
                  />
                )}
              />
              {errors.username && (
                <div className="invalid-feedback">Este campo es requerido.</div>
              )}
            </div>
            <div className="mb-4">
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
            <div className="mb-6">
              <label htmlFor="passwordConfirmation">Confirmar Contraseña</label>
              <Controller
                name="passwordConfirmation"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  validate: (value) =>
                    value === password || "Las contraseñas no coinciden",
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="password"
                    className={`style-input ${
                      errors.passwordConfirmation ? "is-invalid" : ""
                    }`}
                    maxLength="40"
                    required
                  />
                )}
              />
              {errors.passwordConfirmation && (
                <div className="invalid-feedback">
                  {errors.passwordConfirmation.message}
                </div>
              )}
            </div>
            <div className="flex items-center justify-center w-full border-2 p-2 rounded my-4 text-base text-[#CA2A2A] bg-[#D9D9D9] border-[#CA2A2A] hover:bg-[#c97f7f] md:p-0 md:mb-1  md:px-3 md:py-1">
              <button type="submit" className="w-full">
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

export default SignUp;




