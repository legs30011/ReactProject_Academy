import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; 
import ContactForm from './components/React_Router/ContactForm';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
   
    <ContactForm />
  </React.StrictMode>
);
