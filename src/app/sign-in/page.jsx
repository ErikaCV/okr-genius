"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Link from "next/link";
import logo from "@/assets/images/icon.webp";
import image2 from "@/assets/images/f-4.webp";
import icongl from "@/assets/images/google-icon.webp";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading2";

const SignIn = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    signIn("google", { callbackUrl: "/create-okr" }).then(() => {
      setIsLoading(false);
    });
  };

  const { data: session, status } = useSession();
  const router = useRouter();
  const inputRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (session) {
    router.replace("/create-okr");
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const onSubmit = async (data) => {
    setIsLoading(true); // Activa el loader
    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (response.ok) {
        router.push("/create-okr");
      } else {
        setErrorMessage("Credenciales incorrectas.");
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      setErrorMessage("Error en el inicio de sesión.");
    } finally {
      setIsLoading(false); // Desactiva el loader
    }
  };

  return (
    <div className="bg-custom-light-sky-blue flex items-center justify-center md:max-h-screen">
      <div className=" flex items-center rounded-3xl shadow-lg max-w-3xl px-5  md:bg-custom-sky-blue ">
        <div className="md:block hidden w-1/2">
          <Image className="rounded-2xl" src={image2} alt="logo" width={400} priority />
        </div>
        <div className="bg-custom-sky-blue rounded-[30px] px-4 md:p-0 md:w-1/2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" text-black  min-h-[100svh]"
          >
            <div className="flex flex-col items-center justify-center  md:hidden">
              <Image src={logo} alt="logo" width={200} className="mt-7 mb-3" />
            </div>
            <div className="flex flex-col items-center text-center text-4xl text-black pb-12 md:pt-9 ">
              <span className="">OKR</span>
              <span className="">GENIUS</span>
            </div>
            <div className="mx-16 md:mx-12 ">
              <div className="text-x ">
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
                      ref={inputRef}
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
              <div className="flex items-center justify-center w-full border-2 p-1 rounded mb-4 text-center text-base bg-custom-light-blue border-custom-blue hover:bg-custom-dark-blue">
                <button type="submit" className="w-full">
                  Iniciar sesión
                </button>
              </div>
              <div className="flex items-center justify-center w-full border-2 p-1 rounded mb-4 text-base bg-custom-light-sky-blue border-custom-red hover:bg-[#f1e0e0] flex-grow text-center mr-8 text-custom-red">
                <Image
                  src={icongl}
                  alt="google"
                  width={25}
                  className="md:ml-12 "
                />
                <button
                  className="w-full"
                  type="button"
                  onClick={handleGoogleSignIn}
                >
                  Continuar con Google
                </button>
              </div>
              <div className="text-left mb-4 mt-6 text-sm">
                <p>
                  ¿No tienes cuenta?<span className="mr-2"></span>
                  <Link
                    href={"auth/sign-up"}
                    className="text-custom-light-green"
                  >
                    Regístrate
                  </Link>
                </p>
              </div>
              <div className="text-left mb-14 md:mb-2 text-sm">
                <p>
                  ¿Olvidaste tu contraseña?<span className="mr-2"></span>
                  <Link
                    href={"/auth/forgot-password"}
                    className="text-custom-light-green"
                  >
                    Recuperar contraseña
                  </Link>
                </p>
              </div>
            </div>
          </form>
          {errorMessage && (
            <div className="toast toast-end">
              <div className="alert alert-error transition-opacity duration-300 ease-in-out opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{errorMessage}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      {isLoading && <Loading />}
    </div>
  );
};

export default SignIn;
