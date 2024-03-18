import { API_HOST_MOBILE } from "@/config/env";

import { AxiosInstance } from "axios";

import { createAxiosInstance, HOST_MAP_TO_KEYS } from "./config";
import { AXIOS_INSTANCE_NAMES } from "./const";

export class AxiosManager {
  /**
   * instances pool to manage Axios Instance
   */
  static pool: Map<string, AxiosInstance> = new Map();

  static getAxiosInstance(key: AXIOS_INSTANCE_NAMES): AxiosInstance {
    if (!this.pool.has(key)) {
      const host = HOST_MAP_TO_KEYS[key] ?? API_HOST_MOBILE;
      this.pool.set(key, createAxiosInstance({ host }));
    }
    return this.pool.get(key)!;
  }

  static initAuthorizedInstances(token: string) {
    this.pool.set("markets", createAxiosInstance({ token }));
  }

  static clearAuthorizedInstances() {
    this.pool.delete("markets");
  }

  static removeAxiosInstance(key: string): void {
    this.pool.delete(key);
  }

  static clearPool() {
    this.pool.clear();
  }
}
