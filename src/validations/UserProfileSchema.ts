import * as Yup from 'yup';

export const UserProfileSchema = Yup.object().shape({
  fullName: Yup.string().required('Full name is required'),
  address: Yup.string().required('Address is required'),
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/[0-9]/, 'Phone number must contain only numbers'),
  introduction: Yup.string(),
});
