import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { FormData } from '../types/formData';

interface Props {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

const Step2Address: React.FC<Props> = ({ register, errors }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block font-semibold mb-1" htmlFor="country">
          País
        </label>
        <input
          {...register('country')}
          id="country"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
            errors.country ? 'border-red-500' : 'border-gray-300'
          }`}
          type="text"
          placeholder="País"
        />
        {errors.country && <p className="text-red-600 text-sm mt-1">{errors.country.message}</p>}
      </div>
      <div>
        <label className="block font-semibold mb-1" htmlFor="city">
          Ciudad
        </label>
        <input
          {...register('city')}
          id="city"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
            errors.city ? 'border-red-500' : 'border-gray-300'
          }`}
          type="text"
          placeholder="Ciudad"
        />
        {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city.message}</p>}
      </div>
      <div>
        <label className="block font-semibold mb-1" htmlFor="zipCode">
          Código Postal
        </label>
        <input
          {...register('zipCode')}
          id="zipCode"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
            errors.zipCode ? 'border-red-500' : 'border-gray-300'
          }`}
          type="text"
          placeholder="Código Postal"
        />
        {errors.zipCode && <p className="text-red-600 text-sm mt-1">{errors.zipCode.message}</p>}
      </div>
    </div>
  );
};

export default Step2Address;
