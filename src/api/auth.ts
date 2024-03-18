import { AxiosManager } from "./axios.manager";
import { AXIOS_INSTANCE_NAMES } from "./const";

export function login(email: string, password: string) {
  const payload = {
    email,
    password,
    captcha: "yWOEjZMIhY",
    captchaBypass: "yWOEjZMIhY",
  };

  const instant = AxiosManager.getAxiosInstance(AXIOS_INSTANCE_NAMES.auth);
  return instant.post("auth/login", payload);
}
