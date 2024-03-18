import React, { useLayoutEffect } from "react";

import { useSelector } from "react-redux";

import { AxiosManager } from "@/api/axios.manager";
import { selectJwtToken } from "@/states/selectors/auth";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const token = useSelector(selectJwtToken);
  useLayoutEffect(() => {
    /**
     * if token appears or changes, we need to update the axios instance
     */
    if (typeof token === "string" && token.length > 0) {
      AxiosManager.initAuthorizedInstances(token);
    } else {
      /**
       * if token is not available, we need to remove the axios instance
       */
      AxiosManager.clearAuthorizedInstances();
    }

    /**
     * clear pool on unmount to prevents some cache issues while developing
     */
    return () => {
      console.log("-----> CLEAR ALL NETWORK INSTANCES");
      AxiosManager.clearPool();
    };
  }, [token]);

  return <>{props.children}</>;
};

export default AuthProvider;
