"use client";

import Link from "next/link";
import logo from "@/assets/images/icon.webp";
import Image from "next/image";

const CustomForm = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F5F5F5] md:flex-row">
      <div className="hidden md:flex md:w-1/2 md:items-center md:justify-center">
        <Image src={logo} alt="logo" width={350} />
      </div>
      <div className="px-4 md:p-0 md:w-1/2">
        <form className="font-abel text-black md:bg-[#D9D9D9] md:min-h-screen">
          <div className="flex flex-col items-center justify-center mb-7 md:hidden">
            <Image
              src={logo}
              alt="logo"
              width={100}
              height={100}
              className="mb-1"
            />
          </div>
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
                className="w-full border-2 border-[#524e4e] bg[#000000]  rounded mb-5"
                maxLength="40"
                required
              />
            </div>
            <div className="flex items-center justify-center w-full border-2 p-1 rounded mb-4 text-center text-base bg-[#D9D9D9]  border-[#CA2A2A]  text-[#CA2A2A] hover:bg-[#c97f7f]">
              <button type="submit" className="w-full">
                Recuperar contraseña
              </button>
            </div>
            <div className="text-left mb-2 md:mb-2 text-sm">
              <p>
              ¿Estás registrado?<span className="mr-2"></span>
                <Link href={"/sign-in"} className="text-[#01803C]">
                Inicia sesión
                </Link>
              </p>
            </div>
            <div className="text-left mb-2 md:mb-2 text-sm">
              <p>
              ¿No estás registrado?<span className="mr-2"></span>
                <Link href={"/sign-up"} className="text-[#01803C]">
                Regístrate aquí
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomForm;
