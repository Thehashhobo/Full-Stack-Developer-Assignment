import { DataGrid, GridColDef, GridSortModel } from '@mui/x-data-grid';
import { Box } from '@mui/material';

interface ShipmentDataGridProps {
  rows: any[];
  columns: GridColDef[];
  loading: boolean;
  rowCount: number;
  paginationModel: { page: number; pageSize: number };
  onPaginationModelChange: (model: { page: number; pageSize: number }) => void;

  sortingMode?: 'client' | 'server';
  sortModel?: GridSortModel;
  onSortModelChange?: (model: GridSortModel) => void;
}

export default function ShipmentDataGrid({
  rows,
  columns,
  loading,
  rowCount,
  paginationModel,
  onPaginationModelChange,

  // NEW sorting props:
  sortingMode = 'client',
  sortModel,
  onSortModelChange,
}: ShipmentDataGridProps) {
  return (
    <Box
      sx={{
        flex: 1,
        width: '100%',
      }}
    >
      <DataGrid
        // existing pagination & slicing
        rows={rows.slice(
          paginationModel.page * paginationModel.pageSize,
          (paginationModel.page + 1) * paginationModel.pageSize
        )}
        columns={columns}
        loading={loading}
        rowCount={rowCount}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        pageSizeOptions={[paginationModel.pageSize]}
        disableRowSelectionOnClick

        // forwarded sorting props
        sortingMode={sortingMode}
        sortModel={sortModel}
        onSortModelChange={onSortModelChange}
      />
    </Box>
  );
}
