// src/validation/socialMediaSchemas.ts
import * as yup from 'yup';
import type { SocialMediaFormData, SocialMediaPlatform } from '../types/socialMediaForm';

// Define el esquema para un solo enlace de red social
const socialMediaLinkSchema = yup.object({
  platform: yup
    .mixed<SocialMediaPlatform>()
    .oneOf(
      ['Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'YouTube', 'TikTok', 'Website'],
      'Selecciona una plataforma válida'
    )
    .required('La plataforma es obligatoria')
    .default(''), // Asegura que el valor por defecto sea una cadena vacía para el tipo de unión
  url: yup
    .string()
    .url('Ingresa una URL válida (ej. https://ejemplo.com)') // Valida que sea un formato de URL
    .required('La URL es obligatoria')
    .default(''), // Asegura que el valor por defecto sea una cadena vacía
});

// Define el esquema principal para el formulario de redes sociales
export const socialMediaFormSchema: yup.ObjectSchema<SocialMediaFormData> = yup.object({
  socialMedia: yup
    .array(socialMediaLinkSchema) // El array contendrá objetos que sigan socialMediaLinkSchema
    .min(1, 'Debes añadir al menos un enlace de red social') // Mínimo 1 enlace
    .max(5, 'No puedes añadir más de 5 enlaces de red social') // Máximo 5 enlaces
    .required('Se requiere al menos un enlace') // El array en sí es requerido
    .defined(), // Asegura que el array esté definido
});