## Implementación de Formulario con Arrays de Campos Dinámicos (Enlaces de Redes Sociales)

Este formulario permite a los usuarios añadir y gestionar dinámicamente múltiples enlaces a perfiles de redes sociales, con validación en tiempo real.

### Requisitos y Características:

-   **Campos Dinámicos:** Los usuarios pueden añadir o eliminar campos de enlaces de redes sociales.
-   **Estructura de Campo:** Cada enlace consta de dos campos:
    -   `platform` (select): Plataforma de la red social (ej., Facebook, Twitter, Instagram, LinkedIn, YouTube, TikTok, Sitio Web).
    -   `url` (texto): La URL completa del perfil.
-   **Restricciones de Cantidad:** Se requiere al menos 1 enlace, y el número máximo de enlaces está limitado a 5.
-   **Validación:** Cada `url` debe ser una URL válida.

### Tecnologías Utilizadas:

-   **React:** Biblioteca de JavaScript para construir la interfaz de usuario.
-   **TypeScript:** Superset de JavaScript para tipado estático y seguridad de código.
-   **React Hook Form (`useForm`, `useFieldArray`):** Biblioteca robusta para la gestión del estado del formulario, el registro de campos y, crucialmente, el manejo de arrays de campos dinámicos.
-   **Yup (`yup`, `@hookform/resolvers/yup`):** Biblioteca de validación de esquemas, integrada con React Hook Form.
-   **Tailwind CSS:** Framework de CSS utilitario para un diseño rápido, responsivo y visualmente atractivo.

### Detalles Técnicos y Flujo de Implementación:

1.  **Definición de Tipos** (`src/types/socialMediaForm.ts`):
    * **Cómo funciona:** Se definen interfaces TypeScript para estructurar los datos del formulario.
    * `SocialMediaPlatform`: Un tipo de unión de literales de cadena para las opciones del `select` de plataforma.
    * `SocialMediaLink`: Define la forma de un solo objeto de enlace (`{ platform: string, url: string }`).
    * `SocialMediaFormData`: Define la estructura del formulario completo, que contiene un array de `SocialMediaLink` (`{ socialMedia: SocialMediaLink[] }`).
    * **Propósito:** Asegura que los datos del formulario y los esquemas de validación sean consistentes y tipados correctamente.

2.  **Esquemas de Validación con Yup** (`src/validation/socialMediaSchemas.ts`):
    * **Cómo funciona:** Se crean esquemas de Yup para validar la estructura del formulario.
    * `socialMediaLinkSchema`: Un `yup.object` que valida un solo `SocialMediaLink`.
        * `platform`: Utiliza `yup.mixed().oneOf(...)` para restringir los valores a `SocialMediaPlatform` y `required()` para hacerlo obligatorio.
        * `url`: Utiliza `yup.string().url()` para validar el formato de la URL y `required()` para hacerlo obligatorio.
    * `socialMediaFormSchema`: El esquema principal (`yup.object`) que valida el array `socialMedia`.
        * `socialMedia`: Es un `yup.array(socialMediaLinkSchema)`, lo que significa que cada elemento del array debe seguir las reglas de `socialMediaLinkSchema`.
        * Se aplican `.min(1)` y `.max(5)` directamente al array para las restricciones de cantidad. También se marca como `required()` y `defined()`.
    * **Propósito:** Proporciona validación declarativa para cada campo y para la estructura del array completo, asegurando que los datos cumplan con los requisitos antes del envío.

3.  **Componente Principal del Formulario** (`src/components/SocialMediaForm.tsx`):
    * **`useForm`:** Se inicializa `useForm<SocialMediaFormData>` para la gestión del formulario.
        * `resolver: yupResolver(socialMediaFormSchema)`: Conecta el esquema de validación Yup al formulario.
        * `defaultValues: { socialMedia: [{ platform: '', url: '' }] }`: Inicializa el formulario con al menos un campo vacío para el enlace, cumpliendo el requisito de "al menos 1".
        * `mode: 'onChange'`: Configura la validación para que se ejecute en cada cambio de input, proporcionando retroalimentación en tiempo real.
    * **`useFieldArray`:** Este es el hook central para la funcionalidad dinámica.
        * `const { fields, append, remove } = useFieldArray({ control, name: 'socialMedia' });`
        * `control`: Se pasa desde `useForm` para que `useFieldArray` pueda acceder al estado del formulario.
        * `name: 'socialMedia'`: Especifica el nombre del array en los datos del formulario que `useFieldArray` debe gestionar.
        * `fields`: Un array de objetos que se mapea (`fields.map(...)`) para renderizar cada conjunto de inputs de enlace. Cada objeto `field` tiene una propiedad `id` única para usar como `key` en React.
        * `append({ platform: '', url: '' })`: Se llama al hacer clic en el botón "Añadir Enlace" para agregar un nuevo elemento vacío al array `socialMedia`.
        * `remove(index)`: Se llama al hacer clic en el botón "Eliminar" para remover el elemento en el `index` especificado del array.
    * **Renderizado Dinámico:** Se utiliza `fields.map` para renderizar un bloque de `select` e `input` por cada enlace en el array `fields`. Los atributos `name` de los inputs se construyen dinámicamente (`socialMedia.${index}.platform`, `socialMedia.${index}.url`) para que `react-hook-form` los registre correctamente.
    * **Manejo de Errores:** `errors.socialMedia?.[index]?.platform?.message` y `errors.socialMedia?.[index]?.url?.message` se utilizan para mostrar mensajes de error específicos debajo de cada campo.
    * **Deshabilitar Botones:** Los botones "Añadir Enlace" y "Eliminar" se deshabilitan condicionalmente (`disabled={fields.length >= 5}` y `disabled={fields.length <= 1}`) para hacer cumplir las restricciones de cantidad mínima y máxima.
    * **Envío del Formulario:** `handleSubmit(onSubmit)` envuelve la función `onSubmit`, que se ejecuta solo si el formulario es válido. Los datos validados se imprimen en la consola.

4.  **Estilado con Tailwind CSS:**
    * **Cómo funciona:** Se aplican directamente clases de Tailwind CSS en el JSX del componente `SocialMediaForm.tsx`.
    * **Propósito:** Crear un diseño moderno y responsivo, incluyendo gradientes de fondo, sombras, bordes redondeados, espaciado consistente, y efectos visuales en los botones (`hover:scale-105`, colores dinámicos para estados `disabled`). Los mensajes de error también se estilizan para ser claros y visibles.
