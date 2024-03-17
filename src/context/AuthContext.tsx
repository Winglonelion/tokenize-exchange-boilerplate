import React, { useEffect, useMemo, useState } from "react";
import { InteractionManager } from "react-native";

import useSessionStorage from "@/hooks/useSessionStorage";
import { User } from "@/models/user";
import PublicStorage, { PUBLIC_STORAGE_KEYS } from "@/storages/public.storage";

const AuthContext = React.createContext<{
  signIn: (userData: User) => void;
  signOut: () => void;
  session?: Record<string, any> | null | undefined | unknown;
  isLoading: boolean;
  isAuth: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
  isAuth: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const { session, startSession, clearSession } = useSessionStorage<User>(
    PublicStorage.getString(PUBLIC_STORAGE_KEYS.current_user_id) ?? "",
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      InteractionManager.runAfterInteractions(() => {
        setIsLoading(false);
      });
    }
  }, [isLoading]);

  const isAuth = useMemo(() => {
    return !!session?.userId;
  }, [session?.userId]);

  return (
    <AuthContext.Provider
      value={{
        signIn: (userData: User) => {
          // Perform sign-in logic here
          startSession(userData.userId, userData);
          PublicStorage.set(
            PUBLIC_STORAGE_KEYS.current_user_id,
            userData.userId,
          );
        },
        signOut: () => {
          // setSession(null);
          const currentUserId =
            PublicStorage.getString(PUBLIC_STORAGE_KEYS.current_user_id) ?? "";
          clearSession(currentUserId);
        },
        session,
        isLoading,
        isAuth,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
