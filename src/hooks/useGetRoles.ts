import { useQuery } from "react-query";
import { IRole } from "../interfaces/IRoles";
import { getRoles } from "../api/api";

export const useGetRoles = () => {

  const { data } = useQuery<IRole[]>({
    queryKey: ["roles"],
    queryFn: getRoles,
  });

  return data;
};
