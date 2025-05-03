import { ThemeProviderWrapper } from '@/components/ThemeProviderWrapper';
import { DateAdapterProvider } from '@/components/DateAdapterProvider';
import { CarrierProvider } from '../components/CarrierContext';

export const metadata = { title: 'Shipment Tracker' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body> 
        <ThemeProviderWrapper>
          <DateAdapterProvider>
            <CarrierProvider>
              {children}
            </CarrierProvider>
          </DateAdapterProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}