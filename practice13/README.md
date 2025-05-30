Sistema de Notificaciones con React Context
Este proyecto implementa un sistema de notificaciones simple y global utilizando React Context. Permite a los componentes de la aplicación disparar notificaciones que se muestran temporalmente sin necesidad de pasar funciones a través de las props.

Funcionalidades
Contexto de Notificación Global: Utiliza React Context para gestionar el estado de las notificaciones de forma centralizada.

Cola de Notificaciones: Soporta una cola, mostrando las notificaciones una tras otra.

Tipos de Notificación: Incluye soporte para diferentes tipos de notificaciones (success, error, info, warning) con estilos visuales distintos.

Auto-Desaparición: Las notificaciones desaparecen automáticamente después de 3 segundos.

Descarte Manual: Incluye un botón "X" para permitir al usuario cerrar las notificaciones manualmente.

Integración con Tailwind CSS: Los estilos se gestionan con Tailwind CSS para una fácil personalización.

Animaciones Fluidas con Framer Motion: Transiciones animadas para la aparición y desaparición de las notificaciones.

Estructura de Carpetas
src/
├── components/
│   ├── Notification.tsx        # Componente visual para mostrar las notificaciones con animaciones.
│   └── TriggerButton.tsx       # Componente de botón para disparar notificaciones.
├── context/
│   └── NotificationContext.tsx # Contexto de React y proveedor para la gestión de notificaciones.
├── App.tsx                     # Componente principal de la aplicación.
├── index.tsx                   # Punto de entrada de la aplicación.
├── tailwind.config.js          # Configuración de Tailwind CSS.
└── tsconfig.json               # Configuración de TypeScript.

Implementación Técnica
1. Contexto de Notificación (src/context/NotificationContext.tsx)
NotificationState: Define la interfaz para la estructura de cada notificación (id, message, type).

NotificationContext: Crea un Contexto de React para compartir el estado y las funciones relacionadas con las notificaciones.

NotificationProvider: Es el componente proveedor que gestiona el estado de la cola de notificaciones (notifications) utilizando useState.

showNotification(message, type): Función para añadir nuevas notificaciones a la cola, asignándoles un id único.

clearNotification(id): Función para eliminar una notificación específica de la cola por su id.

Auto-desaparición: Utiliza useEffect y useRef (timerRefs) para establecer y gestionar temporizadores individuales para cada notificación, asegurando que se auto-eliminen después de 3 segundos.

NotificationType: Objeto const que define los tipos de notificación (SUCCESS, ERROR, INFO, WARNING).

useNotification(): Hook personalizado que encapsula el useContext para un consumo sencillo del contexto en cualquier componente.

2. Componente Notification (src/components/Notification.tsx)
NotificationItem (Subcomponente):

Este componente ha sido extraído para representar una única notificación y es el que interactúa directamente con Framer Motion.

Utiliza props notification y onDismiss para recibir los datos de la notificación y la función para descartarla.

Estilos Dinámicos: Asigna dinámicamente clases de Tailwind CSS (bgColor, textColor) e iconos (icon) basándose en el notification.type.

Animaciones con Framer Motion:

El div principal de la notificación está envuelto en motion.div.

Define animationPresets (un objeto variants) con las propiedades de animación:

initial: Estado inicial (opacidad 0, movido 50px hacia arriba, escala 0.8).

animate: Estado final de la animación de entrada (opacidad 1, posición original, escala 1), con una transición de tipo "spring" para un efecto rebote suave.

exit: Estado final de la animación de salida (opacidad 0, movido 50px hacia arriba, escala 0.8), con una transición más rápida.

Las props initial, animate, exit, y variants de motion.div controlan el comportamiento de la animación.

Botón de Descarte: Incluye un botón "X" que, al hacer clic, llama a onDismiss con el id de la notificación para eliminarla manualmente.

Accesibilidad (A11y): Se utilizan role="status", aria-live="polite", aria-atomic="true" y aria-label en el botón de descarte para mejorar la experiencia de usuarios con lectores de pantalla.

Notification (Componente principal):

Utiliza el hook useNotification() para acceder a la cola de notifications y a la función clearNotification.

createPortal: Renderiza las notificaciones directamente en el document.body. Esto es una buena práctica para elementos que deben flotar por encima de todo lo demás (como modales o notificaciones), ya que evita problemas de z-index y asegura que la notificación no esté limitada por el overflow de sus elementos padres.

AnimatePresence: Envuelve el mapeo de notifications con AnimatePresence. Esto es crucial para que Framer Motion pueda detectar y animar los componentes cuando se desmontan (es decir, cuando una notificación es eliminada de la cola). La prop key={notification.id} en NotificationItem es fundamental para que AnimatePresence funcione correctamente.

3. Componente TriggerButton (src/components/TriggerButton.tsx)
Utiliza el hook useNotification() para acceder a la función showNotification.

Renderiza un botón que, al ser clickeado, llama a showNotification con un message y un type configurables a través de sus props.

Utiliza React.memo y React.useCallback para optimizar el rendimiento y evitar re-renderizaciones innecesarias.

4. Uso (src/App.tsx)
La aplicación completa está envuelta en el componente <NotificationProvider> para habilitar el sistema de notificaciones globalmente.

Se utilizan múltiples instancias de <TriggerButton> para demostrar cómo diferentes componentes pueden disparar notificaciones, tanto en el contenido principal como en la barra de navegación.

El componente <Notification> se incluye para mostrar las notificaciones que se activan.

Flujo de Datos y Animaciones
Disparar Notificación:

Un componente (TriggerButton) llama a showNotification() con un mensaje y tipo.

Flujo: TriggerButton → useNotification() → showNotification() (del contexto) → El NotificationProvider actualiza su estado notifications añadiendo la nueva notificación a la cola.

Aparición de la Notificación:

El cambio en el estado notifications provoca que el componente Notification (que está envuelto en createPortal) se re-renderice.

AnimatePresence detecta que un nuevo NotificationItem (con su key única) ha sido añadido a la lista renderizada.

Flujo: NotificationProvider (estado notifications actualizado) → Notification (re-render) → AnimatePresence detecta nuevo NotificationItem → motion.div del NotificationItem ejecuta la animación initial a animate definida en animationPresets (aparece con un efecto de resorte).

Auto-Desaparición / Descarte Manual:

Auto-desaparición: Después de 3 segundos, un temporizador en el NotificationProvider llama a clearNotification() con el id de la notificación.

Descarte manual: El usuario hace clic en el botón "X" de la notificación, lo que llama a onDismiss() (que es clearNotification() del contexto) con el id de la notificación.

Flujo: NotificationProvider (temporizador expira o clearNotification llamado) → Estado notifications actualizado (notificación eliminada) → Notification (re-render) → AnimatePresence detecta que el NotificationItem ha sido eliminado de la lista → motion.div del NotificationItem ejecuta la animación exit definida en animationPresets (desaparece con un efecto de desvanecimiento y movimiento).

Instalación
Para ejecutar este proyecto, asegúrate de tener Node.js y npm (o yarn) instalados.

Clona el repositorio (o crea los archivos manualmente según la estructura).

Navega a la raíz del proyecto en tu terminal.

Instala las dependencias:

npm install
# o
yarn install

Instala Framer Motion:

npm install framer-motion
# o
yarn add framer-motion

Inicia el servidor de desarrollo:

npm run dev
# o
yarn dev

Esto debería abrir la aplicación en tu navegador en http://localhost:5173/ (o un puerto similar).