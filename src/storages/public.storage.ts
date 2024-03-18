import StorageFactory from "./storage.factory";

export enum PUBLIC_STORAGE_KEYS {
  current_user_id = "current_user_id",
}

const PublicStorage = StorageFactory.provideStorage({
  id: "public",
});

export default PublicStorage;
