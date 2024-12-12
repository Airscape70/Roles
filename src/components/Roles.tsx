import { useCallback, useMemo } from "react";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useGetRoles } from "../hooks/useGetRoles";
import { usePostRole } from "../hooks/usePostRole";
import { useDeleteRole } from "../hooks/useDeleteRole";
import { useGetPermissions } from "../hooks/useGetPermissions";
import { useUpdateRole } from "../hooks/useUpdateRole";
import BasicModal from "./modal/BasicModal";
import TableHeader from "./common/TableHeader";
import { PERMISSIONS_FIELD, ROLE_FIELDS } from "../constants/fieldsConstants";
import { useGetUsers } from "../hooks/useGetUsers";
import { IRole } from "../interfaces/IRole";
import { getDefaultMRTOptions } from "../helpers/getDefaultMRTOptions";
import { ROLES_SCHEMA } from "../constants/schemesConstants";

const Roles = () => {
  const {rolesData, isLoading } = useGetRoles();
  const {usersData }= useGetUsers();
  const permissions = useGetPermissions();
  const postRole = usePostRole();
  const deleteRole = useDeleteRole();
  const updateRole = useUpdateRole();

  const handleDeleteUser = useCallback(
    (roleId: string) => {
      deleteRole(roleId);
    },
    [deleteRole]
  );
  const handleCopy = useCallback((row: string) => {
    navigator.clipboard
      .writeText(`${row}`)
      .then(() => {
      alert('Скопировано!')
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  }, []);

  PERMISSIONS_FIELD.options = permissions?.map((permission) => {
    return {
      id: permission.id,
      label: permission.permissionName,
      value: permission.value,
    };
  });

  const ROLES = ROLE_FIELDS.concat(PERMISSIONS_FIELD);
  const defaultMRTOptions = getDefaultMRTOptions<IRole>();
  const columns = useMemo<MRT_ColumnDef<IRole>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 40,
      },
      {
        accessorKey: "roleName",
        header: "Название роли",
        size: 200,
      },
      {
        accessorKey: "roleDescription",
        header: "Описание",
        size: 200,
      },
      {
        accessorKey: "permissions",
        header: "Разрешения",
        size: 400,
        Cell: ({ row }) => row.original.permissions.join(", "),
      },
      {
        accessorKey: "users",
        header: "Пользователи",
        size: 400,
        Cell: ({ row }) => {
          const res = usersData
            ?.filter((user) => user.userRole === row.original.roleName)
            .map((user) => user.userName);

          return res?.join(", ");
        },
      },
    ],
    [usersData]
  );

  const table = useMaterialReactTable({
    ...defaultMRTOptions,
    columns,
    data: rolesData ?? [],
    state: {
      isLoading: isLoading
    },
    renderRowActions: ({ row }) => (
      <Box sx={{ display: "flex" }}>
        <BasicModal
          modalTitle="Изменение данных"
          BtnIcon={EditIcon}
          formSetting={{
            validate: ROLES_SCHEMA,
            fields: ROLES,
            defaultValues: row.original,
            onSubmit: updateRole,
            submitBtnTitle: "Изменить",
          }}
        />
        <Tooltip title="Удалить">
          <IconButton color="error" onClick={() => handleDeleteUser(row.id)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Скопировать">
          <IconButton color="default" onClick={() => handleCopy(row.original.roleName)}>
            <ContentCopyIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  });

  return (
    <>
      <TableHeader
        tabName="Список ролей"
        modalSettings={{
          btnTitle: "Создать роль",
          modalTitle: "Создание роли",
          formSetting: {
            validate: ROLES_SCHEMA,
            fields: ROLES,
            onSubmit: (role: IRole) => postRole(role),
          },
        }}
      />
      <MaterialReactTable table={table} />
    </>
  );
};

export default Roles;
