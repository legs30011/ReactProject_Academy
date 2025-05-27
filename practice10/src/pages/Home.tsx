import React from 'react';
import { Link } from 'react-router-dom'; 

const Home: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-6">¡MyBooks Assure!</h1>
      <p className="text-lg text-gray-700 mb-8">
        Bienvenido a libros x que encontre 
      </p>
      {/* Enlace para navegar a la página de libros */}
      <Link
        to="/books"
        className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full text-xl font-semibold shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105 duration-300"
      >
        Ver Todos los Libros
      </Link>
    </div>
  );
};

export default Home;
