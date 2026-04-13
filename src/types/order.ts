// Статуси замовлень
export type OrderStatus =
  | 'new'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

// Деталі замовлення (сторінка /orders/:id)
export interface OrderDetail {
  id: string;
  date: string;
  status: string;
  customer: Customer;
  items: OrderItem[];
  total: number;
}
// Інформація про клієнта
export interface Customer {
    name: string;
    email: string;
    phone: string;
    address: string;
}
// Інформація про замовлення
export interface Order {
    id: string;
    date: string;
    customerName: string;
    total: number;
    status: OrderStatus;
}
// Інформація про товар в замовленні
export interface OrderItem {
    id: string;
    title: string;
    qty: number;
    price: number;
}
