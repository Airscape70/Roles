import { useCallback, useMemo } from "react";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGetRoles } from "../hooks/useGetRoles";
import { usePostRole } from "../hooks/usePostRole";
import { useDeleteRole } from "../hooks/useDeleteRole";
import { useGetPermissions } from "../hooks/useGetPermissions";
import { useUpdateRole } from "../hooks/useUpdateRole";
import BasicModal from "./modal/BasicModal";
import TableHeader from "./common/TableHeader";
import * as yup from "yup";
import { PERMISSIONS_FIELD, ROLE_FIELDS } from "../constants/fieldsConstants";
import { useGetUsers } from "../hooks/useGetUsers";
import { IRole } from "../interfaces/IRole";

const schema = yup
  .object()
  .shape({
    roleName: yup
      .string()
      .required("Введите название роли")
      .min(4, "Минимум 4 буквы")
      .matches(/^[а-яА-Я]*$/, "Только буквы кириллицы"),
    roleDescription: yup
      .string()
      .required("Введите описание роли")
      .min(4, "Минимум 4 буквы")
      .matches(/^[а-яА-Я]*$/, "Только буквы кириллицы"),
    permissions: yup.array().required(),
  })
  .required();

const Roles = () => {
  const rolesData = useGetRoles();
  const usersData = useGetUsers();
  const permissions = useGetPermissions();
  const deleteRole = useDeleteRole();
  const postRole = usePostRole();
  const updateRole = useUpdateRole();

  PERMISSIONS_FIELD.options = permissions?.map((permission) => {
    return {
      id: permission.id,
      label: permission.permissionName,
      value: permission.value,
    };
  });

  const ROLES = ROLE_FIELDS.concat(PERMISSIONS_FIELD);
  
  const handleDeleteUser = useCallback((roleId: string) => {
    deleteRole(roleId);
  }, [deleteRole]);

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
        size: 300,
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
          const res = usersData?.filter((user) => user.userRole === row.original.roleName)
            .map((user) => user.userName);

          return res?.join(", ");
        },
      },
    ],
    [usersData]
  );

  const table = useMaterialReactTable({
    columns,
    data: rolesData ?? [],
    enableSelectAll: false,
    positionGlobalFilter: "left",
    initialState: { showGlobalFilter: true, columnVisibility: { id: false } },
    enableToolbarInternalActions: false,
    createDisplayMode: "row",
    editDisplayMode: "row",
    positionActionsColumn: "last",
    enableEditing: true,
    enableSorting: false,
    enableColumnActions: false,
    muiPaginationProps: { rowsPerPageOptions: [5, 10, 20] },
    getRowId: (row) => row.id,
    defaultColumn: {
      minSize: 20,
      maxSize: 400,
      size: 300,
    },
    displayColumnDefOptions: {
      "mrt-row-actions": {
        header: "",
        maxSize: 20,
      },
    },
    muiSearchTextFieldProps: {
      placeholder: "Поиск",
      sx: { minWidth: "300px" },
      variant: "outlined",
    },

    muiTableContainerProps: {
      sx: {
        minHeight: "400px",
      },
    },
    renderRowActions: ({ row }) => (
      <Box sx={{ display: "flex" }}>
        <BasicModal
          modalTitle="Изменение данных"
          BtnIcon={EditIcon}
          formSetting={{
            validate: schema,
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
            validate: schema,
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
