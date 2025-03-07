import * as yup from "yup";

const userSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username should be at least 3 characters")
    .required("Username is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password should be at least 6 characters")
    .required("Password is required"),
});

export default userSchema;
