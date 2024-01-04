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
  const dateFormatter = (date) => {
    const fecha = new Date(date);
  
    const day = fecha.getDate();
    const month = fecha.getMonth() + 1; // Los meses en JavaScript comienzan en 0
    const year = fecha.getFullYear();
    const hours = fecha.getHours();
    const minutes = fecha.getMinutes();
  
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
    return `${formattedDay}/${formattedMonth}/${year} ${formattedHours}:${formattedMinutes}`;
  };

  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };
  // Fetch OKR data
  const fetchData = useCallback(async () => {
    if (status === 'authenticated' && session && session.user) {
      try {
        const response = await fetch(`/api/okr/${session.user.id}`);
        const results = await response.json();
        setNewData(results);
      } catch (error) {
        console.error('Error fetching OKR data:', error);
      }
    }
  }, [session, status]);

  // Fetch suggestions
  const fetchSuggestions = useCallback(async () => {
    try {
      const response = await fetch('/api/suggestions', { cache: 'no-store' });
      const results = await response.json();
      setSuggestions(results);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  }, []);

  // Load data on mount and on session change
  useEffect(() => {
    fetchData();
    fetchSuggestions();
  }, [fetchData, fetchSuggestions]);

  // Handle priority change
  const handlePriorityChange = async (event, suggestionId) => {
    const priority = event.target.value;
    await updateSuggestion(suggestionId, { priority });
  };

  // Handle state change
  const handleStateChange = async (event, suggestionId) => {
    const state = event.target.value;
    await updateSuggestion(suggestionId, { state });
  };

  // Update suggestion
  const updateSuggestion = async (suggestionId, data) => {
    try {
      const response = await fetch(`/api/suggestions/${suggestionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      await fetchData();
      await fetchSuggestions();
    } catch (error) {
      console.error('Error updating suggestion:', error);
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