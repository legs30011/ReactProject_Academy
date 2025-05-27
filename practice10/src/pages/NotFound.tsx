// src/pages/NotFound.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const NotFound: React.FC = () => {
  const navigate = useNavigate(); // Hook para navegar programáticamente

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
      <h1 className="text-5xl font-extrabold text-red-600 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Página No Encontrada</h2>
      <p className="text-lg text-gray-700 mb-8">
        ¡Ups! La página que estás buscando no existe.
      </p>
      {/* Botón para navegar de vuelta a la página de inicio */}
      <button
        onClick={() => navigate('/')} 
        className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full text-xl font-semibold shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105 duration-300"
      >
        Ir a Inicio
      </button>
    </div>
  );
};

export default NotFound;
