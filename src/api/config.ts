import { API_HOST_MOBILE, API_HOST_PUBLIC } from "@/config/env";
import { DeviceInfoAccessor } from "@/providers/DeviceInfo.mem.accesor";

import axios, { AxiosInstance } from "axios";

import { AXIOS_INSTANCE_NAMES } from "./const";

// Axios factory function
export function createAxiosInstance({
  token,
  host,
}: { token?: string; host?: string } = {}): AxiosInstance {
  const headers: Record<string, string> = {
    Accept: "application/json, text/plain, */*", // Set the default Accept header
    "Content-Type": "application/json;charset=utf-8",
    "user-agent": DeviceInfoAccessor.userAgent ?? "",
    "TOK-DEVICE-ID": DeviceInfoAccessor.uniqueId ?? "",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const api: AxiosInstance = axios.create({
    baseURL: host ?? API_HOST_MOBILE,
    timeout: 5000, // Set a timeout value (in milliseconds) for requests
    headers,
  });
  return api;
}

/**
 * if there are no host pick from this map
 * will fallback to API_HOST_MOBILE
 */
export const HOST_MAP_TO_KEYS: Record<AXIOS_INSTANCE_NAMES, string> = {
  public: API_HOST_PUBLIC,
  auth: API_HOST_MOBILE,
  markets: API_HOST_MOBILE,
};
