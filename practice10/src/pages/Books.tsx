// src/pages/Books.tsx
import React from 'react';
import { Link } from 'react-router-dom'; 
import books from '../data/book'; 
import { Book } from '../types/Book'; 

const BooksPage: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">Nuestra Colección de Libros</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Itera sobre el array de libros para crear un enlace para cada uno */}
        {books.map((book: Book) => ( //esto por temas de claridad el tipo de libro
          <Link
            key={book.id}
            to={`/books/${book.id}`} //URL dinámica con el ID del libro como parámetro
            className="block border border-gray-200 rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-blue-50 to-white hover:from-blue-100"
          >
            <h2 className="text-2xl font-semibold text-blue-800 mb-2">{book.title}</h2>
            <p className="text-gray-600 italic mb-4">por {book.author}</p>
            <p className="text-gray-700 line-clamp-3">{book.description}</p>
            <span className="mt-4 inline-block text-blue-600 hover:underline">Leer Más &rarr;</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BooksPage;
