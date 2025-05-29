import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import books from '../data/book'; 
import { Book } from '../types/Book'; 

const BookDetail: React.FC = () => {
  // useParams hook: el id le hago extraer
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const book = books.find((b: Book) => b.id === id);
  useEffect(() => {
    if (!book) {
      navigate('/404', { replace: true });
    }
  }, [book, navigate]); 

  // Si el libro no se ha encontrado (y antes de la redirección), muestra un mensaje de carga
  if (!book) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Cargando...</h1>
        <p className="text-gray-700">Redirigiendo a la página no encontrada.</p>
      </div>
    );
  }
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
