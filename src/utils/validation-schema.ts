import * as yup from "yup";

// TEACHER FORM
export const teacherFormSchema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup.string().required("Email is required"),
  password: yup.string(),
  phone: yup.string().required("Phone number is required"),
  role: yup.string().required("Role is required"),
  branchId: yup.array().of(yup.number()).required("Choose branches"), //------
  avatar_url: yup.string(),
});
