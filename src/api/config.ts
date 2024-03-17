import { API_HOST_MOBILE } from "@/config/env";
import { DeviceInfoAccessor } from "@/providers/DeviceInfo.mem.accesor";

import axios, { AxiosInstance } from "axios";

// Axios factory function
function createAxiosInstance(): AxiosInstance {
  const api: AxiosInstance = axios.create({
    baseURL: API_HOST_MOBILE,
    timeout: 5000, // Set a timeout value (in milliseconds) for requests
    headers: {
      Accept: "application/json, text/plain, */*", // Set the default Accept header
      "Content-Type": "application/json;charset=utf-8",
      "user-agent": DeviceInfoAccessor.userAgent,
      "TOK-DEVICE-ID": DeviceInfoAccessor.uniqueId,
    },
  });
  return api;
}

export class AxiosManager {
  static pool: Map<string, AxiosInstance> = new Map();

  static getAxiosInstance(key: string): AxiosInstance {
    if (!this.pool.has(key)) {
      this.pool.set(key, createAxiosInstance());
    }
    return this.pool.get(key)!;
  }

  static removeAxiosInstance(key: string): void {
    this.pool.delete(key);
  }
}
