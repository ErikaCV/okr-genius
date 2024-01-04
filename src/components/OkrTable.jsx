"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import MyDocument from "./MyDocument";
import downloadIcon from "@/assets/images/download-icon.png";

export default function OkrTable() {
  const [expandedRow, setExpandedRow] = useState(null);
  const [newData, setNewData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const { data: session, status } = useSession();

  const fetchData = useCallback(async () => {
    if (status !== "authenticated" || !session || !session.user) {
      console.error("Usuario no autenticado o sesión no disponible");
      return;
    }
    const response = await fetch(`/api/okr/${session.user.id}`);
    const results = await response.json();
    setNewData(results);
  }, [session, status]);

  const fetchSuggestions = useCallback(async () => {
    const response = await fetch("/api/suggestions", { cache: 'no-store' });
    const result = await response.json();
    setSuggestions(result);
  }, []);

  const updateData = useCallback(async () => {
    await fetchData();
    await fetchSuggestions();
  }, [fetchData, fetchSuggestions]);

  useEffect(() => {
    updateData();
  }, [updateData]);

  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const dateFormatter = (date) => {
    let fecha = new Date(date);
    let day = fecha.getDate();
    let month = fecha.getMonth() + 1;
    let year = fecha.getFullYear();
    let hours = fecha.getHours();
    let min = fecha.getMinutes();
    let formattedHours = (hours < 10 ? "0" : "") + hours;
    let formattedMinutes = (min < 10 ? "0" : "") + min;
    return `${day}/${month < 10 ? "0" : ""}${month}/${year} ${formattedHours}:${formattedMinutes}`;
  };

  const handlePriorityChange = async (event, sugerenciaId) => {
    try {
      const response = await fetch(`/api/suggestions/${sugerenciaId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priority: event.target.value }),
      });
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      await updateData();
    } catch (error) {
      console.error("Error al actualizar la prioridad en el backend:", error);
    }
  };

  const handleStateChange = async (event, sugerenciaId) => {
    try {
      const response = await fetch(`/api/suggestions/${sugerenciaId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state: event.target.value }),
      });
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      await updateData();
    } catch (error) {
      console.error("Error al actualizar el estado en el backend:", error);
    }
  };

  return (
    <table className="w-full bg-white text-center shadow-lg rounded-md">
      <thead className="sm:table-header-group">
        <tr className="border-custom-blue border-2 bg-custom-blue text-white">
          <th className="py-2 sm:w-1/2">Objetivos</th>
          <th className="py-2 sm:w-1/4 hidden sm:table-cell">Fecha</th>
          <th className="py-2 sm:w-1/4 hidden sm:table-cell">Descargar</th>
        </tr>
      </thead>
      <tbody>
        {newData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((item, index) => (
          <React.Fragment key={index}>
            <tr
              onClick={() => handleRowClick(index)}
              className={`${expandedRow === index ? "bg-blue-200" : "hover:bg-gray-100"} cursor-pointer transition-all`}
            >
              <td className="py-1 sm:w-1/2">
                <div className="flex flex-row sm:flex-row items-start sm:items-center">
                  <p className="w-full text-center">{item.content}</p>
                  <div className="mt-2 sm:mt-0 sm:hidden pl-6">
                    <PDFDownloadLink
                      document={<MyDocument content={item.result} />}
                      fileName={`OKRs_${uuidv4()}.pdf`}
                    >
                      {({ loading }) => loading ? <span>Loading...</span> : (
                        <Image
                          src={downloadIcon}
                          alt="download-icon"
                          width={20}
                          height={20}
                        />
                      )}
                    </PDFDownloadLink>
                  </div>
                </div>
              </td>
              <td className="py-1 hidden sm:table-cell sm:w-1/4">{dateFormatter(item.createdAt)}</td>
              <td className="hidden sm:table-cell sm:w-1/4">
                <div className="flex justify-center">
                  <PDFDownloadLink
                    document={<MyDocument content={item.result} />}
                    fileName={`OKRs_${uuidv4()}.pdf`}
                  >
                    {({ loading }) => loading ? <span>Loading...</span> : (
                      <Image
                        src={downloadIcon}
                        alt="download-icon"
                        width={20}
                        height={20}
                      />
                    )}
                  </PDFDownloadLink>
                </div>
              </td>
            </tr>
            {expandedRow === index && (
              <tr>
                <td colSpan="3" className="">
                  <table className="text-center w-full border-b-2">
                    <thead>
                      <tr>
                        <th>Sugerencias</th>
                        <th>Prioridad</th>
                        <th>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {suggestions.filter(suggestion => suggestion.okrId === item.id)
                                  .sort((a, b) => a.content.localeCompare(b.content))
                                  .map((suggestion, sugIndex) => (
                        <tr key={`sug_${sugIndex}`}>
                          <td className="text-left pl-4">🌟{suggestion.content}</td>
                          <td>
                            <select
                              value={suggestion.priority}
                              onChange={(e) => handlePriorityChange(e, suggestion.id)}
                            >
                              <option value="High">Alta</option>
                              <option value="Mean">Media</option>
                              <option value="Low">Baja</option>
                            </select>
                          </td>
                          <td>
                            <select
                              value={suggestion.state}
                              onChange={(e) => handleStateChange(e, suggestion.id)}
                            >
                              <option value="To be done">Por realizar</option>
                              <option value="In progress">En proceso</option>
                              <option value="Done">Realizada</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}