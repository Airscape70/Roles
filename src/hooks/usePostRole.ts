import { useMutation } from "react-query";
import { postRole } from "../api/api";
import { queryClient } from "../App";

export const usePostRole = () => {
  const postRoleMutation = useMutation({
    mutationFn: postRole,
    onSuccess: () => {
      // при успешном выполнении идет глобальное обновление по ключу для ререндера
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
  // принимаем аргументы, которые передаем в mutationFn
  return postRoleMutation.mutate;
};
