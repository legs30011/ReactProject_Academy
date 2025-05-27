// src/App.tsx

// Importaciones necesarias de React y React Router DOM
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importa los componentes de diseño y página
import Layout from './components/Layout';
import Home from './pages/Home';
import BooksPage from './pages/Books';
import BookDetail from './pages/BookDetails';
import NotFound from './pages/NotFound';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
        
          <Route index element={<Home />} />  
          <Route path="books" element={<BooksPage />} />
          <Route path="books/:id" element={<BookDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
