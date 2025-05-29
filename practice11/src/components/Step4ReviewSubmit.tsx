import React from 'react';
import { FormData } from '../types/formData';

interface Props {
  formData: FormData;
}

const Step4ReviewSubmit: React.FC<Props> = ({ formData }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Revisa tu Información</h2>
      <div>
        <strong>Nombre:</strong> {formData.name}
      </div>
      <div>
        <strong>Edad:</strong> {formData.age}
      </div>
      <div>
        <strong>Correo Electrónico:</strong> {formData.email}
      </div>
      <div>
        <strong>País:</strong> {formData.country}
      </div>
      <div>
        <strong>Ciudad:</strong> {formData.city}
      </div>
      <div>
        <strong>Código Postal:</strong> {formData.zipCode}
      </div>
      <div>
        <strong>Método de Contacto Preferido:</strong> {formData.preferredContact}
      </div>
      <div>
        <strong>¿Suscribirse al Boletín?:</strong> {formData.subscribeNewsletter ? 'Sí' : 'No'}
      </div>
      <div>
        <strong>Categoría Favorita:</strong> {formData.favoriteCategory}
      </div>
    </div>
  );
};

export default Step4ReviewSubmit;