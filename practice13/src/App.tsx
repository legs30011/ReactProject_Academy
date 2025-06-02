
import Notification from './components/Notification';
import TriggerButton from './components/TriggerButton';
import { NotificationProvider, NotificationType } from './context/NotificationContext';

function App() {
  return (
    <NotificationProvider>
      <div>
        <h1>Mi App con Notificaciones</h1>
        <Notification />
        <TriggerButton label="Mostrar Éxito" message="¡Operación exitosa!" type={NotificationType.SUCCESS} />
        <TriggerButton label="Mostrar Error" message="¡Ha ocurrido un error!" type={NotificationType.ERROR} />
        <TriggerButton label="Mostrar Info" message="Información importante." type={NotificationType.INFO} />
        <TriggerButton label="Mostrar Advertencia" message="¡Ten cuidado!" type={NotificationType.WARNING} />
        <TriggerButton label="Mostrar Otro Éxito" message="¡Otra acción completada!" type={NotificationType.SUCCESS} />
      </div>
    </NotificationProvider>
  );
}

export default App;