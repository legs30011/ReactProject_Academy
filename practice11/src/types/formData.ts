export type FormData = {
  name: string;
  age: number | '';
  email: string;
  country: string;
  city: string;
  zipCode: string;
  preferredContact: 'Email' | 'Phone' | 'WhatsApp' | '';
  subscribeNewsletter: boolean;
  favoriteCategory: 'Technology' | 'Health' | 'Art' | 'Travel' | '';
};