import React from 'react';
import { useForm, SubmitHandler, FormState } from 'react-hook-form';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState, 
    reset,
  } = useForm<FormData>();

  const { errors, isValid, isSubmitting } = formState; 

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      console.log('Enviando datos:', data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Datos enviados con éxito:', data);
      alert('Mensaje enviado!');
      reset();
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('Hubo un error al enviar el mensaje. Inténtalo de nuevo.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>Contáctanos</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>Nombre:</label>
          <input
            type="text"
            id="name"
            {...register('name', {
              required: 'El nombre es requerido',
              minLength: { value: 3, message: 'El nombre debe tener al menos 3 caracteres' },
            })}
            style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }}
          />
          {errors.name && <p style={{ color: 'red', fontSize: '0.8em' }}>{errors.name?.message}</p>}
        </div>

        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            id="email"
            {...register('email', {
              required: 'El email es requerido',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Por favor, introduce un email válido',
              },
            })}
            style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }}
          />
          {errors.email && <p style={{ color: 'red', fontSize: '0.8em' }}>{errors.email?.message}</p>}
        </div>

        <div>
          <label htmlFor="phone" style={{ display: 'block', marginBottom: '5px' }}>Teléfono:</label>
          <input
            type="tel"
            id="phone"
            {...register('phone', {
              required: 'El número de teléfono es requerido',
              pattern: {
                value: /^[0-9]{7,}$/,
                message: 'Por favor, introduce un número de teléfono válido (al menos 7 dígitos)',
              },
            })}
            style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }}
          />
          {errors.phone && <p style={{ color: 'red', fontSize: '0.8em' }}>{errors.phone?.message}</p>}
        </div>

        <div>
          <label htmlFor="message" style={{ display: 'block', marginBottom: '5px' }}>Mensaje:</label>
          <textarea
            id="message"
            {...register('message', {
              required: 'El mensaje es requerido',
              minLength: { value: 20, message: 'El mensaje debe tener al menos 20 caracteres' },
            })}
            style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box', minHeight: '100px' }}
          />
          {errors.message && <p style={{ color: 'red', fontSize: '0.8em' }}>{errors.message?.message}</p>}
        </div>

        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;