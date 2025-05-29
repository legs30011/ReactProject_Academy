export type RatingFormData = {
    name: string;
    rating: number; // Valor de 1 a 5 estrellas
    feedback: string; // Mensaje de feedback
};

// Define el tipo para los datos enviados (opcional, podría ser el mismo que RatingFormData)
export type SubmittedRatingData = RatingFormData;