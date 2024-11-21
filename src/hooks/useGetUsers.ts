import { useQuery } from "react-query";
import { IUser } from "../interfaces/IUser";
import { getUsers } from "../api/api";

export const useGetUsers = () => {
  const { data } = useQuery<IUser[]>({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return data
};
