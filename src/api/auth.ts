import { AxiosManager } from "./config";

export const INSTANCE_NAME = "auth";

export async function login(email: string, password: string) {
  const payload = {
    email,
    password,
    captcha: "yWOEjZMIhY",
    captchaBypass: "yWOEjZMIhY",
  };

  try {
    const instant = AxiosManager.getAxiosInstance(INSTANCE_NAME);
    return instant.post("auth/login", payload);
  } catch (error) {
    throw new Error("Login failed");
  }
}

export default login;
