import { AxiosManager } from "./config";

export const INSTANCE_NAME = "auth";

export async function login(email: string, password: string) {
  const payload = {
    email,
    password,
    captcha: "yWOEjZMIhY",
    captchaBypass: "yWOEjZMIhY",
  };

  const instant = AxiosManager.getAxiosInstance(INSTANCE_NAME);
  return instant.post("auth/login", payload);
}

export default login;
