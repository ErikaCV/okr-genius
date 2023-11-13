// Importaciones necesarias de React y Tailwind
import React, { useState } from 'react';

const DateRangePicker = () => {
    // Estados para manejar las fechas
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');

    // Manejador para el cambio en fechaDesde
    const handleFechaDesdeChange = (event) => {
        const nuevaFechaDesde = event.target.value;
        setFechaDesde(nuevaFechaDesde);

        // Ajustar fechaHasta si es necesario
        if (fechaHasta && nuevaFechaDesde > fechaHasta) {
            setFechaHasta(nuevaFechaDesde);
        }
    };

    // Manejador para el cambio en fechaHasta
    const handleFechaHastaChange = (event) => {
        const nuevaFechaHasta = event.target.value;
        setFechaHasta(nuevaFechaHasta);

        // Ajustar fechaDesde si es necesario
        if (fechaDesde && nuevaFechaHasta < fechaDesde) {
            setFechaDesde(nuevaFechaHasta);
        }
    };

    return (
        <div className="flex flex-col space-y-2 p-3  max-w-xs mx-0 mt-5">
            <div className="flex flex-col space-y-1">
                <label htmlFor="fechaDesde" className="text-sm font-medium text-gray-700">Fecha Desde:</label>
                <input
                    type="date"
                    id="fechaDesde"
                    name="fechaDesde"
                    value={fechaDesde}
                    onChange={handleFechaDesdeChange}
                    className="border p-1 rounded focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
            </div>
    
            <div className="flex flex-col space-y-1">
                <label htmlFor="fechaHasta" className="text-sm font-medium text-gray-700">Fecha Hasta:</label>
                <input
                    type="date"
                    id="fechaHasta"
                    name="fechaHasta"
                    value={fechaHasta}
                    onChange={handleFechaHastaChange}
                    className="border p-1 rounded focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
            </div>
        </div>
    );


};

export default DateRangePicker;
