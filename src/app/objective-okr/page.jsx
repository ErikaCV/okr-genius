"use client";

import React, { useState } from "react";
import DateRangePicker from "@/components/DateRangePicker.jsx";

export default function Objective() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState({ index: -1, task: null });

  const addTask = () => {
    const newTask = {
      name: "",
      priority: "medio",
      status: "en_progreso",
      team: "",
    };
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    setEditingTask({ index: newTasks.length - 1, task: newTask });
  };

  const startEditing = (index) => {
    setEditingTask({ index, task: { ...tasks[index] } });
  };

  const handleEditChange = (field, value) => {
    setEditingTask({
      ...editingTask,
      task: { ...editingTask.task, [field]: value },
    });
  };

  const saveEdit = () => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === editingTask.index) {
        return editingTask.task;
      }
      return task;
    });
    setTasks(updatedTasks);
    setEditingTask({ index: -1, task: null });
  };

  // Asegúrate de incluir la función para eliminar tareas si es necesaria
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <main className="bg-gray-100 sm:w-2/3 sm:min-h-screen p-4">
      <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
        OKRs
      </h2>
      <div className="mb-4">
        <h1 className="text-lg font-medium text-gray-600">
          Selector de Rango de Fechas
        </h1>
        <DateRangePicker />
      </div>
      <h3 className="text-lg font-medium text-gray-600 mb-4">
        Ingresá tu sueño de negocio:
      </h3>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th>Tarea</th>
              <th>Prioridad</th>
              <th>Estado</th>
              <th>Equipo</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                {/* Campo para editar el nombre de la tarea */}
                <td>
                  {editingTask.index === index ? (
                    <input
                      type="text"
                      value={editingTask.task.name}
                      onChange={(e) => handleEditChange("name", e.target.value)}
                      placeholder="Nombre de la tarea"
                      className="border rounded p-1"
                    />
                  ) : (
                    task.name
                  )}
                </td>
                {/* Campo para editar la prioridad */}
                <td>
                  {editingTask.index === index ? (
                    <select
                      value={editingTask.task.priority}
                      onChange={(e) =>
                        handleEditChange("priority", e.target.value)
                      }
                      className="border rounded p-1"
                    >
                      <option value="alto">Alto</option>
                      <option value="medio">Medio</option>
                      <option value="bajo">Bajo</option>
                    </select>
                  ) : (
                    task.priority
                  )}
                </td>
                {/* Campo para editar el estado */}
                <td>
                  {editingTask.index === index ? (
                    <select
                      value={editingTask.task.status}
                      onChange={(e) =>
                        handleEditChange("status", e.target.value)
                      }
                      className="border rounded p-1"
                    >
                      <option value="en_progreso">En Progreso</option>
                      <option value="realizado">Realizado</option>
                      <option value="bloqueado">Bloqueado</option>
                    </select>
                  ) : (
                    task.status
                  )}
                </td>
                {/* Campo para editar el equipo */}
                <td>
                  {editingTask.index === index ? (
                    <input
                      type="text"
                      value={editingTask.task.team}
                      onChange={(e) => handleEditChange("team", e.target.value)}
                      placeholder="Equipo o persona"
                      className="border rounded p-1"
                    />
                  ) : (
                    task.team
                  )}
                </td>
                {/* Opciones para editar y eliminar */}
                <td className="flex justify-center items-center space-x-2">
                  <div className="flex space-x-2">
                    {editingTask.index === index ? (
                      <>
                        <button
                          onClick={saveEdit}
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded transition duration-300"
                        >
                          Guardar
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditing(index)}
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded transition duration-300"
                        >
                          Editar
                        </button>
                        <span
                          className="inline-block py-1 px-4 rounded"
                          aria-hidden="true"
                        ></span>{" "}
                        {/* Espaciador invisible */}
                      </>
                    )}
                    <button
                      onClick={() => deleteTask(index)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded transition duration-300"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={addTask}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Añadir Tarea
        </button>
      </div>
    </main>
  );
}

// import React, { useState } from 'react';
// import DateRangePicker from '@/components/DateRangePicker.jsx';

// export default function Objective() {
//    const [tasks, setTasks] = useState([]);
//   const [editingTask, setEditingTask] = useState({ index: -1, task: null });

//   // Función para añadir una nueva tarea
//   const addTask = () => {
//     setTasks([...tasks, { name: '', priority: 'medio', status: 'en_progreso', team: '' }]);
//   };

//     // Función para manejar el cambio en los inputs
//     const handleInputChange = (index, field, value) => {
//       const updatedTasks = tasks.map((task, i) => {
//         if (i === index) {
//           return { ...task, [field]: value };
//         }
//         return task;
//       });
//       setTasks(updatedTasks);
//     };

//   // Función para editar una tarea
//   const editTask = (index, newTask) => {
//     const updatedTasks = tasks.map((task, i) => (i === index ? newTask : task));
//     setTasks(updatedTasks);
//   };

//   // Función para eliminar una tarea
//   const deleteTask = (index) => {
//     const updatedTasks = tasks.filter((_, i) => i !== index);
//     setTasks(updatedTasks);
//   };

//   return (
//     <main className="bg-gray-100 sm:w-2/3 sm:min-h-screen">
//     <h2 className="font-abel text-black flex justify-center items-center text-xl pt-5 mb-5 sm:border-b sm:border-gray-300">
//        OKRs
//     </h2>

//     <div>
//         <h1>Selector de Rango de Fechas</h1>
//         <DateRangePicker />
//     </div>

//     <h3 className="font-abel text-black text-lg pl-7">
//       Ingresá tu sueño de negocio:
//     </h3>

//       <div>
//         <table className="table-auto w-full">
//           <thead>
//             <tr>
//               <th>Tarea</th>
//               <th>Prioridad</th>
//               <th>Estado</th>
//               <th>Equipo</th>
//               <th>Opciones</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tasks.map((task, index) => (
//               <tr key={index}>
//                 <td>
//                   <input
//                     type="text"
//                     value={task.name}
//                     onChange={(e) => handleInputChange(index, 'name', e.target.value)}
//                     className="border rounded p-1"
//                   />
//                 </td>
//                 <td>
//                   <select className="border rounded p-1">
//                     <option value="alto">Alto</option>
//                     <option value="medio">Medio</option>
//                     <option value="bajo">Bajo</option>
//                   </select>
//                 </td>
//                 <td>
//                   <select className="border rounded p-1">
//                     <option value="en_progreso">En Progreso</option>
//                     <option value="realizado">Realizado</option>
//                     <option value="bloqueado">Bloqueado</option>
//                   </select>
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     value={task.team}
//                     onChange={(e) => handleInputChange(index, 'team', e.target.value)}
//                     className="border rounded p-1"
//                   />
//                 </td>
//                 <td>
//                   <button onClick={() => editTask(index, task)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
//                     Editar
//                   </button>
//                   <button onClick={() => deleteTask(index)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2">
//                     Eliminar
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <button onClick={addTask} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//           Añadir Tarea
//         </button>
//       </div>
//     </main>
//   );
// }
