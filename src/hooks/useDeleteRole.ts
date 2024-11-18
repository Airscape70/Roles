import { useMutation } from "react-query";
import { deleteRole } from "../api/api";
import { queryClient } from "../App";

export const useDeleteRole = () => {
  const deleteRoleMutation = useMutation({
    mutationFn: deleteRole,
    onSuccess: () => {
      // при успешном выполнении идет глобальное обновление по ключу для ререндера
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
  // принимаем аргументы, которые передаем в mutationFn
  return deleteRoleMutation.mutate;
};
