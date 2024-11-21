import { useMutation } from "react-query";
import { deleteRole } from "../api/api";
import { queryClient } from "../App";

export const useDeleteRole = () => {
  const deleteRoleMutation = useMutation({
    mutationFn: deleteRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });

  return deleteRoleMutation.mutate;
};

