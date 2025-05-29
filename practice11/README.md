# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Implementación de Formulario Multi-Paso

Este formulario guía al usuario a través de cuatro pasos distintos, recopilando información personal, de dirección y preferencias antes de la revisión final y el envío.

### Pasos del Formulario:

1.  **Información Personal** (`src/components/Step1PersonalInfo.tsx`):
    * Campos: Nombre (texto, obligatorio), Edad (número, mínimo 14, obligatorio), Email (email válido, obligatorio).
    * **Implementación:** Se utilizan los métodos `register` de `react-hook-form` para registrar los inputs y se muestran los errores de validación (`errors`).
    * **Validación:** Definida en `src/validation/schemas.ts` dentro de `step1Schema` usando Yup.

2.  **Dirección** (`src/components/Step2Address.tsx`):
    * Campos: País (texto, obligatorio), Ciudad (texto, obligatorio), Código Postal (texto, formato válido, obligatorio).
    * **Implementación:** Similar al Paso 1, se registran los inputs y se muestran los errores.
    * **Validación:** Definida en `src/validation/schemas.ts` dentro de `step2Schema` con Yup.

3.  **Preferencias** (`src/components/Step3Preferences.tsx`):
    * Campos: Método de Contacto Preferido (radio: Email/Phone/WhatsApp, obligatorio), ¿Suscribirse al Boletín? (checkbox), Categoría Favorita (select: Tecnología/Salud/Arte/Viajes, obligatorio).
    * **Implementación:** Registro de los diferentes tipos de input (radio, checkbox, select).
    * **Validación:** Definida en `src/validation/schemas.ts` dentro de `step3Schema` usando Yup.

4.  **Revisión y Envío** (`src/components/Step4ReviewSubmit.tsx`):
    * Muestra la información recopilada del estado global del formulario (`formData`) para su revisión.
    * **Implementación:** Accede a los datos del formulario y los renderiza. El botón "Enviar" activa la función `onSubmit` en el componente principal (`src/components/MultiStepForm.tsx`).

### Funcionalidades Clave y Rutas:

* **Navegación entre Pasos:**
    * Botones "Atrás" y "Siguiente" en `src/components/MultiStepForm.tsx` controlan el estado `currentStep` (usando `useState` en `src/components/MultiStepForm.tsx`).
    * La función `onNextStep` en `src/components/MultiStepForm.tsx` utiliza `trigger()` de `react-hook-form` para validar el paso actual antes de avanzar.
    * La función `onBackStep` en `src/components/MultiStepForm.tsx` simplemente decrementa `currentStep`.

* **Validación por Paso con Yup:**
    * Los esquemas de validación para cada paso se definen en `src/validation/schemas.ts` (`step1Schema`, `step2Schema`, `step3Schema`, `step4Schema`).
    * En `src/components/MultiStepForm.tsx`, el `resolver: yupResolver(schemas[currentStep])` en `useForm` asocia el esquema correcto al paso actual.

* **Persistencia con `localStorage`:**
    * En `src/components/MultiStepForm.tsx`, un `useEffect` escucha los cambios en los valores del formulario (`watch` de `react-hook-form`) y los guarda en `localStorage` con la clave `'multiStepFormData'`.
    * Al inicializar `formData` (usando la inicialización perezosa de `useState`), se intenta leer los datos de `localStorage`.

* **Componente Principal del Formulario** (`src/components/MultiStepForm.tsx`):
    * Utiliza `FormProvider` para proveer los métodos de `useForm` a los componentes de los pasos.
    * Mantiene el estado global del formulario (`formData` con `useState`).
    * Renderiza el componente del paso actual dinámicamente basado en `currentStep`.

En resumen, el flujo se maneja principalmente en `src/components/MultiStepForm.tsx`, orquestando la navegación, la validación (definida en `src/validation/schemas.ts`), la persistencia y la renderización de los componentes de cada paso (ubicados en la carpeta `src/components`).