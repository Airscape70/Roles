import { useMutation } from "react-query";
import { deleteUser } from "../api/api";
import { queryClient } from "../App";

export const useDeleteUser = () => {
  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      // при успешном выполнении идет глобальное обновление по ключу для ререндера
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
  // принимаем аргументы, которые передаем в mutationFn
  return deleteUserMutation.mutate;
};
