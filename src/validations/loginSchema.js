import { object, string, ref } from 'yup';

export const getLoginSchema  = object().shape({
  email: string()
    .required('E-mail es requerido')
    .email('No es un e-mail válido'),
  password: string()
    .required('Contraseña es requerida')
    .min(6, 'Contraseña debe tener al menos 6 caracteres'),
});