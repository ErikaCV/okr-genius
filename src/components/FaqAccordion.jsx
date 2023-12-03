"use client";

import { useState } from "react";

const FaqAccordion = () => {
  const [activeId, setActiveId] = useState(null);

  const toggleAccordion = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  const isActive = (id) => activeId === id;

  return (
    <div className=" md:px-24 px-5 text-center text-xl pb-16">
      <h2 className="text-3xl font-bold mb-14">Preguntas frecuentes</h2>
      <ul className="bg-custom-sky-blue my-15 mx-auto w-full max-w-[750px]">
        <li className="list-none w-full p-1">
          <input
            type="radio"
            name="accordion"
            id="accordion1"
            className="hidden"
          />
          <label
            htmlFor="accordion1"
            onClick={() => toggleAccordion("accordion1")}
            className="flex items-center justify-between py-5 px-5 text-2xl font-medium mb-0.5 cursor-pointer"
          >
            ¿Cómo puede OKR Genius facilitar la consecución de mis metas
            empresariales?
            <span
              className={`text-5xl transition-transform duration-500 ${
                isActive("accordion1") ? "transform rotate-45" : ""
              }`}
            >
              +
            </span>
          </label>
          <div
            className={`text-left p-7 max-h-0 overflow-hidden transition-all duration-500 ${
              isActive("accordion1") ? "max-h-[600px]" : ""
            }`}
          >
            <hr className="my-4 border-t border-black" />
            <p>
              OKR Genius está diseñado para convertir tus ambiciones en
              realidades concretas. Con nuestra tecnología IA, obtendrás
              sugerencias de OKR personalizadas que te guiarán paso a paso hacia
              el éxito, manteniendo a tu equipo enfocado y alineado con cada
              objetivo empresarial.
            </p>
          </div>
        </li>
        <li className="list-none w-full p-1">
          <input
            type="radio"
            name="accordion"
            id="accordion2"
            className="hidden"
          />
          <label
            htmlFor="accordion2"
            onClick={() => toggleAccordion("accordion2")}
            className="flex items-center justify-between py-5 px-5 text-2xl font-medium mb-0.5 cursor-pointer"
          >
            ¿Qué hace que OKR Genius sea único en la gestión de OKR?
            <span
              className={`text-5xl transition-transform duration-500 ${
                isActive("accordion2") ? "transform rotate-45" : ""
              }`}
            >
              +
            </span>
          </label>
          <div
            className={`text-left p-7 max-h-0 overflow-hidden transition-all duration-500 ${
              isActive("accordion2") ? "max-h-[600px]" : ""
            }`}
          >
            <hr className="my-4 border-t border-black" />
            <p>
              Lo que nos distingue es nuestra integración de algoritmos de IA
              avanzados que no solo sugieren OKRs, sino que también aprenden y
              se adaptan a tu organización, impulsando un ciclo continuo de
              mejora y rendimiento optimizado.
            </p>
          </div>
        </li>
        <li className="list-none w-full p-1">
          <input type="radio" name="accordion" id="3" className="hidden" />
          <label
            htmlFor="accordion3"
            onClick={() => toggleAccordion("accordion3")}
            className="flex items-center justify-between py-5 px-5 text-2xl font-medium mb-0.5 cursor-pointer"
          >
            ¿Cómo promueve OKR Genius la colaboración dentro de los equipos?
            <span
              className={`text-5xl transition-transform duration-500 ${
                isActive("accordion3") ? "transform rotate-45" : ""
              }`}
            >
              +
            </span>
          </label>
          <div
            className={`text-left p-7 max-h-0 overflow-hidden transition-all duration-500 ${
              isActive("accordion3") ? "max-h-[600px]" : ""
            }`}
          >
            <hr className="my-4 border-t border-black" />
            <p>
              Fomentamos la sinergia del equipo permitiendo que los miembros
              colaboren fácilmente en los OKRs, compartan actualizaciones y
              retroalimentación, asegurando que todos estén comprometidos y
              remando en la misma dirección.
            </p>
          </div>
        </li>
        <li className="list-none w-full p-1">
          <input
            type="radio"
            name="accordion"
            id="accordion4"
            className="hidden"
          />
          <label
            htmlFor="accordion4"
            onClick={() => toggleAccordion("accordion4")}
            className="flex items-center justify-between py-5 px-5 text-2xl font-medium mb-0.5 cursor-pointer"
          >
            ¿Qué nivel de seguridad ofrece OKR Genius para proteger nuestra
            información?
            <span
              className={`text-5xl transition-transform duration-500 ${
                isActive("accordion4") ? "transform rotate-45" : ""
              }`}
            >
              +
            </span>
          </label>
          <div
            className={`text-left p-7 max-h-0 overflow-hidden transition-all duration-500 ${
              isActive("accordion4") ? "max-h-[600px]" : ""
            }`}
          >
            <hr className="my-4 border-t border-black" />
            <p>
              La seguridad es nuestra prioridad. OKR Genius utiliza tecnología
              de cifrado avanzada para proteger tus datos, asegurando que la
              información de tus OKRs esté segura y cumpla con las normativas de
              privacidad más estrictas.
            </p>
          </div>
        </li>
        <li className="list-none w-full p-1">
          <input
            type="radio"
            name="accordion"
            id="accordion5"
            className="hidden"
          />
          <label
            htmlFor="accordion5"
            onClick={() => toggleAccordion("accordion5")}
            className="flex items-center justify-between py-5 px-5 text-2xl font-medium mb-0.5 cursor-pointer"
          >
            ¿Puedo integrar OKR Genius con otras herramientas que ya estamos
            utilizando?
            <span
              className={`text-5xl transition-transform duration-500 ${
                isActive("accordion5") ? "transform rotate-45" : ""
              }`}
            >
              +
            </span>
          </label>
          <div
            className={`text-left p-7 max-h-0 overflow-hidden transition-all duration-500 ${
              isActive("accordion5") ? "max-h-[600px]" : ""
            }`}
          >
            <hr className="my-4 border-t border-black" />
            <p>
              Claro que sí. OKR Genius se integra perfectamente con una variedad
              de herramientas empresariales, mejorando la precisión de los datos
              y optimizando tu flujo de trabajo actual.
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default FaqAccordion;
