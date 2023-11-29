"use client";

import React, { useRef, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Link from "next/link";
import logo from "@/assets/images/icon.webp";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading2";

const SignUp = () => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const router = useRouter();
  const usernameRef = useRef();
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // 1. Extrae los datos del formulario.
      const { email, username, password } = data;

      // 2. Realiza una solicitud POST al servidor con los datos del formulario.
      const signUpResponse = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });

      // 3. Convierte la respuesta del servidor a formato JSON.
      const signUpData = await signUpResponse.json();

      // 4. Verifica si la solicitud POST no fue exitosa.
      if (!signUpResponse.ok) {
        // 5. Establece un mensaje de error basado en la respuesta del servidor.
        setApiError(signUpData.message || 'Error al registrarse.');
        return; // 6. Termina la ejecución si hubo error.
      }

      // 7. Si el registro fue exitoso, intenta iniciar sesión.
      const signInResponse = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      // 8. Verifica si el inicio de sesión fue exitoso.
      if (signInResponse.ok) {
        // 9. Redirecciona al usuario si el inicio de sesión fue exitoso.
        router.push("/create-okr");
      } else {
        // 10. Establece un mensaje de error si el inicio de sesión falló.
        setApiError('Error al iniciar sesión después del registro.');
      }
    } catch (error) {
      // 11. Maneja cualquier error inesperado en la solicitud.
      console.error('Error en la solicitud de registro:', error);
      setApiError('Ocurrió un error de conexión al servidor.');
    }
    // 12. Resetea el formulario.
    reset();
  };

  const password = watch("password");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    className=" text-black  min-h-[100svh]"
    >
      <div className="flex flex-col items-center justify-center md:hidden">
        <Image
          src={logo}
          alt="logo"
          width={200}
          className="mb-3"
        />
      </div>
      <div className="flex flex-col items-center justify-center text-4xl text-black mb-7 md:mx-12 md:pt-9">
        <span className="">OKR</span>
        <span className="">GENIUS</span>
      </div>
      <div className="md:mt-12 mx-16  md:mx-12 ">
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
                className={`style-input ${errors.username ? "is-invalid" : ""
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
                className={`style-input ${errors.email ? "is-invalid" : ""
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
                className={`style-input ${errors.password ? "is-invalid" : ""
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
                className={`style-input ${errors.passwordConfirmation ? "is-invalid" : ""
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
        {isLoading && <Loading />}
        <div className="flex items-center justify-center w-full border-2 p-2 rounded my-4 text-base  bg-[#9cb6dd] border-custom-blue hover:bg-custom-dark-bluemd:p-0 md:mb-1  md:px-3 md:py-1">
          <button type="submit" className="w-full">
            Regístrate
          </button>
        </div>
        <div className="text-left mb-2 text-sm md:mb-0">
          <p>
            ¿Estás registrado?<span className="mr-2"></span>
            <Link href={"/sign-in"} className="text-custom-light-green">
              Inicia sesión
            </Link>
          </p>
        </div>
        <div className="text-left mb-14 md:mb-2 text-sm">
          <p>
            ¿Olvidaste tu contraseña?<span className="mr-2"></span>
            <Link className="text-custom-light-green" href="/auth/forgot-password">
              Recuperar contraseña
            </Link>
          </p>
        </div>
      </div>
      {/* <div>
          {apiError && <p className="text-red-500 text-center mt-4 text-xl">{apiError}</p>} 
          </div> */}
      {apiError && (
        <div className="toast toast-end">
          <div className="alert alert-error transition-opacity duration-300 ease-in-out opacity-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{apiError}</span>
          </div>
        </div>
      )}
    </form>

  );
};

export default SignUp;
