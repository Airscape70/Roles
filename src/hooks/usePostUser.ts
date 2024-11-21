import { useMutation } from "react-query";
import { postUser } from "../api/api";
import { queryClient } from "../App";

export const usePostUser = () => {
  const postUserMutation = useMutation({
    mutationFn: postUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return postUserMutation.mutate;
};
