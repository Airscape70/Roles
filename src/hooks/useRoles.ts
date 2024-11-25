import { useMutation, useQuery } from "react-query";
import { deleteRole, getRoles, postRole, updateRole } from "../api/api";
import { IRole } from "../interfaces/IRole";
import { queryClient } from "../App";

export const useRoles = () => {

    const { data: rolesData } = useQuery<IRole[]>({
      queryKey: ["roles"],
      queryFn: getRoles,
    });
  
    const postRoleMutation = useMutation({
      mutationFn: postRole,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["roles"] });
      },
    });
  
    const updateRoleMutation = useMutation({
      mutationFn: updateRole,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["roles"] });
      },
    });
  
    const deleteRoleMutation = useMutation({
      mutationFn: deleteRole,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["roles"] });
      },
    });
  
  return {rolesData, postRoleMutation, updateRoleMutation,  deleteRoleMutation }
}
