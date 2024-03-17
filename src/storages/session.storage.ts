import { getBundleId } from "@/services/device-info";

import StorageProvider from "./storage.provider";

export enum SESSION_STORAGE_KEYS {
  current_user_id = "current_user_id",
  jwt = "jwt",
  current_user = "current_user",
}

/**
 * The id  for the public storage.
 * never changes with same bundle id, and is used to generate a unique ID
 */
export const PRIVATE_ID = StorageProvider.generateHash(
  `${"salt"}_${getBundleId()}`,
);

let mem_key = "";

function initEncryptedKey(private_key: string = "magic"): string {
  if (!mem_key) {
    const encrypted = StorageProvider.generateHash(
      `${private_key}_${PRIVATE_ID}`,
    );
    mem_key = encrypted;
    return encrypted;
  }
  return mem_key;
}

const SessionStorage = StorageProvider.provideStorage({
  id: "session",
  // replace with your own key
  encryptionKey: initEncryptedKey(),
});

export default SessionStorage;
