import { MutationCache, QueryClient } from "@tanstack/react-query";

const mutationCache = new MutationCache({
  onError: (error) => {
    console.error("Mutation error", error);
  },
  onSuccess: (data) => {
    console.log("Mutation success", data);
  },
  onSettled: (data, error) => {
    console.log("Mutation settled", data, error);
  },
});

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      networkMode: "always",
    },
  },
  mutationCache,
});
