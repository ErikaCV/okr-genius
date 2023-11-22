"use client"
import React, { useState } from 'react';

export default function OkrTable({ data }) {
    const [expandedRow, setExpandedRow] = useState(null);
    const [selectedPriority, setSelectedPriority] = useState('Baja');
    const [selectedState, setSelectedState] = useState('No realizado');
    const [newData, setNewData] = useState(initializeNewData(data));

    const handleRowClick = (index) => {
        if (expandedRow === index) {
            setExpandedRow(null);
        } else {
            setExpandedRow(index);
        }
    };
    function initializeNewData(data) {
        return data.map(item => ({
            ...item,
            priority: 'Low',
            state: 'To be done'
        }));
    }

    console.log(newData);

    const dateFormatter = (date) => {
        let fecha = new Date(date);

        let day = fecha.getDate();
        let month = fecha.getMonth() + 1;
        let year = fecha.getFullYear();
        let hours = fecha.getHours();
        let min = fecha.getMinutes();

        let dateFormatted = day + '/' + (month < 10 ? '0' : '') + month + '/' + year + " " + hours + ":" + min;
        return dateFormatted
    }

    const handlePriorityChange = (event, index) => {
        const updatedData = [...newData];
        updatedData[index].priority = event.target.value;
        setNewData(updatedData);
        setSelectedPriority(event.target.value);
    };

    const handleStateChange = (event, index) => {
        const updatedData = [...newData];
        updatedData[index].state = event.target.value;
        setNewData(updatedData);
        setSelectedState(event.target.value);
    };

    return (
        <table className="w-full bg-white text-center shadow-lg rounded-md overflow-hidden">
            <thead>
                <tr className="border-custom-blue border-2 bg-custom-blue text-white ">
                    <th className="py-2">OKR</th>
                    <th className="py-2">FECHA</th>
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
                            <td className="py-2">{item.content}</td>
                            <td className="py-2">{dateFormatter(item.createdAt)}</td>
                        </tr>
                        {expandedRow === index && (
                            <tr>
                                <td colSpan="3" className="">
                                    <table className='text-center w-full border-b-2'>
                                        <thead>
                                            <tr>
                                                <th>Tarea</th>
                                                <th>Prioridad</th>
                                                <th>Estado</th>
                                            </tr>
                                        </thead>
                                        <tr className=''>
                                            <td className='text-left pl-4'>{item.result}</td>
                                            <td>
                                                <select value={item.priority} onChange={(e) => handlePriorityChange(e, index)}>
                                                    <option value="High">Alta</option>
                                                    <option value="Mean">Media</option>
                                                    <option value="Low">Baja</option>
                                                </select>
                                            </td>
                                            <td >
                                                <select value={item.state} onChange={(e) => handleStateChange(e, index)}>
                                                    <option value="To be done">Por realizar</option>
                                                    <option value="In progress">En proceso</option>
                                                    <option value="Done">Realizada</option>
                                                </select>
                                            </td>
                                        </tr>
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