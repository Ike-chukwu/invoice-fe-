import { logout } from "@/constants";
import { LogoutService } from "@/services/logout";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useLogout = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: () => void;
}) => {
  const { push } = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: (variables: any) => LogoutService.logout(),
    mutationKey: ["logout"],
    onSuccess: () => {
      logout();
      onSuccess?.();
      push("/login");
    },
    onError,
  });

  return {
    logout: mutate,
    isPending,
  };
};
