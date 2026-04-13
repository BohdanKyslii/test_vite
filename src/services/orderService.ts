import type { Order, OrderDetail } from '../types/order';

// Імпортуємо JSON напряму — Vite підтримує це з коробки
import ordersData from '../data/orders.json';
import orderDetailsData from '../data/orderDetails.json';

// Приводимо JSON до наших типів
const orders = ordersData as Order[];
const orderDetails = orderDetailsData as OrderDetail[];

// Імітуємо затримку мережі (як справжній API)
const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// GET /orders — повертає список замовлень
export async function getOrders(): Promise<Order[]> {
  await delay(500); // імітація мережевого запиту
  //throw new Error('Test error'); // для виклику помилки в сервісі
  return orders;
}

// GET /orders/:id — повертає деталі одного замовлення
export async function getOrderById(
  id: string,
): Promise<OrderDetail> {
  await delay(300);
  const order = orderDetails.find((o) => o.id === id);
  if (!order) throw new Error(`Order ${id} not found`);
  return order;
}
// async/await для того кол пізніше замінимо JSON на реальний
// API через fetch — функції залишаться такими самими,
// змінимо лише тіло функції. Решта коду не зміниться.

// Отримати всі деталі замовлень (для топ товарів)
export async function getAllOrderDetails(): Promise<OrderDetail[]> {
  await delay(300);
  return orderDetails;
}
