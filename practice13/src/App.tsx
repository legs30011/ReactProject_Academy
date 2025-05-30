import React from 'react';
import { NotificationProvider, NotificationType } from './context/NotificationContext';
import Notification from './components/Notification';
import TriggerButton from './components/TriggerButton';
import './App.css';

/**
 * @function App
 * @description The main application component.
 * It wraps the content with NotificationProvider and demonstrates notification usage.
 * @returns {JSX.Element} The main application layout.
 */
const App: React.FC = () => {
  return (
    <NotificationProvider>
      <div className="min-h-screen bg-gray-100 font-sans antialiased flex flex-col">
        <Notification />

        {/* Navbar */}
        <nav className="bg-white shadow-sm p-4 flex justify-between items-center rounded-b-lg">
          <h1 className="text-xl font-bold text-gray-800">My App</h1>
          <div className="flex space-x-4">
            <TriggerButton label="Mostrar Info (Nav)" message="¡Bienvenido a la aplicación!" type={NotificationType.INFO} />
            <TriggerButton label="Mostrar Error (Nav)" message="Error al cargar los datos." type={NotificationType.ERROR} />
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow container mx-auto p-6 flex flex-col items-center justify-center space-y-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">PRACTICA13</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Mensaje de Éxito</h3>
              <p className="text-gray-600 text-center">Indica una operación exitosa.</p>
              <TriggerButton label="Mostrar Éxito" message="¡Elemento guardado correctamente!" type={NotificationType.SUCCESS} />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Mensaje de Error</h3>
              <p className="text-gray-600 text-center">Alerta sobre un problema crítico.</p>
              <TriggerButton label="Mostrar Error" message="¡Fallo la autenticación del usuario!" type={NotificationType.ERROR} />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Mensaje de Información</h3>
              <p className="text-gray-600 text-center">Proporciona información general.</p>
              <TriggerButton label="Mostrar Información" message="Hay nuevas actualizaciones disponibles." type={NotificationType.INFO} />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Mensaje de Advertencia</h3>
              <p className="text-gray-600 text-center">Advierte sobre posibles problemas.</p>
              <TriggerButton label="Mostrar Advertencia" message="¡Espacio en disco bajo detectado!" type={NotificationType.WARNING} />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white p-4 text-center text-sm rounded-t-lg mt-8">
          <p>&copy; GAMBOA PRACTICA 13</p>
        </footer>
      </div>
    </NotificationProvider>
  );
};

export default App;
