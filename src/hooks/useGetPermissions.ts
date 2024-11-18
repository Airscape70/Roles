import { useQuery } from "react-query";
import { getPermissions } from "../api/api";
import { IPermission } from "../interfaces/IPermission";

export const useGetPermissions = () => {

  const { data } = useQuery<IPermission[]>({
    queryKey: ["permissions"],
    queryFn: getPermissions,
  });

  return data;
};
