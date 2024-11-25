import { type MRT_RowData, type MRT_TableOptions } from "material-react-table";

export const getDefaultMRTOptions = <TData extends MRT_RowData>(): Partial<
  MRT_TableOptions<TData>
> => ({
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
});
