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
    setIsLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: data.promptContent }),
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      let result = "";
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let isDone = false;
      while (!isDone) {
        const { done, value } = await reader.read();
        isDone = done;

        if (!done) {
          const partialResult = decoder.decode(value, { stream: true });
          result += partialResult;
          
          setTextareaContent((previous) => previous + partialResult);
          
        }
      }
      result += decoder.decode(); 
      setPdfContent(result);

      setValue("resultContent", result);
      setPdfContent(result);
      reset({ promptContent: "" });

      const okrResponse = await fetch("/api/okr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: data.promptContent,
          userId: session.user.id, 
          result: result, 
        }),
      });

      if (!okrResponse.ok) {
        throw new Error(`Error al crear OKR: ${okrResponse.status}`);
      }
    } catch (error) {
      console.error("Error en la respuesta de la API:", error);
    } finally {
      setIsLoading(false);
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
                <button className="border-2 bg-custom-sky-blue border-custom-blue rounded-md py-2 px-4 flex justify-center items-center gap-2 hover:bg-custom-dark-blue transition duration-300 ease-in-out">
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
        <div className="flex justify-center items-center mt-4">
          <button
            type="submit"
            className="border-2 bg-custom-sky-blue border-custom-blue rounded-md px-12 py-2 hover:bg-custom-dark-blue transition duration-300 ease-in-out"
          >
            <span className=" text-black">Crear OKR</span>
          </button>
        </div>
      </form>

      {isLoading && <LoadingDots />}
    </main>
  );
}
