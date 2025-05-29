// Define los tipos de plataforma de redes sociales permitidos
export type SocialMediaPlatform = 'Facebook' | 'Twitter' | 'Instagram' | 'LinkedIn' | 'YouTube' | 'TikTok' | 'Website' | '';

// Define la estructura de un solo campo de enlace de red social
export type SocialMediaLink = {
    platform: SocialMediaPlatform; // Plataforma seleccionada
    url: string; // URL del enlace
};

// Define la estructura de los datos completos del formulario, que contiene un array de SocialMediaLink
export type SocialMediaFormData = {
    socialMedia: SocialMediaLink[];
};
