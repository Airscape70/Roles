import { useMemo } from "react";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BasicModal from "./BasicModal";
import { ROLE_FIELDS } from "../constants/fieldsConstants";
import { IRole } from "../interfaces/IRoles";
import { useQuery } from "react-query";
import { getRoles, postRoles } from "../api/api";
import { useGetRoles } from "../hooks/useGetRoles";

const Roles = () => {
  const rolesData = useGetRoles();

  const columns = useMemo<MRT_ColumnDef<IRole>[]>(
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
        Cell: ({ row }) => row.original.description.join(", "),
      }
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: rolesData ?? [],
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
        <BasicModal
          btnTitle="Создать роль"
          modalTitle="Создание роли"
          formSetting={{
            fields: ROLE_FIELDS,
            onSubmit: (role) => postRoles(role),
          }}
        />
      </Box>
      <MaterialReactTable table={table} />
    </>
  );
};

export default Roles;
