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

type FormInputs = {
  origin: string;
  destination: string;
  carrier: string;
  shipDate: Dayjs;
  eta: Dayjs;
};

export default function AddShipment() {
  const router = useRouter();
  const { handleSubmit, control } = useForm<FormInputs>({
    defaultValues: {
      origin: '', // Provide an initial value
      destination: '', // Provide an initial value
      carrier: '', // Provide an initial value
      shipDate: dayjs(), // Use dayjs object for date fields
      eta: dayjs(), // Use dayjs object for date fields
    },
  });
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (values: FormInputs) => {
    setSubmitting(true);
    await fetch('/api/shipments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...values,
        shipDate: values.shipDate.toISOString(), // Convert to ISO string
        eta: values.eta.toISOString(), // Convert to ISO string
      }),
    });
    router.push('/dashboard');
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
              options={['UPS', 'DHL', 'FedEx']}
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