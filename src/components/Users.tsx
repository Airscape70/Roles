import { useMemo } from "react";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  MRT_EditActionButtons,
  MRT_TableOptions,
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

  const handleUpdateUser: MRT_TableOptions<IUser>['onEditingRowSave'] = async ({
    values,
    table,
  }) => {
    console.log(values)
    updateUser(values);
    table.setEditingRow(null); //exit editing mode
  }

  const columns = useMemo<MRT_ColumnDef<IUser>[]>(
    () => [
      {
        accessorKey: "id",
        header: 'ID',
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
    initialState: { showGlobalFilter: true, columnVisibility: { id: false } },
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
        header: '',
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
    onEditingRowSave: handleUpdateUser,
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h4">Изменить</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row}/>
        </DialogActions>
      </>
    ),

    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex" }}>
        <Tooltip title="Изменить">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
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

// const validateRequired = (value: string) => !!value.length;
// const validateEmail = (email: string) =>
//   !!email.length &&
//   email
//     .toLowerCase()
//     .match(
//       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//     );
