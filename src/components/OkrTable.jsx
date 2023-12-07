import React, { useState, useEffect } from 'react';

export default function OkrTable({ data }) {
    const [expandedRow, setExpandedRow] = useState(null);
    const [selectedPriority, setSelectedPriority] = useState('Baja');
    const [selectedState, setSelectedState] = useState('No realizado');
    const [newData, setNewData] = useState([]);
    const [objetivos, setObjetivos] = useState([]);
    const [sugerencias, setSugerencias] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/okr');
                const results = await response.json();
                console.log('Datos de OKR recibidos desde la API:', results);

                const newData = results.map(item => {
                    const texto = item.result;

                    const objetivoRegex = /Objetivo: (.+?)\./;
                    const sugerenciasRegex = /- Sugerencia: (.+?)\./g;

                    const objetivoMatch = texto.match(objetivoRegex);
                    const objetivo = objetivoMatch ? objetivoMatch[1].trim() : null;

                    const sugerenciasMatches = Array.from(texto.matchAll(sugerenciasRegex), match => ({
                        sugerencia: match[1].trim(),
                        priority: "low"
                        // Puedes agregar más propiedades si es necesario
                    }));
                    console.log(objetivo);

                    return {
                        objetivo: objetivo,
                        sugerencias: sugerenciasMatches,
                        createdAt: item.createdAt,
                        id: item.id,
                        content: item.content
                    };
                });

                // Actualizar estado
                setObjetivos(newData);

            } catch (error) {
                console.error('Error al obtener datos de OKR desde la API:', error);
            }
        };

        fetchData();
    }, []);


    useEffect(() => {
        console.log(sugerencias);
        console.log(objetivos);
    }, [objetivos, sugerencias])

    useEffect(() => {
        console.log(objetivos);
        const savedData = JSON.parse(localStorage.getItem('okrData'));

        if (savedData && savedData.length > 0) {
            console.log('Datos recibidos en OkrTable desde localStorage:', savedData);
            setNewData(savedData);
        } else if (objetivos && objetivos.length > 0) {
            console.log('Datos recibidos en OkrTable desde props:', data);
            setNewData(initializeNewData(objetivos));
            saveToLocalStorage(initializeNewData(objetivos));
        }
    }, [data]);

    function initializeNewData(data) {
        return data.map(item => ({
            ...item,
            priority: selectedPriority || 'Low',  // Usar selectedPriority o 'Low' si no hay valor
            state: 'To be done'
        }));
    }

    const saveToLocalStorage = (data) => {
        localStorage.setItem('okrData', JSON.stringify(data));
    };

    const handleRowClick = (index) => {
        if (expandedRow === index) {
            setExpandedRow(null);
        } else {
            setExpandedRow(index);
        }
    };

    const dateFormatter = (date) => {
        let fecha = new Date(date);

        let day = fecha.getDate();
        let month = fecha.getMonth() + 1;
        let year = fecha.getFullYear();
        let hours = fecha.getHours();
        let min = fecha.getMinutes();

        let dateFormatted = day + '/' + (month < 10 ? '0' : '') + month + '/' + year + ' ' + hours + ':' + min;
        return dateFormatted;
    };

    const handlePriorityChange = (event, objetivoIndex, sugerenciaIndex) => {
        const updatedData = [...newData];
        updatedData[objetivoIndex].sugerencias[sugerenciaIndex].priority = event.target.value;
        setNewData(updatedData);
        saveToLocalStorage(updatedData);
        setSelectedPriority(event.target.value);
    };
    
    const handleStateChange = (event, objetivoIndex, sugerenciaIndex) => {
        const updatedData = [...newData];
        updatedData[objetivoIndex].sugerencias[sugerenciaIndex].state = event.target.value;
        setNewData(updatedData);
        saveToLocalStorage(updatedData);
        setSelectedState(event.target.value);
    };

    return (
        <table className="w-full bg-white text-center shadow-lg rounded-md overflow-hidden">
            <thead>
                <tr className="border-custom-blue border-2 bg-custom-blue text-white">
                    <th className="py-2">Objetivos</th>
                    {/* <th className="py-2">Sugerencias</th> */}
                    <th className="py-2">Fecha</th>
                </tr>
            </thead>
            <tbody>
                {newData.map((item, index) => (
                    <React.Fragment key={index}>
                        <tr
                            onClick={() => handleRowClick(index)}
                            className={`${expandedRow === index ? 'bg-blue-200' : 'hover:bg-gray-100'
                                } cursor-pointer transition-all`}
                        >
                            <td className="py-1">{item.objetivo}</td>
                            <td>{dateFormatter(item.createdAt)}</td>
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
                                        {item.sugerencias.map((sugerencia, sugIndex) => (
                                            <tr key={`sug_${sugIndex}`}>
                                                <td className="text-left pl-4">🌟{sugerencia.sugerencia}</td>
                                                <td>
                                                    <select value={sugerencia.priority} onChange={(e) => handlePriorityChange(e, index, sugIndex)}>
                                                        <option value="High">Alta</option>
                                                        <option value="Mean">Media</option>
                                                        <option value="Low">Baja</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <select value={sugerencia.state} onChange={(e) => handleStateChange(e, index, sugIndex)}>
                                                        <option value="To be done">Por realizar</option>
                                                        <option value="In progress">En proceso</option>
                                                        <option value="Done">Realizada</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        ))}

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
