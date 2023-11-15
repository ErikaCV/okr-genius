"use client"
import Image from "next/image";
import downloadIcon from "@/assets/images/download-icon.png";
import CalendarSvg from "@/components/CalendarSvg";

export default function CreateOkr() {
  return (
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
              <CalendarSvg />
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
  );
}
