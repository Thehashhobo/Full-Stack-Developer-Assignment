'use client';
import { DataGrid, GridColDef, GridCellParams } from '@mui/x-data-grid';
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
import RefreshIcon from '@mui/icons-material/Refresh';
import dayjs, { Dayjs } from 'dayjs';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchShipments, updateShipmentStatus } from '../../lib/api'; // Import API functions
import { useCarrierContext } from '../../components/CarrierContext'; // Import CarrierContext

export default function Dashboard() {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]); // Data for the DataGrid
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const { carriers, isLoading: isCarriersLoading, error: carriersError } = useCarrierContext(); // Use CarrierContext

  /* ---------------- toolbar state ---------------- */
  const [status, setStatus] = useState<string | null>(null);
  const [carrier, setCarrier] = useState<string | null>(null);

  /* ---------------- pagination state ---------------- */
  const [totalItems, setTotalItems] = useState(15); // Total number of items for pagination
  const rowHeight = 52; // Default row height for MUI DataGrid
  const toolbarHeight = 160; // Approximate height of the toolbar and other elements
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 1, // Default page size
  });
   // Function to calculate the number of rows that fit in the viewport
   const calculatePageSize = () => {
    const screenHeight = window.innerHeight; // Get the viewport height
    const devicePixelRatio = window.devicePixelRatio || 1; // Get the device pixel ratio
    const normalizedHeight = screenHeight * devicePixelRatio; // Normalize the screen height
    const availableHeight = normalizedHeight - toolbarHeight * devicePixelRatio; // Adjust for toolbar height
    const rowsPerPage = Math.floor(availableHeight / (rowHeight * devicePixelRatio)); // Calculate rows per page

    // Update the pagination model with the calculated page size
    setPaginationModel((prev) => ({
      ...prev,
      pageSize: rowsPerPage > 0 ? rowsPerPage : 1, // Ensure at least 1 row per page
    }));
  };
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

  /* ---------------- Update status ---------------- */
  const handleStatusUpdate = async (newStatus: string) => {
    if (selectedRow) {
      try {
        await updateShipmentStatus(selectedRow.id, newStatus); // Use API function

        // Update the local data after a successful API call
        const updatedData = data.map((row) =>
          row.id === selectedRow.id ? { ...row, status: newStatus } : row
        );
        setData(updatedData);
        handleClose();
      } catch (err) {
        console.error(err);
        setError('Failed to update shipment status');
      }
    }
  };

  /* ---------------- Fetch Data ---------------- */
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const fetchedData = await fetchShipments({
        page: paginationModel.page,
        pageSize: paginationModel.pageSize,
        status,
        carrier: carrier ? carriers.nameToId[carrier] : null
      });
      const shipments = fetchedData.shipments || []; // Ensure shipments is an array
      setTotalItems(fetchedData.totalCount || 10); // Set total items for pagination

      // Add carrierId to the data and keep the translated carrier name
      const updatedData = shipments.map((shipment: any) => ({
        ...shipment,
        carrierId: shipment.carrier, // Keep the original carrier ID
        carrier: carriers.idToName[shipment.carrier] || `Unknown Carrier (${shipment.carrier})`, // Translate carrier ID to name
      }));

      setData(updatedData || []);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch shipments');
    } finally {
      setIsLoading(false);
    }
  };

  // calculate page size after carriers are loaded
  useEffect(() => {
    if (!isCarriersLoading) {
      calculatePageSize();
    }
  }, [isCarriersLoading]);

  // Fetch data when page, filter or sort changes
  useEffect(() => {
    if (paginationModel.pageSize > 1) {
      fetchData();
    }
  }, [paginationModel.page, paginationModel.pageSize, status, carrier ? carriers.nameToId[carrier] : null]);

  /* ----------------- grid columns ----------------- */
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'origin', headerName: 'Origin', flex: 1 },
    { field: 'destination', headerName: 'Destination', flex: 1 },
    // { field: 'carrierId', headerName: 'Carrier ID', width: 120 }, // Column for carrier ID
    { field: 'carrier', headerName: 'Carrier Name', flex: 1 }, // Column for carrier name
    {
      field: 'shipDate',
      headerName: 'Ship Date',
      flex: 1,
      valueGetter: (params: GridCellParams) => {
        if (!params) return ''; 
        return dayjs(params as any).format('YYYY-MM-DD hA'); 
      },
    },
    {
      field: 'eta',
      headerName: 'ETA',
      flex: 1,
      valueGetter: (params: GridCellParams) => {
        if (!params) return ''; 
        return dayjs(params as any).format('YYYY-MM-DD hA'); 
      },
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
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="outlined"
          size="small"
          onClick={() => handleOpen(params.row)}
        >
          Update Status
        </Button>
      ),
    },
  ];

  if (error) return <p>{error}</p>;
  if (carriersError) return <p>{carriersError}</p>; // Handle carrier context errors
  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', // Full viewport height
        }}
      >
        <p>Loading...</p>
      </Box>
    );
  } // Handle carrier loading state

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
        <Stack direction={'row'} gap={4} sx={{ pl: 5 }}>
          <Typography variant="h4" component="div">
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
        <Stack direction="row" spacing={2} alignItems="center">
          <Autocomplete
            options={['Pending', 'In Transit', 'Delayed', 'Delivered']}
            size="small"
            sx={{ width: 180 }}
            value={status}
            onChange={(_, v) => setStatus(v)}
            renderInput={(params) => <TextField {...params} label="Status" />}
          />
          <Autocomplete
            options={Object.values(carriers.idToName)} // Extract carrier names
            size="small"
            sx={{ width: 180 }}
            value={carrier}
            onChange={(_, v) => setCarrier(v)}
            renderInput={(params) => <TextField {...params} label="Carrier" />}
          />
          <IconButton onClick={fetchData} title="Refresh">
            <RefreshIcon />
          </IconButton>
        </Stack>
      </Stack>

      {/* ----------- DataGrid ----------- */}
      <Box
        sx={{
          flex: 1,
          width: '100%',
        }}
      >
        <DataGrid
          rows={data}
          paginationMode="server"
          rowCount={totalItems}
          columns={columns}
          loading={isLoading}
          paginationModel={paginationModel}
          onPaginationModelChange={(model) => setPaginationModel(model)}
          pageSizeOptions={[paginationModel.pageSize]}
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
        </Box>
      </Modal>
    </Stack>
  );
}