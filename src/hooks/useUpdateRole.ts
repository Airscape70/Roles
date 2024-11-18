import { useMutation } from "react-query";
import { updateRole } from "../api/api";
import { queryClient } from "../App";

export const useUpdateRole = () => {
  const updateRoleMutation = useMutation({
    mutationFn: updateRole,
    onSuccess: () => {
      // при успешном выполнении идет глобальное обновление по ключу для ререндера
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
  // принимаем аргументы, которые передаем в mutationFn
  return updateRoleMutation.mutate;
};
