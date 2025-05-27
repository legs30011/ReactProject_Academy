import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import books from '../data/book'; 
import { Book } from '../types/Book'; 

const BookDetail: React.FC = () => {
  // useParams hook: el id le hago extraer
  const { id } = useParams<{ id: string }>();
  // useNavigate hook: me permite la navegación programática dentro de la aplicación
  const navigate = useNavigate();
  const book = books.find((b: Book) => b.id === id); // Se especifica el tipo Book para mayor claridad

  // useEffect hook: Se ejecuta después de cada renderizado para manejar efectos secundarios
  useEffect(() => {
    if (!book) {
      // Redirige al usuario a la página 404.
      // 'replace: true' asegura que la entrada actual en el historial del navegador sea reemplazada,
      // evitando que el usuario pueda volver a la URL inválida con el botón de "atrás".
      navigate('/404', { replace: true });
    }
  }, [book, navigate]); // Dependencias del efecto: el efecto se re-ejecuta si 'book' o 'navigate' cambian

  // Si el libro no se ha encontrado (y antes de la redirección), muestra un mensaje de carga
  if (!book) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Cargando...</h1>
        <p className="text-gray-700">Redirigiendo a la página no encontrada.</p>
      </div>
    );
  }

  // Si el libro se encuentra, renderiza sus detalles
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">{book.title}</h1>
      <p className="text-xl text-gray-600 italic mb-6">por {book.author}</p>
      <p className="text-lg text-gray-800 leading-relaxed">{book.description}</p>
      <button
        onClick={() => navigate('/books')} 
        className="mt-8 bg-blue-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105 duration-300"
      >
        Volver a Libros
      </button>
    </div>
  );
};

export default BookDetail;
