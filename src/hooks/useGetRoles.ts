import { useQuery } from "react-query";
import { getRoles } from "../api/api";
import { IRole } from "../interfaces/IRole";

export const useGetRoles = () => {
  const { data: rolesData, isLoading } = useQuery<IRole[]>({
    queryKey: ["roles"],
    queryFn: getRoles,
  });

  return {rolesData, isLoading};
};
