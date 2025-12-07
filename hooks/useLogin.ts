import { setAuthInfo } from "@/stores/auth-store";
import { LoginService } from "@/services/login";
import { LoginPayload } from "@/services/login/schema";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useLogin = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (err: string) => void;
}) => {
  const { push } = useRouter();
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (variables: LoginPayload) => {
      return LoginService.login(variables);
    },
    mutationKey: ["login"],
    onSuccess: (data) => {
      if (typeof data === "object") {
        localStorage.setItem("accessToken", data.data.data.accessToken);
        localStorage.setItem("refreshToken", data.data.data.refreshToken);
        localStorage.setItem("email", data.data.data.email);
        onSuccess?.();
        push("/");
      }
    },
    onError: (err) => {
      const error = err as any;
      if (("response" in error) as any) {
        onError?.(error.response?.data?.message);
      }
      console.log("error occured");
    },
  });
  return {
    login: mutate,
    isLoading: isPending,
    isError,
    isSuccess,
  };
};
