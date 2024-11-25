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
import * as yup from "yup";
import {
  AVAILABILITY_FIELD,
  SELECT_ROLE_FIELD,
  USER_FIELD,
} from "../constants/fieldsConstants";

const schema = yup
  .object()
  .shape({
    userName: yup
      .string()
      .required("Введите инициалы пользователя")
      .min(4, "Минимум 4 буквы")
      .matches(
        /^[А-ЯЁа-яё]+ [А-ЯЁ]\.[А-ЯЁ]\.$/,
        "Некорректно указаны инициалы"
      ),
    userRole: yup.string().required("Выберите роль"),
  })
  .required();

const Users = () => {
  const usersData = useGetUsers();
  const rolesData = useGetRoles();
  const deleteUser = useDeleteUser();
  const postUser = usePostUser();
  const updateUser = useUpdateUser();

  SELECT_ROLE_FIELD.options = rolesData?.map((role) => {
    return {
      id: role.id,
      label: role.roleName,
      value: role.roleName,
    };
  });

  const handleDeleteUser = useCallback(
    (userId: string) => {
      deleteUser(userId);
    },
    [deleteUser]
  );

  const FIELDS = [USER_FIELD, SELECT_ROLE_FIELD, AVAILABILITY_FIELD];

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
    columns,
    data: usersData ?? [],
    enableSelectAll: false,
    positionGlobalFilter: "left",
    autoResetAll: false,
    initialState: {
      showGlobalFilter: true,
      columnVisibility: { id: false },
      pagination: { pageSize: 5, pageIndex: 0 },
    },
    enableToolbarInternalActions: false,
    createDisplayMode: "row",
    editDisplayMode: "modal",
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
            fields: FIELDS,
            defaultValues: row.original,
            onSubmit: updateUser,
            submitBtnTitle: "Изменить",
          }}
        />
        <Tooltip title="Удалить" onClick={() => handleDeleteUser(row.id)}>
          <IconButton color="error">
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
            validate: schema,
            fields: FIELDS,
            onSubmit: (user: IUser) => postUser(user),
          },
        }}
      />
      <MaterialReactTable table={table} />
    </>
  );
};

export default Users;
