import { useMutation } from "react-query";
import { updateUser } from "../api/api";
import { queryClient } from "../App";

export const useUpdateUser = () => {
  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      // при успешном выполнении идет глобальное обновление по ключу для ререндера
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
  // принимаем аргументы, которые передаем в mutationFn
  return updateUserMutation.mutate;
};
