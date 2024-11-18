import { useMemo } from "react";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Checkbox,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BasicModal from "./BasicModal";
import { SELECT_FIELD, USER_FIELDS } from "../constants/fieldsConstants";
import { IUser } from "../interfaces/IUser";
import { useGetUsers } from "../hooks/useGetUsers";
import { useDeleteUser } from "../hooks/useDeleteUser";
import { useGetRoles } from "../hooks/useGetRoles";
import { usePostUser } from "../hooks/usePostUser";
import { useUpdateUser } from "../hooks/useUpdateUser";

const Users = () => {
  const usersData = useGetUsers();
  const deleteUser = useDeleteUser();
  const postUser = usePostUser();
  const rolesData = useGetRoles();
  const updateUser = useUpdateUser();

  const options = rolesData?.map((role) => {
    return {
      id: role.id,
      label: role.roleName,
      value: role.roleName,
    };
  });

  SELECT_FIELD.options = options;

  const FIELDS = USER_FIELDS.concat(SELECT_FIELD);

  const handleDeleteUser = (id: string) => {
    deleteUser(id);
  };

  const handlePostUser = (user: IUser) => {
    postUser(user);
  };

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
        accessorKey: "roleName",
        header: "Роль",
      },
      {
        accessorKey: "availability",
        header: "Доступность",
        grow: false,
        size: 40,
        Cell: ({ row }) => (
          <Checkbox
            checked={row.original.availability}
            sx={{ marginLeft: "2px", padding: "0" }}
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
    initialState: { showGlobalFilter: true },
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
        minHeight: "500px",
      },
    },

    renderRowActions: ({ row }) => (
      <Box sx={{ display: "flex" }}>
        <BasicModal
          modalTitle="Изменение данных"
          BtnIcon={EditIcon}
          formSetting={{
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
      <Box
        marginBottom={2}
        display={"inline-flex"}
        justifyContent={"space-between"}
        width={"100%"}
      >
        <Typography variant="h4">Список пользователей</Typography>
        <BasicModal
          btnTitle="Создать пользователя"
          modalTitle="Создание пользователя"
          formSetting={{
            fields: FIELDS,
            onSubmit: (user) => handlePostUser(user),
          }}
        />
      </Box>

      <MaterialReactTable table={table} />
    </>
  );
};

export default Users;
