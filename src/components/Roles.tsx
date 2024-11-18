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
import { CHECKBOX_FIELD, ROLE_FIELDS } from "../constants/fieldsConstants";
import { IRole } from "../interfaces/IRoles";
import { postRole } from "../api/api";
import { useGetRoles } from "../hooks/useGetRoles";
import { usePostRole } from "../hooks/usePostRole";
import { useDeleteRole } from "../hooks/useDeleteRole";
import { useGetPermissions } from "../hooks/useGetPermissions";
import { useUpdateRole } from "../hooks/useUpdateRole";
import { IOption } from "../interfaces/IField";

const Roles = () => {
  const rolesData = useGetRoles();
  const permissions = useGetPermissions();
  const deleteRole = useDeleteRole();
  const postRole = usePostRole();
  const updateRole = useUpdateRole();

  const options: IOption[] | undefined = permissions?.map((permission) => {
    return {
      id: permission.id,
      label: permission.permissionName,
      value: permission.value,
    };
  });

  CHECKBOX_FIELD.options = options;

  const ROLES = ROLE_FIELDS.concat(CHECKBOX_FIELD);

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
        size: 400,
      },
      {
        accessorKey: "roleDescription",
        header: "Описание",
        size: 400,
      },
      {
        accessorKey: "permissions",
        header: "Разрешения",
        size: 400,
        Cell: ({ row }) => row.original.permissions.join(", "),
      },
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
            fields: ROLES,
            defaultValues: row.original,
            onSubmit: updateRole,
            submitBtnTitle: "Изменить",
          }}
        />
        <Tooltip title="Удалить">
          <IconButton color="error" onClick={() => deleteRole(row.id)}>
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
            fields: ROLES,
            onSubmit: (role) => postRole(role),
          }}
        />
      </Box>
      <MaterialReactTable table={table} />
    </>
  );
};

export default Roles;
