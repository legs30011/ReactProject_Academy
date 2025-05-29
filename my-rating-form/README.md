## Implementación de Formulario de Calificación con Validación Condicional

Este formulario permite a los usuarios calificar una experiencia y proporcionar feedback, con una validación condicional inteligente para el mensaje.

### Requisitos y Características:

-   **Campos:** Nombre (texto), Calificación (1-5 estrellas), Mensaje de Feedback (texto).
-   **Validación Condicional:** El campo de mensaje de feedback es **obligatorio** si la calificación es menor a 3 estrellas.
-   **Visualización de Contenido:** Los datos enviados del formulario se muestran directamente debajo del formulario.

### Tecnologías Utilizadas:

-   **React:** Biblioteca de JavaScript para construir la interfaz de usuario.
-   **TypeScript:** Superset de JavaScript para tipado estático y seguridad de código.
-   **Formik:** Biblioteca para la gestión de formularios en React, simplificando el manejo del estado, la validación y el envío.
-   **Yup:** Biblioteca de validación de esquemas, utilizada para definir las reglas de validación, incluyendo la lógica condicional.
-   **Tailwind CSS:** Framework de CSS utilitario para un diseño rápido, responsivo y visualmente atractivo.

### Detalles Técnicos y Flujo de Implementación:

1.  **Definición de Tipos** (`src/types/ratingForm.ts`):
    * **Cómo funciona:** Se define la estructura de los datos del formulario utilizando una interfaz TypeScript.
    * `RatingFormData`: Contiene `name` (string), `rating` (number), y `feedback` (string).
    * `SubmittedRatingData`: Se define para el estado que almacena los datos una vez enviados (en este caso, es idéntico a `RatingFormData`).
    * **Propósito:** Asegura que los datos del formulario y los esquemas de validación sean consistentes y tipados correctamente, aprovechando las ventajas de TypeScript.

2.  **Esquema de Validación con Yup** (`src/validation/ratingSchemas.ts`):
    * **Cómo funciona:** Se define `ratingFormSchema` utilizando `yup.object` para estructurar las reglas de validación.
        * `name`: `yup.string().trim().required(...)` asegura que el nombre sea una cadena no vacía.
        * `rating`: `yup.number().min(1).max(5).required().typeError(...)` valida que la calificación sea un número entre 1 y 5, y que sea obligatorio.
        * `feedback`: Se utiliza `yup.string().trim().default('')` como base para asegurar que siempre sea una cadena. La validación condicional se implementa con `.when('rating', { ... })`:
            * `is: (rating: number) => rating < 3`: La condición que evalúa si la calificación es menor a 3.
            * `then: (schema) => schema.required(...)`: Si la condición es `true`, el campo `feedback` se vuelve obligatorio.
            * `otherwise: (schema) => schema`: Si la condición es `false` (calificación 3 o más), el campo `feedback` permanece opcional (su valor por defecto ya es `''`).
    * **Propósito:** Proporciona validación declarativa y condicional, asegurando que los datos cumplan con los requisitos antes del envío, especialmente la regla dinámica del feedback.

3.  **Componente Principal del Formulario** (`src/components/RatingForm.tsx`):
    * **`Formik` Componente:** Es el contenedor principal del formulario.
        * `initialValues`: Se inicializa con un objeto `RatingFormData` (`{ name: '', rating: 0, feedback: '' }`).
        * `validationSchema`: Se le pasa `ratingFormSchema` para que Formik use Yup para la validación.
        * `onSubmit`: La función que se ejecuta cuando el formulario es válido y se envía. Recibe los `values` del formulario y `FormikHelpers` para controlar el estado de envío (`setSubmitting`) y resetear el formulario (`resetForm`).
    * **`Field` Componente:** Se utiliza para renderizar los campos de input (`name`, `feedback`). Para el campo `feedback`, se usa `as="textarea"` para renderizar un `textarea`.
    * **Manejo de Calificación (Estrellas):**
        * Se mapean los números del 1 al 5 para crear botones de radio personalizados que representan las estrellas.
        * `setFieldValue('rating', star)` se utiliza en el `onChange` de cada radio para actualizar el valor de `rating` en el estado de Formik.
        * La clase CSS (`text-yellow-400` vs `text-gray-300`) se aplica condicionalmente para "iluminar" las estrellas seleccionadas.
    * **`ErrorMessage` Componente:** Proporcionado por Formik, muestra los mensajes de error de validación para cada campo (`name`, `rating`, `feedback`).
    * **Visualización de Datos Enviados:**
        * El estado `submittedData` (usando `useState`) en `src/components/RatingForm.tsx` almacena los datos del formulario después de un envío exitoso.
        * Un renderizado condicional (`{submittedData && (...) }`) muestra estos datos debajo del formulario en un bloque estilizado con Tailwind CSS.
    * **Propósito:** Orquesta la interfaz de usuario del formulario, maneja la interacción del usuario, aplica la validación y gestiona la lógica de envío y visualización de resultados.

4.  **Estilado con Tailwind CSS:**
    * **Cómo funciona:** Se aplican directamente clases de utilidad de Tailwind CSS en el JSX del componente `src/components/RatingForm.tsx`.
    * **Propósito:** Proporciona un diseño moderno y responsivo. Esto incluye gradientes de fondo (`bg-gradient-to-br`), tarjetas elevadas (`shadow-2xl`, `rounded-xl`), espaciado (`space-y-6`), tipografía (`font-extrabold`), y estilos interactivos para inputs, radios (estrellas) y botones (efectos `hover`, estados `disabled`).
