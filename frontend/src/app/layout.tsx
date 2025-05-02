import { ThemeProviderWrapper } from '@/components/ThemeProviderWrapper';
import { DateAdapterProvider } from '@/components/DateAdapterProvider';

export const metadata = { title: 'Shipment Tracker' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body> 
        <ThemeProviderWrapper>
          <DateAdapterProvider>
            {children}
          </DateAdapterProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}