"use client";
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { green } from '@mui/material/colors';
import { PropsWithChildren } from 'react';

export function ThemeProviderWrapper({ children }: PropsWithChildren) {
  const theme = createTheme({
    palette: {
      primary: green,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}