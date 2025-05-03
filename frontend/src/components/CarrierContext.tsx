'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchCarriers } from '../lib/api';

type CarrierContextType = {
  carriers: {
    idToName: { [id: number]: string };
    nameToId: { [name: string]: number };
  };
  isLoading: boolean;
  error: string | null;
};
// context for carriers to avoid frequent API calls and sharing data between dashbaord and add shipment pages
const CarrierContext = createContext<CarrierContextType | undefined>(undefined);

export const CarrierProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [carriers, setCarriers] = useState<{
    idToName: { [id: number]: string };
    nameToId: { [name: string]: number };
  }>({
    idToName: {},
    nameToId: {},
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCarriers = async () => {
      try {
        const carrierList = await fetchCarriers(); // Assume fetchCarriers returns an array of carrier names
        const idToName: { [id: number]: string } = {};
        const nameToId: { [name: string]: number } = {};

        carrierList.forEach((carrierName: string, index: number) => {
          idToName[index + 1] = carrierName; // 1-indexed
          nameToId[carrierName] = index + 1;
        });

        setCarriers({ idToName, nameToId });
      } catch (err) {
        console.error('Failed to fetch carriers:', err);
        setError('Failed to fetch carriers');
      } finally {
        setIsLoading(false);
      }
    };

    loadCarriers();
  }, []);

  return (
    <CarrierContext.Provider value={{ carriers, isLoading, error }}>
      {children}
    </CarrierContext.Provider>
  );
};

export const useCarrierContext = (): CarrierContextType => {
  const context = useContext(CarrierContext);
  if (!context) {
    throw new Error('useCarrierContext must be used within a CarrierProvider');
  }
  return context;
};