'use client';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  Box,
  Chip,
  Stack,
  IconButton,
  Autocomplete,
  TextField,
  Typography,
  Button,
  Modal,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import RefreshIcon from '@mui/icons-material/Refresh';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  /* ---------------- toolbar state ---------------- */
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([
    null,
    null,
  ]);
  const [status, setStatus] = useState<string | null>(null);
  const [carrier, setCarrier] = useState<string | null>(null);

  /* ---------------- pagination state ---------------- */
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 15,
  });

  /* ---------------- modal state ---------------- */
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const handleOpen = (row: any) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  const handleStatusUpdate = async (newStatus: string) => {
    if (selectedRow) {
      // Simulate an API call to update the status
      console.log(`Updating shipment ID ${selectedRow.id} to status: ${newStatus}`);
      setSelectedRow({ ...selectedRow, status: newStatus });
      handleClose();
    }
  };

  /* -------------- temporary data -------------- */
  const data = [
    {
      id: 1,
      origin: 'New York',
      destination: 'Los Angeles',
      carrier: 'UPS',
      shipDate: dayjs().subtract(9, 'days').toISOString(),
      eta: dayjs().add(2, 'days').toISOString(),
      status: 'In Transit',
    },
    {
      id: 2,
      origin: 'Chicago',
      destination: 'Houston',
      carrier: 'FedEx',
      shipDate: dayjs().subtract(3, 'days').toISOString(),
      eta: dayjs().add(1, 'days').toISOString(),
      status: 'Delayed',
    },
    {
      id: 3,
      origin: 'San Francisco',
      destination: 'Seattle',
      carrier: 'DHL',
      shipDate: dayjs().subtract(7, 'days').toISOString(),
      eta: dayjs().subtract(16, 'days').toISOString(),
      status: 'Delivered',
    },
    {
        id: 4,
        origin: 'San Francisco',
        destination: 'Seattle',
        carrier: 'DHL',
        shipDate: dayjs().subtract(27, 'days').toISOString(),
        eta: dayjs().subtract(13, 'days').toISOString(),
        status: 'Delivered',
      },
      {
        id: 5,
        origin: 'San Francisco',
        destination: 'Seattle',
        carrier: 'DHL',
        shipDate: dayjs().subtract(17, 'days').toISOString(),
        eta: dayjs().subtract(1, 'days').toISOString(),
        status: 'Delivered',
      },
      {
        id: 6,
        origin: 'San Francisco',
        destination: 'Seattle',
        carrier: 'DHL',
        shipDate: dayjs().subtract(7, 'days').toISOString(),
        eta: dayjs().subtract(1, 'days').toISOString(),
        status: 'Delivered',
      },
      {
        id: 7,
        origin: 'San Francisco',
        destination: 'Seattle',
        carrier: 'DHL',
        shipDate: dayjs().subtract(7, 'days').toISOString(),
        eta: dayjs().subtract(1, 'days').toISOString(),
        status: 'Delivered',
      },
      {
        id: 8,
        origin: 'San Francisco',
        destination: 'Seattle',
        carrier: 'DHL',
        shipDate: dayjs().subtract(7, 'days').toISOString(),
        eta: dayjs().subtract(1, 'days').toISOString(),
        status: 'Delivered',
      },
      {
        id: 9,
        origin: 'San Francisco',
        destination: 'Seattle',
        carrier: 'DHL',
        shipDate: dayjs().subtract(7, 'days').toISOString(),
        eta: dayjs().subtract(1, 'days').toISOString(),
        status: 'Delivered',
      },
      {
        id: 10,
        origin: 'San Francisco',
        destination: 'Seattle',
        carrier: 'DHL',
        shipDate: dayjs().subtract(7, 'days').toISOString(),
        eta: dayjs().subtract(1, 'days').toISOString(),
        status: 'Delivered',
      },
      {
        id: 11,
        origin: 'San Francisco',
        destination: 'Seattle',
        carrier: 'DHL',
        shipDate: dayjs().subtract(7, 'days').toISOString(),
        eta: dayjs().subtract(1, 'days').toISOString(),
        status: 'Delivered',
      },
      {
        id: 12,
        origin: 'San Francisco',
        destination: 'Seattle',
        carrier: 'DHL',
        shipDate: dayjs().subtract(7, 'days').toISOString(),
        eta: dayjs().subtract(1, 'days').toISOString(),
        status: 'Delivered',
      },
      {
        id: 13,
        origin: 'San Francisco',
        destination: 'Seattle',
        carrier: 'DHL',
        shipDate: dayjs().subtract(7, 'days').toISOString(),
        eta: dayjs().subtract(1, 'days').toISOString(),
        status: 'Delivered',
      },
      {
        id: 14,
        origin: 'San Francisco',
        destination: 'Seattle',
        carrier: 'DHL',
        shipDate: dayjs().subtract(7, 'days').toISOString(),
        eta: dayjs().subtract(1, 'days').toISOString(),
        status: 'Delivered',
      },
      {
        id: 15,
        origin: 'San Francisco',
        destination: 'Seattle',
        carrier: 'DHL',
        shipDate: dayjs().subtract(7, 'days').toISOString(),
        eta: dayjs().subtract(1, 'days').toISOString(),
        status: 'Delivered',
      },
      {
        id: 16,
        origin: 'San Francisco',
        destination: 'Seattle',
        carrier: 'DHL',
        shipDate: dayjs().subtract(7, 'days').toISOString(),
        eta: dayjs().subtract(1, 'days').toISOString(),
        status: 'Delivered',
      },
      {
        id: 17,
        origin: 'San Francisco',
        destination: 'Seattle',
        carrier: 'DHL',
        shipDate: dayjs().subtract(7, 'days').toISOString(),
        eta: dayjs().subtract(1, 'days').toISOString(),
        status: 'Delivered',
      },
      {
        id: 18,
        origin: 'San Francisco',
        destination: 'Seattle',
        carrier: 'DHL',
        shipDate: dayjs().subtract(7, 'days').toISOString(),
        eta: dayjs().subtract(1, 'days').toISOString(),
        status: 'Delivered',
      },
  ];

  const isLoading = false; // Simulate loading state
  const error = null; // Simulate no error

  /* ----------------- grid columns ----------------- */
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'origin', headerName: 'Origin', flex: 1 },
    { field: 'destination', headerName: 'Destination', flex: 1 },
    { field: 'carrier', headerName: 'Carrier', flex: 1 },
    {
      field: 'shipDate',
      headerName: 'Ship Date',
      flex: 1,
      valueGetter: ({ value }) => dayjs(value).format('YYYY-MM-DD'),
      sortComparator: (v1, v2) => dayjs(v1).unix() - dayjs(v2).unix(),
    },
    {
      field: 'eta',
      headerName: 'ETA',
      flex: 1,
      valueGetter: ({ value }) => dayjs(value).format('YYYY-MM-DD'),
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: ({ value }) => (
        <Chip
          label={value}
          color={
            value === 'Delivered'
              ? 'success'
              : value === 'Delayed'
              ? 'warning'
              : 'info'
          }
          size="small"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="outlined"
          size="small"
          onClick={() => handleOpen(params.row)}
          sx={{ visibility: 'hidden' }}
        >
          Update Status
        </Button>
      ),
      cellClassName: 'hover-button-cell',
    },
  ];

  if (error) return <p>Failed to load.</p>;

  return (
    <Stack
      spacing={2}
      sx={{
        padding: '5px',
        paddingTop: '15px',
        backgroundColor: '#f9f9f9',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh', // Full viewport height
      }}
    >
      {/* ---------- Toolbar ------------ */}
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
        sx={{ m: 2 }}
      >
        {/* Dashboard Title */}
        <Stack direction={'row'} gap={4} sx={{pl: 5}}>
        <Typography variant="h6" component="div">
          Dashboard
        </Typography>
        <Button
            variant="contained"
            color="primary"
            onClick={() => router.push('/shipments')}
          >
            Create Shipment
        </Button>
        </Stack>
        {/* Filters and Navigation */}
        <Stack direction="row" spacing={2} alignItems="center">
          <DateTimePicker
            label="From"
            value={dateRange[0]}
            onChange={(newValue) => setDateRange([newValue, dateRange[1]])}
            slotProps={{ textField: { size: 'small' } }}
          />
          <DateTimePicker
            label="To"
            value={dateRange[1]}
            onChange={(newValue) => setDateRange([dateRange[0], newValue])}
            slotProps={{ textField: { size: 'small' } }}
          />
          <Autocomplete
            options={['Pending', 'In Transit', 'Delayed', 'Delivered']}
            size="small"
            sx={{ width: 180 }}
            value={status}
            onChange={(_, v) => setStatus(v)}
            renderInput={(params) => <TextField {...params} label="Status" />}
          />
          <Autocomplete
            options={['UPS', 'DHL', 'FedEx']}
            size="small"
            sx={{ width: 180 }}
            value={carrier}
            onChange={(_, v) => setCarrier(v)}
            renderInput={(params) => <TextField {...params} label="Carrier" />}
          />
          <IconButton onClick={() => console.log('Refresh clicked')} title="Refresh">
            <RefreshIcon />
          </IconButton>
        </Stack>
      </Stack>


      {/* ----------- DataGrid ----------- */}
      <Box
        sx={{
          flex: 1,
          width: '100%',
          '& .MuiDataGrid-cell:hover .hover-button-cell button': {
            visibility: 'visible',
          },
        }}
      >
        <DataGrid
          rows={data}
          columns={columns}
          loading={isLoading}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10, 25, 50]}
          disableRowSelectionOnClick
        />
      </Box>

      {/* ----------- Modal ----------- */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Update Shipment Status
          </Typography>
          <Autocomplete
            options={['Pending', 'In Transit', 'Delayed', 'Delivered']}
            onChange={(_, newValue) => handleStatusUpdate(newValue || '')}
            renderInput={(params) => <TextField {...params} label="Status" />}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleStatusUpdate('Delivered')}
            sx={{ mt: 2 }}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </Stack>
  );
}