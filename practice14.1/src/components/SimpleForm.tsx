import React, { useReducer, useState, useMemo } from 'react';

interface FormState {
  name: string;
  email: string;
  message: string;
  newsletter: boolean;
  errors: {
    name?: string;
    email?: string;
    message?: string;
  };
}

type FormAction =
  | { type: 'INPUT_CHANGE'; name: keyof Omit<FormState, 'errors'>; value: string | boolean }
  | { type: 'VALIDATE_FIELD'; name: keyof Omit<FormState, 'errors'>; value: string | boolean }
  | { type: 'SUBMIT' }
  | { type: 'RESET_FORM' };

const initialFormState: FormState = {
  name: '',
  email: '',
  message: '',
  newsletter: false,
  errors: {},
};

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      return {
        ...state,
        [action.name]: action.value,
        errors: {
          ...state.errors,
          [action.name]: undefined,
        },
      };
    case 'VALIDATE_FIELD': {
      const newErrors = { ...state.errors };
      if (action.name === 'name') {
        const nameValue = action.value as string;
        if (!nameValue.trim()) {
          newErrors.name = 'Name is required';
        } else if (!/^[a-zA-Z\s]*$/.test(nameValue)) {
          newErrors.name = 'Name must only contain letters and spaces';
        } else {
          newErrors.name = undefined;
        }
      } else if (action.name === 'email') {
        if (!action.value) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(action.value as string)) {
          newErrors.email = 'Invalid email format';
        } else {
          newErrors.email = undefined;
        }
      } else if (action.name === 'message') {
        newErrors.message = (action.value as string).trim().length < 10 ? 'Message must be at least 10 characters' : undefined;
      }
      return {
        ...state,
        errors: newErrors,
      };
    }
    case 'SUBMIT': {
      const newErrors: FormState['errors'] = {};
      if (!state.name.trim()) {
        newErrors.name = 'Name is required';
      } else if (!/^[a-zA-Z\s]*$/.test(state.name)) {
        newErrors.name = 'Name must only contain letters and spaces';
      }
      if (!state.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(state.email)) {
        newErrors.email = 'Invalid email format';
      }
      if (state.message.trim().length < 10) {
        newErrors.message = 'Message must be at least 10 characters';
      }
      return {
        ...state,
        errors: newErrors,
      };
    }
    case 'RESET_FORM':
      return initialFormState;
    default:
      return state;
  }
};

const SimpleForm: React.FC = () => {
  const [state, dispatch] = useReducer(formReducer, initialFormState);
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid = useMemo(() => {
    const isNameValid = state.name.trim() !== '' && /^[a-zA-Z\s]*$/.test(state.name) && !state.errors.name;
    const isEmailValid = state.email.trim() !== '' && /\S+@\S+\.\S+/.test(state.email) && !state.errors.email;
    const isMessageValid = state.message.trim().length >= 10 && !state.errors.message;

    return isNameValid && isEmailValid && isMessageValid;
  }, [state.name, state.email, state.message, state.errors.name, state.errors.email, state.errors.message]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = event.target;
    const inputValue = type === 'checkbox' ? (event.target as HTMLInputElement).checked : value;
    dispatch({ type: 'INPUT_CHANGE', name: name as keyof Omit<FormState, 'errors'>, value: inputValue });
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = event.target;
    const inputValue = type === 'checkbox' ? (event.target as HTMLInputElement).checked : value;
    dispatch({ type: 'VALIDATE_FIELD', name: name as keyof Omit<FormState, 'errors'>, value: inputValue });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch({ type: 'SUBMIT' });

    if (!isValid) {
      setSubmissionMessage('Please correct the errors below.');
      return;
    }

    setIsSubmitting(true);
    setSubmissionMessage(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmissionMessage('Form submitted successfully!');
      dispatch({ type: 'RESET_FORM' });
    } catch (error) {
      setSubmissionMessage('An error occurred during submission. Please try again.');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    dispatch({ type: 'RESET_FORM' });
    setSubmissionMessage(null);
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Simple Form</h2>
      {submissionMessage && (
        <p className={`${isValid ? "text-green-600" : "text-red-600"} font-semibold mb-2`}>
          {submissionMessage}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={state.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${state.errors.name ? 'border-red-500' : ''}`}
          />
          {state.errors.name && <p className="text-red-500 text-xs italic">{state.errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={state.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${state.errors.email ? 'border-red-500' : ''}`}
          />
          {state.errors.email && <p className="text-red-500 text-xs italic">{state.errors.email}</p>}
        </div>
        <div>
          <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message:</label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={state.message}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${state.errors.message ? 'border-red-500' : ''}`}
            placeholder="Enter your message (min 10 characters)"
          />
          {state.errors.message && <p className="text-red-500 text-xs italic">{state.errors.message}</p>}
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="newsletter"
            name="newsletter"
            checked={state.newsletter}
            onChange={handleChange}
            className="form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300 focus:ring-2"
          />
          <label htmlFor="newsletter" className="ml-2 block text-gray-700 text-sm">Subscribe to newsletter</label>
        </div>
        <div className="flex items-center space-x-2">
          <button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${(!isValid || isSubmitting) ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={isSubmitting}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default SimpleForm;