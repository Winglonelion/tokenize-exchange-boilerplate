import { login } from "@/api/auth";
import { setUser } from "@/states/actions/auth.actions";
import { useAppDispatch } from "@/states/hooks/use.redux";

import { useMutation } from "@tanstack/react-query";

const useLoginLogic = () => {
  const dispatch = useAppDispatch();
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationKey: ["login"],
    networkMode: "always",
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => {
      return login(username, password);
    },
    onSuccess: (response) => {
      const { data } = response;
      dispatch(setUser(data?.data ?? {}));
    },
  });

  const handleLogin = async (username: string, password: string) => {
    try {
      await mutateAsync({ username, password });
      // Handle the response here
    } catch (error) {
      console.log("ERRORS", error);
      // Handle the error here
    }
  };

  return {
    handleLogin,
    isPending,
    isError,
    error,
  };
};

export default useLoginLogic;
