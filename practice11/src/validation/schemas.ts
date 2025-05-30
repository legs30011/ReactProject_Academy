import * as yup from 'yup';
import { FormData } from '../types/formData';

// --- HELPERS PARA TIPOS COMUNES ---
const optionalStringDefaultEmpty = yup.string().default('');
const optionalMixedContactDefaultEmpty = yup.mixed<'Email' | 'Phone' | 'WhatsApp' | ''>().default('');
const optionalMixedCategoryDefaultEmpty = yup.mixed<'Technology' | 'Health' | 'Art' | 'Travel' | ''>().default('');

const ageSchema = yup.mixed<number | ''>()
  .transform((value, originalValue) => {
    if (originalValue === null || originalValue === undefined || (typeof originalValue === 'string' && originalValue.trim() === '')) {
      return '';
    }
    const numValue = Number(value);
    return isNaN(numValue) ? '' : numValue;
  })
  .test('is-age-valid', 'La edad debe ser un  numero menor a 90 y mayor igual a 14', function(value) {
    if (value === '') {
      return true;
    }
    const numValue = Number(value);
    return !isNaN(numValue) && numValue >= 14 && numValue <= 90;
  })
  .default('');

// --- ESQUEMAS PARA CADA PASO DEL FORMULARIO ---
export const step1Schema: yup.ObjectSchema<FormData> = yup.object({
  name: yup.string().required('El nombre es obligatorio'),
  age: ageSchema.required('La edad es obligatoria'),
  email: yup.string().email('Debe ser un correo electrónico válido').required('El correo electrónico es obligatorio'),
  country: optionalStringDefaultEmpty,
  city: optionalStringDefaultEmpty,
  zipCode: optionalStringDefaultEmpty,
  preferredContact: optionalMixedContactDefaultEmpty,
  subscribeNewsletter: yup.boolean().default(false),
  favoriteCategory: optionalMixedCategoryDefaultEmpty,
});

export const step2Schema: yup.ObjectSchema<FormData> = yup.object({
  name: optionalStringDefaultEmpty,
  age: ageSchema,
  email: optionalStringDefaultEmpty,
  country: yup.string().required('El país es obligatorio'),
  city: yup.string().required('La ciudad es obligatoria'),
  zipCode: yup
    .string()
    .required('El código postal es obligatorio')
    .matches(/^[0-9]{5}(?:-[0-9]{4})?$/, 'Debe ser un código postal válido'),
  preferredContact: optionalMixedContactDefaultEmpty,
  subscribeNewsletter: yup.boolean().default(false),
  favoriteCategory: optionalMixedCategoryDefaultEmpty,
});

export const step3Schema: yup.ObjectSchema<FormData> = yup.object({
  name: optionalStringDefaultEmpty,
  age: ageSchema,
  email: optionalStringDefaultEmpty,
  country: optionalStringDefaultEmpty,
  city: optionalStringDefaultEmpty,
  zipCode: optionalStringDefaultEmpty,
  preferredContact: yup
    .mixed<'Email' | 'Phone' | 'WhatsApp' | ''>()
    .oneOf(['Email', 'Phone', 'WhatsApp'], 'Por favor, selecciona un método de contacto')
    .required('El método de contacto preferido es obligatorio'),
  subscribeNewsletter: yup.boolean().default(false),
  favoriteCategory: yup
    .mixed<'Technology' | 'Health' | 'Art' | 'Travel' | ''>()
    .oneOf(['Technology', 'Health', 'Art', 'Travel'], 'Por favor, selecciona una categoría')
    .required('La categoría favorita es obligatoria'),
});

// Esquema para el paso 4 (ReviewSubmit). 
// react-hook-form espera un esquema válido. Un esquema de objeto vacío funciona xd 
export const step4Schema: yup.ObjectSchema<FormData> = yup.object({
  name: yup.string().optional().default(''), // Añadir .default('') para que el tipo sea solo string
  age: yup.mixed<number | ''>().optional().default(''),
  email: yup.string().email().optional().default(''),
  country: yup.string().optional().default(''),
  city: yup.string().optional().default(''),
  zipCode: yup.string().optional().default(''),
  preferredContact: yup.mixed<'Email' | 'Phone' | 'WhatsApp' | ''>().optional().default(''),
  subscribeNewsletter: yup.boolean().optional().default(false),
  favoriteCategory: yup.mixed<'Technology' | 'Health' | 'Art' | 'Travel' | ''>().optional().default(''),
});
// El array de esquemas, ahora con el esquemapara este ultiumo paso
export const schemas: yup.ObjectSchema<FormData>[] = [step1Schema, step2Schema, step3Schema, step4Schema];