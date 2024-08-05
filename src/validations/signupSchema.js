import { object, string, ref } from 'yup';

export const getSignupSchema  = (password)  => object().shape({
  email: string()
    .required('E-mail es requerido')
    .email('No es un e-mail válido'),
  password: string()
    .required('Contraseña es requerida')
    .min(6, 'Contraseña debe tener al menos 6 caracteres'),
  confirmPassword: string()
    .oneOf([password], "Las contraseñas deben coincidir")
    .required("Confirmación de contraseña es requerida")
});