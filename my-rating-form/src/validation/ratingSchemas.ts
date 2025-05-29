// src/validation/ratingSchemas.ts
import * as yup from 'yup';
import type { RatingFormData } from '../types/ratingForm';

export const ratingFormSchema: yup.ObjectSchema<RatingFormData> = yup.object({
name: yup
.string()
.trim()
.required('El nombre es obligatorio'),
rating: yup
.number()
.min(1, 'La calificación debe ser al menos 1 estrella')
.max(5, 'La calificación no puede exceder 5 estrellas')
.required('La calificación es obligatoria')
.typeError('La calificación debe ser un número'),
feedback: yup
.string()
.trim()
.default('') 
.when('rating', {
    is: (rating: number) => rating < 3,
    then: (schema) => schema.required('El mensaje de feedback es obligatorio para calificaciones menores a 3'),
    otherwise: (schema) => schema, // <-- No es necesario .optional() ni .default('') aqui yua lo puse arriba 
}),
});
