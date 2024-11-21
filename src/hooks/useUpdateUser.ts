import { useMutation } from "react-query";
import { updateUser } from "../api/api";
import { queryClient } from "../App";

export const useUpdateUser = () => {
  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return updateUserMutation.mutate;
};
