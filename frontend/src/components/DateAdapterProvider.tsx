'use client';
import { PropsWithChildren } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export function DateAdapterProvider({ children }: PropsWithChildren) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {children}
    </LocalizationProvider>
  );
}
