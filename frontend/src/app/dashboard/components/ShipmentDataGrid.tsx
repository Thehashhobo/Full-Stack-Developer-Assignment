import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';

interface ShipmentDataGridProps {
  rows: any[];
  columns: GridColDef[];
  loading: boolean;
  rowCount: number;
  paginationModel: { page: number; pageSize: number };
  onPaginationModelChange: (model: { page: number; pageSize: number }) => void;
}

export default function ShipmentDataGrid({
  rows,
  columns,
  loading,
  rowCount,
  paginationModel,
  onPaginationModelChange,
}: ShipmentDataGridProps) {
  return (
    <Box
      sx={{
        flex: 1,
        width: '100%',
      }}
    >
      <DataGrid
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
      />
    </Box>
  );
}