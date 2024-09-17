import * as Yup from 'yup'

type Props = {}

export const LoginValidation = Yup.object().shape({
  username: Yup.string().min(4).max(20).required('Username is required'),
  email: Yup.string().email('Invalid email address'),
  password: Yup.string()
    // .min(8, 'Password must be at least 8 characters long')
    .required('Password is required')
})

export const SignUpValidation = Yup.object().shape({
  username: Yup.string().min(4).max(20).required('Username is required'),
  fullName: Yup.string().min(4).max(80).required('Full name is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  gender: Yup.string().oneOf(['male', 'female'], 'Gender must be either male or female').required('Gender is required')
})
