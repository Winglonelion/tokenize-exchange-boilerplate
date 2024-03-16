import StorageProvider from "./storage.provider";

export enum PUBLIC_STORAGE_KEYS {
  current_user_id = "current_user_id",
}

const PublicStorage = StorageProvider.provideStorage({
  id: "public",
});

export default PublicStorage;
