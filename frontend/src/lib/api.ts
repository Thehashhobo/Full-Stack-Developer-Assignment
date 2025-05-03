"use client";
import axios from 'axios';
import { Dayjs } from 'dayjs';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5154';
console.log('NEXT_PUBLIC_API_BASE_URL:', process.env.NEXT_PUBLIC_API_BASE_URL);
// ---------------- Types ----------------
export type ShipmentFilters = {
  page: number;
  pageSize: number;
  status?: string | null;
  carrier?: number | null;
};

export type NewShipment = {
  origin: string;
  destination: string;
  carrier: number;
  shipDate: Dayjs;
  eta: Dayjs;
};

// ---------------- API Methods ----------------

/**
 * POST /api/shipments
 * Adds a new shipment
 */
export async function addShipment(data: NewShipment) {
  // console.log('Data sent to backend:', {
  //   ...data,
  //   shipDate: data.shipDate.toISOString(),
  //   eta: data.eta.toISOString(),
  // });
  await axios.post(`${API_BASE_URL}/api/shipment`, {
    ...data,
    shipDate: data.shipDate.toISOString(),
    eta: data.eta.toISOString(),
  }, {
    headers: { 'Content-Type': 'application/json' },
  });
}

/**
 * GET /api/shipments
 * Fetches shipment list with optional filters
 */
export async function fetchShipments(filters: ShipmentFilters) {
  // console.log('Filters sent to backend:', filters); // Debugging line
  const response = await axios.get(`${API_BASE_URL}/api/shipment`, {
    params: {
      status: filters.status || null,
      carrier: filters.carrier || null,
      pageNumber: filters.page,
      pageSize: filters.pageSize,

    },
  });
  return response.data;
}

/**
 * PUT /api/shipments/:id/status
 * Updates the status of a shipment
 */
export async function updateShipmentStatus(id: string, status: string) {
  const response = await axios.put(
    `${API_BASE_URL}/api/shipment/${id}/status`,
    { status },
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );

  if (response.status !== 200 && response.status !== 204) {
    throw new Error('Failed to update shipment status');
  }

  return response.data;
}

/**
 * GET /api/carrier
 * Fetches available carrier names
 */
export async function fetchCarriers(): Promise<string[]> {
  const response = await axios.get(`${API_BASE_URL}/api/carrier`);
  return response.data.map((carrier: { name: string }) => carrier.name);
}
