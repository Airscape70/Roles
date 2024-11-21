import { useMutation } from "react-query";
import { deleteUser } from "../api/api";
import { queryClient } from "../App";

export const useDeleteUser = () => {
  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return deleteUserMutation.mutate;
};
