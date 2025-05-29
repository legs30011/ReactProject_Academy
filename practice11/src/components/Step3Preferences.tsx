import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { FormData } from '../types/formData';

interface Props {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  formData: FormData; // Se usa para establecer los valores por defecto de los radios/checkboxes
}

const Step3Preferences: React.FC<Props> = ({ register, errors, formData }) => {
  return (
    <div className="space-y-4">
      <fieldset>
        <legend className="font-semibold mb-2">Método de Contacto Preferido</legend>
        <div className="flex gap-4">
          {['Email', 'Phone', 'WhatsApp'].map((method) => (
            <label key={method} className="flex items-center space-x-2">
              <input
                {...register('preferredContact')}
                type="radio"
                value={method}
                // defaultChecked es importante para que el estado inicial del radio coincida con formData
                defaultChecked={formData.preferredContact === method}
                className="form-radio text-indigo-600"
              />
              <span>{method}</span>
            </label>
          ))}
        </div>
        {errors.preferredContact && (
          <p className="text-red-600 text-sm mt-1">{errors.preferredContact.message}</p>
        )}
      </fieldset>
      <div className="flex items-center space-x-2">
        <input
          {...register('subscribeNewsletter')}
          id="subscribeNewsletter"
          type="checkbox"
          // defaultChecked es importante para que el estado inicial del checkbox coincida con formData
          defaultChecked={formData.subscribeNewsletter}
          className="form-checkbox text-indigo-600"
        />
        <label htmlFor="subscribeNewsletter">¿Suscribirse al Boletín?</label>
      </div>
      <div>
        <label className="block font-semibold mb-1" htmlFor="favoriteCategory">
          Categoría Favorita
        </label>
        <select
          {...register('favoriteCategory')}
          id="favoriteCategory"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
            errors.favoriteCategory ? 'border-red-500' : 'border-gray-300'
          }`}
          defaultValue={formData.favoriteCategory} // Establece el valor por defecto del select
        >
          <option value="">Selecciona una categoría</option>
          <option value="Technology">Tecnología</option>
          <option value="Health">Salud</option>
          <option value="Art">Arte</option>
          <option value="Travel">Viajes</option>
        </select>
        {errors.favoriteCategory && (
          <p className="text-red-600 text-sm mt-1">{errors.favoriteCategory.message}</p>
        )}
      </div>
    </div>
  );
};

export default Step3Preferences;
