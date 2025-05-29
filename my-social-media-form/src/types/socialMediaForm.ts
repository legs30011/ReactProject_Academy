export type SocialMediaPlatform = 'Facebook' | 'Twitter' | 'Instagram' | 'LinkedIn' | 'YouTube' | 'TikTok' | 'Website' | '';

// Define la estructura de un solo campo de enlace de red social
export type SocialMediaLink = {
    platform: SocialMediaPlatform; 
    url: string; // URL del enlace
};
export type SocialMediaFormData = {
    socialMedia: SocialMediaLink[];
};
