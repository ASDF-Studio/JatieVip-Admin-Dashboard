import * as yup from 'yup'

export const updateProfileSchema = yup.object({
  firstName: yup.string().required('required field'),
  lastName: yup.string().required('required field'),
  birthDay: yup.string().required('required field'),
  gender: yup.string().required('required field'),
})

export const loginSchema = yup.object({
  phoneNumber: yup.string().required('required field'),
  code: yup.string().required('required field'),
})
