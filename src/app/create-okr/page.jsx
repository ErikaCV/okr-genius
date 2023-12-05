"use client";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import downloadIcon from "@/assets/images/download-icon.png";
import React, { useState } from "react";
import MyDocument from "../../components/MyDocument";
import LoadingDots from "@/components/LoadingDots";

export default function CreateOkr() {
  const { register, handleSubmit, setValue, reset } = useForm();
  const { data: session, status } = useSession();
  const [pdfContent, setPdfContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [textareaContent, setTextareaContent] = useState("");

  const onSubmit = async (data) => {
    setTextareaContent(""); // Limpiar el contenido anterior
    setIsLoading(true);     // Establecer el estado de carga
  
    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: data.promptContent }),
      });
  
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
  
      const data2 = await response.json();
      console.log(data2); // Si quieres seguir viendo la respuesta en la consola
  
      // Actualizar el contenido del textarea con la respuesta de la API
      setTextareaContent(data2.choices[0].message.content); // Asumiendo que esta es la estructura de tu respuesta
  
    } catch (error) {
      console.error("Error en la respuesta de la API:", error);
    } finally {
      setIsLoading(false);  // Quitar el estado de carga
    }
  };

  return (
    <main className="bg-custom-light-sky-blue sm:w-2/3 min-h-[calc(100svh-80px)]">
      <div className="flex justify-center items-center w-full mt-5 my-3">
        <textarea
          {...register("resultContent")}
          className="textarea textarea-bordered bg-custom-light-sky-blue border-blue-500 border-1 w-[90%]"
          placeholder="OKRs IA hizo estos objetivos para ti:"
          rows="11"
          readOnly
          value={textareaContent}
        ></textarea>
      </div>
      <div className="flex justify-end items-center mr-16 mb-2">
        {pdfContent && (
          <PDFDownloadLink
            document={<MyDocument content={pdfContent} />}
            fileName={`OKRs_${uuidv4()}.pdf`}
          >
            {({ blob, url, loading, error }) =>
              loading ? (
                <span>Loading...</span>
              ) : (
                <button className="border-2 bg-custom-sky-blue border-custom-blue rounded-md py-2 px-4 flex justify-center items-center gap-2 hover:bg-custom-dark-blue transition duration-300 ease-in-out mb-7 md:m-0">
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center items-center w-[90%] mx-auto p-4 rounded-md bg-custom-sky-blue">
          <textarea
            {...register("promptContent")}
            className="w-full p-2 border border-blue-500 rounded resize-none"
            rows="3"
            placeholder="Ingresá tu sueño de negocio:"
          ></textarea>
        </div>
        {!isLoading && (
          <div className="flex justify-center items-center mt-4">
            <button
              type="submit"
              className="border-2 bg-custom-sky-blue border-custom-blue rounded-md px-12 py-2 hover:bg-custom-dark-blue transition duration-300 ease-in-out mt-7 md:m-0"
            >
              <span className="text-black">Crear OKR</span>
            </button>
          </div>
        )}
      </form>
      {isLoading && <LoadingDots />}
    </main>
  );
}
