import React, { useState, useEffect } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormData } from '../types/formData';
import { schemas } from '../validation/schemas';

import Step1PersonalInfo from './Step1PersonalInfo';
import Step2Address from './Step2Address';
import Step3Preferences from './Step3Preferences';
import Step4ReviewSubmit from './Step4ReviewSubmit';

const localStorageKey = 'multiStepFormData';
const initialValues: FormData = {
  name: '',
  age: '', 
  email: '',
  country: '',
  city: '',
  zipCode: '',
  preferredContact: '',
  subscribeNewsletter: false,
  favoriteCategory: '',
};

const MultiStepForm: React.FC = () => {
  const [currentStep, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(() => {
    try {
      const saved = localStorage.getItem(localStorageKey);
      return saved ? JSON.parse(saved) : initialValues;
    } catch (error) {
      console.error("Error al analizar los datos de localStorage, usando valores iniciales:", error);
      return initialValues;
    }
  });

  // Configuración de react-hook-form.
  // El 'resolver' usa el esquema correspondiente al paso actual.
  const methods = useForm<FormData>({
    mode: 'onChange', // Valida al cambiar los campos
    resolver: yupResolver(schemas[currentStep]), // Usa el esquema Yup para el paso actual
    defaultValues: formData, // Establece los valores por defecto del formulario
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger, // Para forzar la validación
    watch, 
    reset, 
  } = methods;

  // Efecto para guardar los datos del formulario en localStorage cada vez que cambian.
  useEffect(() => {
    const subscription = watch((value) => {
      setFormData((prev) => {
        const updated = { ...prev, ...value };
        localStorage.setItem(localStorageKey, JSON.stringify(updated));// Actualiza los datos en localStorage
        return updated;
      });
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Efecto para resetear el formulario cada vez que cambia el paso o los datos del formulario.
  useEffect(() => {
    reset(formData);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, reset]);

  const onNextStep = async () => {
    // Dispara la validación de los campos del paso actual.
    const valid = await trigger();
    if (!valid) {
      console.log("La validación falló para el paso actual.");
      return;
    }
    // Si la validación es exitosa y no es el último paso, avanza.
    if (currentStep < 3) { // 3 por que es el ultimo paso
      setStep((s) => s + 1);
    }
  };

  // Manejador para retroceder al paso anterior.
  const onBackStep = () => {
    if (currentStep > 0) setStep((s) => s - 1);
  };

  // Manejador para enviar el formulario.
  // Se tipifica explícitamente como SubmitHandler<FormData>.
  const onSubmit: SubmitHandler<FormData> = (data) => {
    alert('¡Formulario enviado! Revisa la consola para ver los datos.'); 
    console.log('Datos enviados:', data);
    localStorage.removeItem(localStorageKey); // Limpia los datos guardados
    setStep(0); // Reinicio de 0 
    setFormData(initialValues); // Reinicia el estado de los datos del formulario
    reset(initialValues); // Reinicia el estado de react-hook-form
  };

  // Renderiza el componente del paso actual.
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <Step1PersonalInfo register={register} errors={errors} />;
      case 1:
        return <Step2Address register={register} errors={errors} />;
      case 2:
        return <Step3Preferences register={register} errors={errors} formData={formData} />;
      case 3:
        return <Step4ReviewSubmit formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Formulario Multi-Paso</h1>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {renderStep()}
          <div className="mt-6 flex justify-between">
            {currentStep > 0 ? (
              <button
                type="button"
                onClick={onBackStep}
                className="px-6 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
              >
                Atrás
              </button>
            ) : (
              <div /> // Div vacío para mantener el diseño cuando el botón 'Atrás' no está presente
            )}
            {currentStep < 3 ? ( // Si no es el último paso (Revisar/Enviar)
              <button
                type="button"
                onClick={onNextStep}
                disabled={!isValid} // Deshabilita si los campos del paso actual no son válidos
                className={`px-6 py-2 rounded-md text-white ${
                  isValid ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-300 cursor-not-allowed'
                }`}
              >
                Siguiente
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
              >
                Enviar
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default MultiStepForm;