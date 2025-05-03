'use client';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Stack,
  TextField,
  Autocomplete,
  Typography,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useCarrierContext } from '@/components/CarrierContext';
import { addShipment } from '../../lib/api'; // Import the addShipment function

type FormInputs = {
  origin: string;
  destination: string;
  carrier: number;
  shipDate: Dayjs;
  eta: Dayjs;
};

export default function AddShipment() {
  const router = useRouter();
  const { carriers, isLoading: isCarriersLoading, error: carriersError } = useCarrierContext(); // Use CarrierContext
  const { handleSubmit, control } = useForm<FormInputs>({
    defaultValues: {
      origin: '',
      destination: '',
      carrier: undefined,
      shipDate: dayjs(),
      eta: dayjs(),
    },
  });
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (values: FormInputs) => {
    values.carrier = carriers.nameToId[values.carrier]; // Convert carrier name to ID
    setSubmitting(true);
    try {
      await addShipment(values); // Use the addShipment function from api.ts
      router.push('/dashboard'); // Redirect to the dashboard after successful submission
    } catch (err) {
      console.error('Failed to add shipment:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        mt: 4,
        mx: 'auto',
        maxWidth: 600,
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: '#fff',
      }}
    >
      <Typography variant="h5" component="h1" sx={{ mb: 3, textAlign: 'center' }}>
        Add New Shipment
      </Typography>
      <Stack spacing={2}>
        <Controller
          name="origin"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <TextField label="Origin" {...field} fullWidth />}
        />
        <Controller
          name="destination"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <TextField label="Destination" {...field} fullWidth />}
        />
        <Controller
          name="carrier"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Autocomplete
              options={Object.values(carriers.idToName)}
              onChange={(_, v) => field.onChange(v)}
              renderInput={(params) => <TextField {...params} label="Carrier" fullWidth />}
            />
          )}
        />
        <Controller
          name="shipDate"
          control={control}
          render={({ field }) => (
            <DateTimePicker
              label="Ship Date"
              value={field.value}
              onChange={field.onChange}
              slotProps={{ textField: { size: 'small', fullWidth: true } }}
            />
          )}
        />
        <Controller
          name="eta"
          control={control}
          render={({ field }) => (
            <DateTimePicker
              label="ETA"
              value={field.value}
              onChange={field.onChange}
              slotProps={{ textField: { size: 'small', fullWidth: true } }}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={submitting}
          sx={{ mt: 2 }}
        >
          Add Shipment
        </Button>
      </Stack>
    </Box>
  );
}