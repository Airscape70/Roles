import { useMemo } from "react";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import { type Role, fakeRole } from "./makeData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Roles = () => {
  const columns = useMemo<MRT_ColumnDef<Role>[]>(
    () => [
      {
        accessorKey: "roleName",
        header: "Название роли",
        size: 200,
      },
      {
        accessorKey: "description",
        header: "Описание",
        size: 400,
        grow: true,
        Cell: ({ row }) => row.original.description.join(", "),
      },
      {
        accessorKey: "users",
        header: "Пользователи",
        Cell: ({ row }) => row.original.users.join(", "),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: fakeRole,
    enableSelectAll: false,
    positionGlobalFilter: "left",
    initialState: { showGlobalFilter: true },
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
        header: undefined,
        grow: false,
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
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex" }}>
        <Tooltip title="Изменить">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Удалить">
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
        <Typography variant="h4">Список ролей</Typography>
        <Button variant="contained">Добавить роль</Button>
      </Box>
      <MaterialReactTable table={table} />
    </>
  );
};

export default Roles;
