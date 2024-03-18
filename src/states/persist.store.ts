import SessionStorage from "@/storages/session.storage";

import { Storage } from "redux-persist";

export const mmkvStore: Storage = {
  setItem: (key, value) => {
    SessionStorage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key) => {
    const value = SessionStorage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key) => {
    SessionStorage.delete(key);
    return Promise.resolve();
  },
};
