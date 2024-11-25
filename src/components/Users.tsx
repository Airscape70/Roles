import { useCallback, useMemo } from "react";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Checkbox, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IUser } from "../interfaces/IUser";
import { useGetUsers } from "../hooks/useGetUsers";
import { useDeleteUser } from "../hooks/useDeleteUser";
import { useGetRoles } from "../hooks/useGetRoles";
import { usePostUser } from "../hooks/usePostUser";
import { useUpdateUser } from "../hooks/useUpdateUser";
import BasicModal from "./modal/BasicModal";
import TableHeader from "./common/TableHeader";
import {
  AVAILABILITY_FIELD,
  SELECT_ROLE_FIELD,
  USER_FIELD,
} from "../constants/fieldsConstants";
import { getDefaultMRTOptions } from "../helpers/getDefaultMRTOptions";
import { USER_SCHEMA } from "../constants/schemesConstants";

const Users = () => {
  const usersData = useGetUsers();
  const rolesData = useGetRoles();
  const deleteUser = useDeleteUser();
  const postUser = usePostUser();
  const updateUser = useUpdateUser();

  const handleDeleteUser = useCallback(
    (userId: string) => {
      deleteUser(userId);
    },
    [deleteUser]
  );

  SELECT_ROLE_FIELD.options = rolesData?.map((role) => {
    return {
      id: role.id,
      label: role.roleName,
      value: role.roleName,
    };
  });

  const USERS = [USER_FIELD, SELECT_ROLE_FIELD, AVAILABILITY_FIELD];
  const defaultMRTOptions = getDefaultMRTOptions<IUser>();
  const columns = useMemo<MRT_ColumnDef<IUser>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 40,
      },
      {
        accessorKey: "userName",
        header: "Имя пользователя",
      },
      {
        accessorKey: "userRole",
        header: "Роль",
      },
      {
        accessorKey: "availability",
        header: "Доступность",
        size: 20,
        Cell: ({ row }) => (
          <Checkbox
            checked={!!row.original.availability}
            sx={{ marginLeft: "30px", padding: "0" }}
            disableTouchRipple
          />
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    ...defaultMRTOptions,
    columns,
    data: usersData ?? [],
    editDisplayMode: "modal",
    
    renderRowActions: ({ row }) => (
      <Box sx={{ display: "flex" }}>
        <BasicModal
          modalTitle="Изменение данных"
          BtnIcon={EditIcon}
          formSetting={{
            validate: USER_SCHEMA,
            fields: USERS,
            defaultValues: row.original,
            onSubmit: updateUser,
            submitBtnTitle: "Изменить",
          }}
        />
        <Tooltip title="Удалить">
          <IconButton color="error" onClick={() => handleDeleteUser(row.id)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  });

  return (
    <>
      <TableHeader
        tabName="Список пользователей"
        modalSettings={{
          btnTitle: "Создать пользователя",
          modalTitle: "Создание пользователя",
          formSetting: {
            validate: USER_SCHEMA,
            fields: USERS,
            onSubmit: (user: IUser) => postUser(user),
          },
        }}
      />
      <MaterialReactTable table={table} />
    </>
  );
};

export default Users;
