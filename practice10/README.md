Instalación
Para configurar y ejecutar este proyecto localmente, sigue estos pasos:

Crea un nuevo proyecto React con TypeScript (si aún no lo tienes):

npx create-react-app my-books-app --template typescript
cd my-books-app

Instala las dependencias de React Router DOM:

npm install react-router-dom

Instala las dependencias de desarrollo para Tailwind CSS:

npm install -D tailwindcss postcss autoprefixer

Inicializa Tailwind CSS (esto creará tailwind.config.js y postcss.config.js):

npx tailwindcss init -p

Configura tailwind.config.js para que Tailwind escanee tus archivos React (asegúrate de que la sección content incluya "./src/**/*.{js,jsx,ts,tsx}").

Añade las directivas de Tailwind a tu archivo CSS principal (ej. src/index.css):

@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: 'Inter', sans-serif;
}

Conceptos de React Router Implementados
Este proyecto se enfoca en demostrar los siguientes conceptos de React Router:

1. BrowserRouter
Aplicación: En src/App.tsx, el componente principal de la aplicación está envuelto en <Router> (un alias de BrowserRouter). Esto establece el enrutamiento basado en la API de historial del navegador, permitiendo URLs limpias como /books o /books/1.

2. Routes y Route
Aplicación: Definidos en src/App.tsx dentro de <Router>.

<Routes> actúa como un contenedor para todas las definiciones de rutas de la aplicación.

Cada <Route> individual mapea una path (ruta URL) a un element (el componente React que se renderizará). Por ejemplo, <Route path="/books" element={<BooksPage />} /> renderiza BooksPage cuando la URL es /books.

3. Link
Aplicación: Utilizado para la navegación declarativa entre las páginas de la aplicación.

En src/pages/Home.tsx, un <Link to="/books"> lleva al usuario a la lista de libros.

En src/pages/Books.tsx, cada tarjeta de libro es un <Link to={/books/${book.id}}> que navega a la página de detalle de ese libro específico.

En src/components/Layout.tsx, los elementos de la barra de navegación (Inicio, Libros) son también <Link> para la navegación principal.

4. Parámetros de URL (useParams)
Aplicación: En src/pages/BookDetail.tsx, el hook useParams<{ id: string }>() se utiliza para extraer el valor del parámetro id de la URL (ej., si la URL es /books/1, id será 1). Este id se usa luego para buscar y mostrar los detalles del libro correspondiente.

5. Rutas Anidadas (Nested Routes)
Aplicación: Implementado a través del componente src/components/Layout.tsx y el uso de <Outlet /> en src/App.tsx.

La ruta principal <Route path="/" element={<Layout />}> define que el Layout será el componente base.

Las rutas como /books y /books/:id son rutas hijas anidadas dentro de esta ruta principal.

El componente Layout contiene un <Outlet />, que es donde React Router renderiza el componente de la ruta hija que coincide con la URL actual. Esto permite que la barra de navegación del Layout sea persistente mientras el contenido de la página cambia.

6. Paso de Props a Componentes de Ruta
Aplicación: En React Router v6, el paso de props a los componentes de ruta se realiza directamente a través del prop element.

Por ejemplo, en src/App.tsx, cuando se define <Route path="/" element={<Layout />} />, el componente Layout se pasa como un elemento React. Si Layout necesitara props, simplemente se le pasarían como a cualquier otro componente React: element={<Layout someProp="valor" />}.

7. Navegación Programática (useNavigate)
Aplicación: El hook useNavigate() se utiliza para redirigir a los usuarios programáticamente.

En src/pages/BookDetail.tsx, si el ID de un libro en la URL no se encuentra en los datos, navigate('/404', { replace: true }) redirige al usuario a la página 404. La opción replace: true es importante para evitar que la URL inválida permanezca en el historial del navegador.

También se usa en BookDetail.tsx para el botón "Volver a Libros" y en src/pages/NotFound.tsx para el botón "Ir a Inicio", permitiendo una navegación controlada.

8. Páginas 404 (Catch all Pages)
Aplicación: En src/App.tsx, se define una ruta comodín <Route path="*" element={<NotFound />} />. Esta ruta es la última en ser evaluada por Routes. Si ninguna de las rutas definidas anteriormente coincide con la URL actual, esta ruta comodín se activa y renderiza el componente src/pages/NotFound.tsx, mostrando un mensaje de "Página No Encontrada".