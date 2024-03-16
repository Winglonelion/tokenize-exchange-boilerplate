import { useState } from "react";

import SessionStorage, {
  SESSION_STORAGE_KEYS,
} from "@/storages/session.storage";

const storage = SessionStorage;

function useSessionStorage<T>(id: string) {
  const [session, setSession] = useState((): T | undefined => {
    console.log("trigger init");
    try {
      const dataString = storage.getString(
        SESSION_STORAGE_KEYS.current_user + "_" + id,
      );
      const data: T | undefined = dataString
        ? JSON.parse(dataString)
        : undefined;

      return data;
    } catch (error) {
      console.error({ error });
      return undefined;
    }
  });

  const startSession = (id: string, value: T) => {
    try {
      const key = SESSION_STORAGE_KEYS.current_user + "_" + id;
      const data = JSON.stringify(value);
      SessionStorage.set(key, data);
      setSession(value);
    } catch (error) {
      console.error({ error });
      /**
       * need to throw error here
       * due to the importance of the action
       */
      throw error;
    }
  };

  const clearSession = (id: string) => {
    try {
      const key = SESSION_STORAGE_KEYS.current_user + "_" + id;
      SessionStorage.delete(key);
      setSession(undefined);
    } catch (error) {
      console.error({ error });
      /**
       * need to throw error here
       * due to the importance of the action
       */
      throw error;
    }
  };

  return { session, startSession, clearSession };
}

export default useSessionStorage;
