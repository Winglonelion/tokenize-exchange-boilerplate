import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export type AuthFormData = {
  email: string;
  password: string;
  keepSignedIn: boolean;
};

export const authFormSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email is not correct format")
    .required("Email must not be empty"),
  password: yup.string().required("Password must not be empty"),
  keepSignedIn: yup.boolean().required(),
});

function useAuthForm() {
  return useForm<AuthFormData>({
    resolver: yupResolver(authFormSchema),
    mode: "onBlur",
    defaultValues: {
      email: "tokenize.test@gmail.com",
      password: "Test#111",
      keepSignedIn: false,
    },
  });
}

export default useAuthForm;
