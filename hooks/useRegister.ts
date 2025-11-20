import { useMutation } from "@tanstack/react-query";
import { RegisterService } from "./../services/register/index";
import { RegisterPayload } from "./../services/register/schema";

import { useRouter } from "next/navigation";

export const useRegister = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  const { push } = useRouter();
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (variables: RegisterPayload) => {
      return RegisterService.signup(variables);
    },
    mutationKey: ["signup"],
    onSuccess: (data) => {
      if (typeof data === "object") {
        onSuccess?.();
        push("/login");
      }
    },
    onError: () => {
      onError?.();
    },
  });
  return {
    signup: mutate,
    isLoading: isPending,
    isError,
    isSuccess,
  };
};
