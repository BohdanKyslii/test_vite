import { useQuery } from '@tanstack/react-query';
import { getOrderById } from '../services/orderService';
import { getAllOrderDetails } from '../services/orderService';

export function useOrderDetail(id: string) {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: () => getOrderById(id),
  });
}

export function useOrderDetails() {
  return useQuery({
    queryKey: ['orderDetails'],
    queryFn: getAllOrderDetails,
  });
}
