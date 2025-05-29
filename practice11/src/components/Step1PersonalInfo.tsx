import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { FormData } from '../types/formData';

interface Props {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

const Step1PersonalInfo: React.FC<Props> = ({ register, errors }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block font-semibold mb-1" htmlFor="name">
          Nombre
        </label>
        <input
          {...register('name')}
          id="name"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
          type="text"
          placeholder="Tu Nombre"
        />
        {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <label className="block font-semibold mb-1" htmlFor="age">
          Edad
        </label>
        <input
          {...register('age')} // No se necesita valueAsNumber aquí, el esquema lo maneja
          id="age"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
            errors.age ? 'border-red-500' : 'border-gray-300'
          }`}
          type="number"
          placeholder="Tu Edad"
          min={14}
        />
        {errors.age && <p className="text-red-600 text-sm mt-1">{errors.age.message}</p>}
      </div>
      <div>
        <label className="block font-semibold mb-1" htmlFor="email">
          Correo Electrónico
        </label>
        <input
          {...register('email')}
          id="email"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          type="email"
          placeholder="tu.correo@ejemplo.com"
        />
        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
      </div>
    </div>
  );
};

export default Step1PersonalInfo;