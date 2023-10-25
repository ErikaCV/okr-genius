"use client";
import { useState } from "react";
import Image from "next/image";
import logo from "@/assets/images/icon.webp";
import downloadIcon from "@/assets/images/download-icon.png";

export default function CreateOkr() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div className="flex flex-col w-screen sm:flex-row sm:justify-end">
      <nav className="navbar bg-gray-100 justify-center items-center border-b border-black sm:hidden">
        <div>
          <Image src={logo} alt="logo" width={39} height={39} />
        </div>

        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl text-black font-abel">
            OKRs
          </a>
        </div>

        <div className="flex-none">
          <button
            className="btn btn-square btn-ghost text-black"
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </nav>
      <nav className="hidden sm:flex sm:flex-col w-1/3 bg-gray-300 h-screen items-center pt-5 sm:fixed sm:w-1/3 sm:left-0">
        <Image src={logo} alt="logo" width={50} height={50} />
        <a className="btn btn-ghost normal-case text-xl text-black font-abel">
          OKRs
        </a>

        <ul className="space-y-4 py-5">
          <li>
            <button className="block w-full text-center py-2 px-4 rounded-md bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring border border-black">
              Crear OKR
            </button>
          </li>
          <li>
            <button className="block w-full text-center py-2 px-4 rounded-md bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring border border-black">
              Historial de OKRs
            </button>
          </li>
          <li>
            <button className="block w-full text-center py-2 px-4 rounded-md bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring border border-black">
              Cerrar sesión
            </button>
          </li>
        </ul>
      </nav>

      <main className="bg-gray-100 sm:w-2/3 sm:min-h-screen">
        <h2 className="font-abel text-black flex justify-center items-center text-xl pt-5 mb-5 sm:border-b sm:border-gray-300">
          Crear tus OKRs
        </h2>
        <h3 className="font-abel text-black text-lg pl-7">
          Ingresá tu sueño de negocio:
        </h3>
        <div className="flex justify-center items-center w-full mt-2.5 mb-3">
          <textarea
            className="textarea textarea-bordered bg-gray-300 w-[90%] h-32"
            placeholder=""
          ></textarea>
        </div>
        <div className="flex justify-start place-items-center gap-x-1">
          <h3 className="font-abel text-black text-base pl-7">
            Plazo para lograrlo
          </h3>
          <div className="relative max-w-sm">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-custom-red"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
              </svg>
            </div>
            <input
              data-datepicker
              type="text"
              className="bg-gray-300 border border-custom-red text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-4/5 pl-10 p-1"
              placeholder=""
            />
          </div>
        </div>
        <div className="flex justify-center items-center mt-4">
          <button className="border-2 border-custom-red bg-custom-gray rounded-md px-12 py-2">
            <span className="text-custom-red">Crear OKR</span>
          </button>
        </div>
        <h3 className="font-abel text-black text-lg pl-7 mt-1">
          OKRs IA hizo estos objetivos para ti:
        </h3>
        <div className="flex justify-center items-center w-full my-3">
          <textarea
            className="textarea textarea-bordered bg-gray-300 w-[90%] h-32"
            placeholder=""
          ></textarea>
        </div>
        <div className="flex justify-center items-center">
          <button className="border-2 border-custom-red bg-custom-gray rounded-md px-20 py-2 flex justify-center items-center gap-2">
            <Image
              src={downloadIcon}
              alt="download-icon"
              width={20}
              height={20}
            />
            <span className="text-custom-red">Descargar PDF</span>
          </button>
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-end items-start">
          <div className="bg-gray-300 p-4 rounded-lg shadow-md w-80">
            <div className="flex justify-end">
              <button
                className="p-1 hover:bg-gray-200 rounded"
                onClick={toggleModal}
              >
                ×
              </button>
            </div>
            <ul className="space-y-4">
              <li>
                <button
                  className="block w-full text-center py-2 px-4 rounded-md bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring border border-black"
                  onClick={() => {
                    toggleModal();
                  }}
                >
                  Crear OKR
                </button>
              </li>
              <li>
                <button
                  className="block w-full text-center py-2 px-4 rounded-md bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring border border-black"
                  onClick={() => {
                    toggleModal();
                  }}
                >
                  Historial de OKRs
                </button>
              </li>
              <li>
                <button
                  className="block w-full text-center py-2 px-4 rounded-md bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring border border-black"
                  onClick={() => {
                    toggleModal();
                  }}
                >
                  Cerrar sesión
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
