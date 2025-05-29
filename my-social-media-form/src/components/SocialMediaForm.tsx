// src/components/SocialMediaForm.tsx
import React from 'react';
import { useForm, useFieldArray, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { SocialMediaFormData } from '../types/socialMediaForm';
import { socialMediaFormSchema } from '../validation/socialMediaSchemas';

const SocialMediaForm: React.FC = () => {
  // Configuración de react-hook-form
  const {
    control, // Necesario para useFieldArray
    register, // Para registrar inputs
    handleSubmit, // Para manejar el envío del formulario
    formState: { errors },
  } = useForm<SocialMediaFormData>({
    resolver: yupResolver(socialMediaFormSchema), // Usa el esquema Yup para la validación
    defaultValues: {
      // Valores por defecto: un array con un enlace vacío inicialmente
      socialMedia: [{ platform: '', url: '' }],
    },
    mode: 'onChange', // Valida al cambiar los campos
  });

  // useFieldArray para manejar los campos dinámicos 'socialMedia'
  const { fields, append, remove } = useFieldArray({
    control, // Pasa el control de useForm
    name: 'socialMedia', // El nombre del array en SocialMediaFormData
  });

  // Manejador para el envío del formulario
  const onSubmit: SubmitHandler<SocialMediaFormData> = (data) => {
    console.log('Datos del formulario enviados:', data);
    alert('Formulario enviado! Revisa la consola para ver los datos.');
    // Aquí podrías enviar los datos a una API, etc.
  };

  // Observa los valores del formulario para depuración (opcional)
  // const formValues = watch();
  // useEffect(() => {
  //   console.log('Valores del formulario:', formValues);
  // }, [formValues]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-200 w-full max-w-2xl">
        <h1 className="text-4xl font-extrabold text-indigo-800 mb-8 text-center">
          Enlaces de Redes Sociales
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Muestra los errores generales del array si existen */}
          {errors.socialMedia && (
            <p className="text-red-600 text-sm mb-4 font-medium">
              {errors.socialMedia.message || 'Error en los enlaces de redes sociales.'}
            </p>
          )}

          {/* Renderiza cada campo de red social */}
          {fields.map((field, index) => (
            <div
              key={field.id} // Clave única para cada campo dinámico
              className="flex flex-col md:flex-row items-center gap-4 bg-gray-50 p-4 rounded-lg shadow-inner border border-gray-100"
            >
              {/* Campo de selección de plataforma */}
              <div className="flex-1 w-full">
                <label htmlFor={`socialMedia.${index}.platform`} className="sr-only">
                  Plataforma
                </label>
                <select
                  id={`socialMedia.${index}.platform`}
                  {...register(`socialMedia.${index}.platform`)}
                  className={`w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ${
                    errors.socialMedia?.[index]?.platform ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Selecciona Plataforma</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Twitter">Twitter</option>
                  <option value="Instagram">Instagram</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="YouTube">YouTube</option>
                  <option value="TikTok">TikTok</option>
                  <option value="Website">Sitio Web</option>
                </select>
                {errors.socialMedia?.[index]?.platform && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.socialMedia[index]?.platform?.message}
                  </p>
                )}
              </div>

              {/* Campo de URL */}
              <div className="flex-2 w-full">
                <label htmlFor={`socialMedia.${index}.url`} className="sr-only">
                  URL
                </label>
                <input
                  id={`socialMedia.${index}.url`}
                  type="text"
                  placeholder="https://tu-enlace.com"
                  {...register(`socialMedia.${index}.url`)}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ${
                    errors.socialMedia?.[index]?.url ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.socialMedia?.[index]?.url && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.socialMedia[index]?.url?.message}
                  </p>
                )}
              </div>

              {/* Botón para eliminar campo */}
              <button
                type="button"
                onClick={() => remove(index)}
                // Deshabilita el botón si solo queda 1 campo (mínimo requerido)
                disabled={fields.length <= 1}
                className={`flex-shrink-0 p-3 rounded-lg shadow-sm transition duration-300 ease-in-out transform hover:scale-105 ${
                  fields.length <= 1
                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
                title="Eliminar enlace"
              >
                {/* Icono de papelera o texto "Eliminar" */}
                <span>🗑️</span>
              </button>
            </div>
          ))}

          {/* Controles de añadir y enviar */}
          <div className="flex justify-between items-center mt-6">
            {/* Botón para añadir nuevo campo */}
            <button
              type="button"
              onClick={() => append({ platform: '', url: '' })}
              // Deshabilita el botón si ya hay 5 campos (máximo permitido)
              disabled={fields.length >= 5}
              className={`py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 ${
                fields.length >= 5
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 text-white font-bold'
              }`}
            >
              Añadir Enlace
            </button>

            {/* Botón de envío del formulario */}
            <button
              type="submit"
              className="py-3 px-6 rounded-lg bg-indigo-600 text-white font-bold shadow-lg hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Guardar Enlaces
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SocialMediaForm;