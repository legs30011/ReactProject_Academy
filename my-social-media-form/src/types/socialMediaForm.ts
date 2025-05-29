export type SocialMediaPlatform = 'Facebook' | 'Twitter' | 'Instagram' | 'LinkedIn' | 'YouTube' | 'TikTok' | 'Website' | '';
export type SocialMediaLink = {
    platform: SocialMediaPlatform; 
    url: string; 
};
export type SocialMediaFormData = {
    socialMedia: SocialMediaLink[];
};
