// src/components/RatingForm.tsx
import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage, type FormikProps, type FormikHelpers } from 'formik'; 
import { ratingFormSchema } from '../validation/ratingSchemas';
import type { RatingFormData, SubmittedRatingData } from '../types/ratingForm';

const RatingForm: React.FC = () => {
  // Estado para almacenar los datos enviados y mostrarlos debajo del formulario
  const [submittedData, setSubmittedData] = useState<SubmittedRatingData | null>(null);

  // Valores iniciales del formulario
  const initialValues: RatingFormData = {
    name: '',
    rating: 0, 
    feedback: '',
  };

  // Manejador de envío del formulario
  const onSubmit = (values: RatingFormData, { setSubmitting, resetForm }: FormikHelpers<RatingFormData>) => { // <-- Tipado corregido aquí
    console.log('Formulario enviado:', values);
    setSubmittedData(values); // Guarda los datos para mostrarlos
    setSubmitting(false); // Indica que el envío ha terminado
    resetForm(); // Opcional: resetea el formulario después del envío
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-200 w-full max-w-lg">
        <h1 className="text-4xl font-extrabold text-purple-800 mb-8 text-center">
          Califica tu Experiencia
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={ratingFormSchema}
          onSubmit={onSubmit}
        >
          {({ values, setFieldValue, isSubmitting, errors, touched }: FormikProps<RatingFormData>) => (
            <Form className="space-y-6">
              {/* Campo Nombre */}
              <div>
                <label htmlFor="name" className="block text-lg font-semibold text-gray-700 mb-2">
                  Tu Nombre
                </label>
                <Field
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Ej: Juan Pérez"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 ${
                    errors.name && touched.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <ErrorMessage name="name" component="p" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Campo Calificación (Estrellas) */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  Calificación (1-5 Estrellas)
                </label>
                <div className="flex justify-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <label key={star} className="cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        value={star}
                        checked={values.rating === star}
                        onChange={() => setFieldValue('rating', star)}
                        className="hidden" // Oculta el input de radio nativo
                      />
                      <span
                        className={`text-5xl transition-colors duration-200 ${
                          star <= values.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    </label>
                  ))}
                </div>
                <ErrorMessage name="rating" component="p" className="text-red-500 text-sm mt-1 text-center" />
              </div>

              {/* Campo Mensaje de Feedback */}
              <div>
                <label htmlFor="feedback" className="block text-lg font-semibold text-gray-700 mb-2">
                  Mensaje de Feedback
                  {values.rating < 3 && <span className="text-red-500 text-sm ml-2">(Obligatorio si calificación &lt; 3)</span>}
                </label>
                <Field
                  id="feedback"
                  name="feedback"
                  as="textarea" // Renderiza como textarea
                  rows={4}
                  placeholder="Comparte tu experiencia..."
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 ${
                    errors.feedback && touched.feedback ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <ErrorMessage name="feedback" component="p" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Botón de Envío */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 rounded-lg bg-purple-600 text-white font-bold text-xl shadow-lg hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Calificación'}
              </button>
            </Form>
          )}
        </Formik>

        {/* Muestra los datos enviados */}
        {submittedData && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Calificación Enviada:
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg shadow-inner space-y-2">
              <p>
                <strong>Nombre:</strong> {submittedData.name}
              </p>
              <p>
                <strong>Calificación:</strong>{' '}
                <span className="text-yellow-500 text-2xl">
                  {'★'.repeat(submittedData.rating)}
                </span>
                <span className="text-gray-300 text-2xl">
                  {'★'.repeat(5 - submittedData.rating)}
                </span>
              </p>
              <p>
                <strong>Feedback:</strong> {submittedData.feedback || '*No proporcionado*'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RatingForm;
