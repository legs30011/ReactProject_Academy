import React from 'react';
import { Link, Outlet } from 'react-router-dom'; 

const Layout: React.FC = () => {
  // NavLink personalizado: No me va resaltará el enlace activo , preguntas por uselocation no me tengo quie olvidar
  const NavLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
    return (
      <Link
        to={to}
        // Clases de Tailwind CSS para el enlace
        className={`px-3 py-2 rounded-md transition-colors duration-200 text-white hover:bg-blue-700`}
      >
        {children}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
      <nav className="bg-blue-600 p-4 shadow-md rounded-b-lg">
        <div className="container mx-auto flex justify-between items-center">
          {/* Enlace al inicio de la aplicación */}
          <Link to="/" className="text-white text-2xl font-bold rounded-md hover:bg-blue-700 px-3 py-2 transition-colors duration-200">
            MyBooks App
          </Link>
          <div className="space-x-4">
            {/* Enlaces de navegación usando el componente NavLink */}
            <NavLink to="/">Inicio</NavLink>
            <NavLink to="/books">Libros</NavLink>
          </div>
        </div>
      </nav>
      <main className="container mx-auto p-6">
        {/* Outlet es el placeholder donde React Router renderizará el componente de la ruta anidada actual */}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
