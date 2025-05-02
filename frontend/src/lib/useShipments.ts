import useSWR from 'swr';

const fetcher = (url: string) =>
  fetch(url).then(res => {
    if (!res.ok) throw new Error('Network error');
    return res.json();
  });

export function useShipments(params: Record<string, string> = {}) {
  const search = new URLSearchParams(params).toString();
  const { data, error, mutate, isLoading } = useSWR(
    `/api/shipments${search ? '?' + search : ''}`,
    fetcher,
  );
  return { data, error, isLoading, mutate };
}
