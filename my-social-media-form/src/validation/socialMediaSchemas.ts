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
    .default(''), 
  url: yup
    .string()
    .url('Ingresa una URL válida (ej. https://assuresoft.com)')
    .required('La URL es obligatoria')
    .default(''), 
});

// Define el esquema principal para el formulario de redes sociales
export const socialMediaFormSchema: yup.ObjectSchema<SocialMediaFormData> = yup.object({
  socialMedia: yup
    .array(socialMediaLinkSchema) // El array contendrá objetos que sigan socialMediaLinkSchema
    .min(1, 'Debes añadir al menos un enlace de red social') 
    .max(5, 'No puedes añadir más de 5 enlaces de red social') 
    .required('Se requiere al menos un enlace') 
    .defined(),
});