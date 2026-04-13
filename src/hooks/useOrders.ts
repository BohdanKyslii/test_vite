import { useQuery } from '@tanstack/react-query';
import { getOrders } from '../services/orderService';

export function useOrders() {
  return useQuery({
    // queryKey — унікальний ключ кешу.
    // React Query запам'ятовує результат під цим ключем
    // і не робить повторний запит якщо дані вже є
    queryKey: ['orders'],

    // queryFn — функція яка отримує дані
    queryFn: getOrders,
  });
}
