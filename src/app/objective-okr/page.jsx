"use client"
import React, { useEffect, useState } from "react";
import OkrTable from "@/components/OkrTable";

export default function Objective() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchOkr() {
      try {
        const data = await fetch('/api/okr');
        const result = await data.json();
        console.log('Datos de OKR recibidos:', result);
        setTasks(result);
      } catch (error) {
        console.error('Error al obtener datos de OKR:', error);
      }
    }
    fetchOkr();
  }, []);

  return (
    <div className="px-2 mt-5">
      <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
        OKRs
      </h2>
      <OkrTable data={tasks} />
    </div>
  );
}
