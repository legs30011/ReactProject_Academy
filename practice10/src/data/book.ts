// src/data/books.ts
import { Book } from '../types/Book';

const books: Book[] = [
  {
    id: '1',
    title: 'El Señor de los Anillos',
    author: 'J.R.R. Tolkien',
    description: 'Una novela de fantasía épica escrita por el filólogo y profesor universitario británico J. R. R. Tolkien. La historia comienza en la Comarca, una tierra ficticia habitada por hobbits, y sigue a un grupo de compañeros en su misión para destruir un anillo mágico y derrotar al Señor Oscuro Sauron.'
  },
  {
    id: '2',
    title: 'Cien años de soledad',
    author: 'Gabriel García Márquez',
    description: 'Una novela del escritor colombiano Gabriel García Márquez, ganador del Premio Nobel de Literatura en 1982. Es considerada una obra maestra de la literatura hispanoamericana y universal, así como una de las obras más traducidas y leídas en español.'
  },
  {
    id: '3',
    title: '1984',
    author: 'George Orwell',
    description: 'Una novela distópica de ciencia ficción social y una advertencia del autor inglés George Orwell. Publicada el 8 de junio de 1949, fue el noveno y último libro de Orwell completado en vida.'
  },
  {
    id: '4',
    title: 'Orgullo y prejuicio',
    author: 'Jane Austen',
    description: 'Una novela romántica de costumbres escrita por Jane Austen en 1813. La novela sigue el desarrollo del personaje de Elizabeth Bennet, la protagonista dinámica del libro que aprende sobre las repercusiones de los juicios apresurados y llega a apreciar la diferencia entre la bondad superficial y la bondad real.'
  },
  {
    id: '5',
    title: 'Don Quijote de la Mancha',
    author: 'Miguel de Cervantes',
    description: 'La obra más destacada de la literatura española y una de las principales de la literatura universal. Publicada en dos partes, en 1605 y 1615, narra las aventuras de un hidalgo que enloquece leyendo libros de caballerías y decide convertirse en caballero andante.'
  }
];

export default books;
