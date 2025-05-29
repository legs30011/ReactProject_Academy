// Si tu package.json tiene "type": "module" (común en Vite):
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default {
    plugins: [
    tailwindcss,
    autoprefixer,
    ],
};
