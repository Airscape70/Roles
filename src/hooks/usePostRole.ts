import { useMutation } from "react-query";
import { postRole } from "../api/api";
import { queryClient } from "../App";

export const usePostRole = () => {
  const postRoleMutation = useMutation({
    mutationFn: postRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });

  return postRoleMutation.mutate;
};
