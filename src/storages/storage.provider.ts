import { MMKV } from "react-native-mmkv";

import { v5 as uuidv5 } from "uuid";

/**
 * @description Provider for storage
 * All implementations of storage will be communicate with this provider
 */
class StorageProvider {
  static provideStorage({
    id,
    path,
    encryptionKey,
  }: {
    id: string;
    path?: string;
    encryptionKey?: string;
  }) {
    return new MMKV({ id, path, encryptionKey });
  }

  static generateHash(key: string) {
    return uuidv5(key, uuidv5.DNS);
  }
}

export default StorageProvider;
