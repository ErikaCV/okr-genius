const Tarea = ({ numero, prioridad, estado, equipo, onPrioridadChange, onEstadoChange }) => {
    return (
      <div className="flex items-center justify-between p-2 border-b">
        <span className="text-sm font-semibold">{numero}. Tarea</span>
        
        {/* Selector de Prioridad */}
        <div className="flex">
          <select
            className="block appearance-none w-full bg-transparent border border-gray-400 hover:border-gray-500 px-2 py-1 rounded leading-tight focus:outline-none focus:shadow-outline"
            value={prioridad}
            onChange={onPrioridadChange}
          >
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
          </select>
          <div
            className={`flex-shrink-0 w-4 h-4 rounded-full self-center mx-2 ${
              prioridad === 'Alta' ? 'bg-red-500' : prioridad === 'Media' ? 'bg-yellow-500' : 'bg-green-500'
            }`}
          ></div>
        </div>
  
        {/* Selector de Estado */}
        <div className="flex">
          <select
            className="block appearance-none w-full bg-transparent border border-gray-400 hover:border-gray-500 px-2 py-1 rounded leading-tight focus:outline-none focus:shadow-outline"
            value={estado}
            onChange={onEstadoChange}
          >
            <option value="Realizado">Realizado</option>
            <option value="en progreso">en progreso</option>
            <option value="bloqueado">bloqueado</option>
          </select>
          <div
            className={`flex-shrink-0 w-4 h-4 rounded-full self-center mx-2 ${
              estado === 'Realizado' ? 'bg-blue-500' : estado === 'en progreso' ? 'bg-purple-500' : 'bg-gray-500'
            }`}
          ></div>
        </div>
        
        <span className="text-sm">{equipo}</span>
        <span className="flex space-x-1">
          {/* Aquí irían tus íconos de opciones */}
          {/* Icono de editar, borrar, etc. */}
        </span>
      </div>
    );
  };
  
  export default Tarea;