"use client";
import { useForm } from "react-hook-form";
import Image from "next/image";
import downloadIcon from "@/assets/images/download-icon.png";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from 'react';
import MyDocument from '../../components/MyDocument'; 
import { PDFDownloadLink } from '@react-pdf/renderer';
import { v4 as uuidv4 } from 'uuid';



export default function CreateOkr() {
  const { register, handleSubmit, setValue } = useForm();
  const { data: session, status } = useSession();
  const [pdfContent, setPdfContent] = useState('');

  useEffect(() => {
    setValue("resultContent", pdfContent);
  }, [pdfContent]);

  console.log("Console log de la sesion", session)
 
  const onSubmit = async (data) => {
    const response = await fetch("/api/okr", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: data.promptContent }),
    });
    
    if (response.ok) {
      const result = await response.json();
      // Establecer el resultado en el segundo textarea
      setValue("resultContent", result.result);
      // Actualizar pdfContent con el resultado para el PDF
      setPdfContent(result.result);
    } else {
      const errorText = await response.text(); // o `response.json()` si la API devuelve un objeto de error JSON
      console.error("Error en la respuesta de la API:", errorText);
    }
  };

  const historyTest = async () => {
    const response = await fetch(`/api/okr/history/${session.user.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log("RESPONSE", result);
  };
  return (
    <main className="bg-custom-light-sky-blue sm:w-2/3 min-h-[calc(100svh-80px)]">
      <h2 className=" text-black flex justify-center items-center text-2xl pt-5 mb-5 sm:border-b sm:border-gray-300">
        Crear tus OKRs
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className=" text-black text-lg pl-7">
          Ingresá tu sueño de negocio:
        </h3>
        <div className="flex justify-center items-center w-full mt-2.5 mb-3">
          <textarea
            {...register("promptContent")}
            className="textarea textarea-bordered bg-custom-light-sky-blue border-custom-blue border-4 w-[90%] h-32"
            placeholder=""
          ></textarea>
        </div>
        <div className="flex justify-center items-center mt-4">
          <button
            type="submit"
            className="border-2 bg-custom-sky-blue border-custom-blue rounded-md px-12 py-2 hover:bg-custom-dark-blue transition duration-300 ease-in-out"
          >
            <span className=" text-black">Crear OKR</span>
          </button>
        </div>
      </form>
      <h3 className="font-abel text-black text-lg pl-7 mt-1">
        OKRs IA hizo estos objetivos para ti:
      </h3>
      <div className="flex justify-center items-center w-full my-3">
        <textarea
          {...register("resultContent")}
          className="textarea textarea-bordered bg-custom-light-sky-blue border-custom-blue border-4  w-[90%] h-32"
          placeholder=""
          readOnly
        ></textarea>
      </div>
      <div className="flex justify-center items-center">
      {pdfContent && (
        <PDFDownloadLink
          document={<MyDocument content={pdfContent} />}
          fileName={`OKRs_${uuidv4()}.pdf`}
        >
          {({ blob, url, loading, error }) =>
            loading ? <span className="loading loading-spinner text-info"></span> : (
              <button className="border-2 bg-custom-sky-blue border-custom-blue rounded-md py-2 px-20 flex justify-center items-center gap-2 hover:bg-custom-dark-blue transition duration-300 ease-in-out">
                <Image
                  src={downloadIcon}
                  alt="download-icon"
                  width={20}
                  height={20}
                />
                <span className="text-black">Descargar PDF</span>
              </button>
            )
          }
        </PDFDownloadLink>
      )}
    </div>
    </main>
  );
}
