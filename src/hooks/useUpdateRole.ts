import { useMutation } from "react-query";
import { updateRole } from "../api/api";
import { queryClient } from "../App";

export const useUpdateRole = () => {
  const updateRoleMutation = useMutation({
    mutationFn: updateRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });

  return updateRoleMutation.mutate;
};
