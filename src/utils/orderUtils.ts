import type { Order, OrderStatus, OrderDetail } from '../types/order';

export function getStatusClasses(status: OrderStatus): string {
  const map: Record<OrderStatus, string> = {
    new: 'bg-blue-100 text-blue-700',
    processing: 'bg-yellow-100 text-yellow-700',
    shipped: 'bg-purple-100 text-purple-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  };
  return map[status];
}

export function formatCurrency(amount: number): string {
  return amount.toLocaleString('uk-UA') + ' ₴';
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('uk-UA');
}

// --- KPI розрахунки ---
// Приймають масив Order[] і повертають готове число.
// Можна імпортувати на будь-яку сторінку.

export function calcTotalOrders(orders: Order[]): number {
  return orders.length;
}

export function calcUniqueCustomers(orders: Order[]): number {
  return new Set(orders.map((o) => o.customerName)).size;
}

export function calcGrandTotal(orders: Order[]): number {
  return orders.reduce((acc, o) => acc + o.total, 0);
}

// Тип для рядка топ-клієнта
export interface TopCustomer {
  name: string;
  total: number;
  ordersCount: number;
}


// Топ-5 клієнтів по сумі замовлень
// Приймає масив Order[] (не деталі — тут є customerName і total)
export function calcTopCustomers(
  orders: Order[],
  limit = 5,
): TopCustomer[] {
  // Групуємо замовлення по імені клієнта
  // Record<string, TopCustomer> — об'єкт де ключ = ім'я клієнта
  const map: Record<string, TopCustomer> = {};

  orders.forEach((order) => {
    if (!map[order.customerName]) {
      map[order.customerName] = {
        name: order.customerName,
        total: 0,
        ordersCount: 0,
      };
    }
    map[order.customerName].total += order.total;
    map[order.customerName].ordersCount += 1;
  });

  // Object.values() — перетворює об'єкт на масив
  // .sort() — сортуємо по total від більшого до меншого
  // .slice(0, limit) — беремо перші 5
  return Object.values(map)
    .sort((a, b) => b.total - a.total)
    .slice(0, limit);
}

// Тип для рядка топ-товару
export interface TopProduct {
  title: string;
  qty: number;
  revenue: number;
}
// Топ-5 товарів по кількості та виручці
// Приймає масив OrderDetail[] бо тільки там є items
export function calcTopProducts(
  orders: OrderDetail[],
  limit = 5,
): TopProduct[] {
  const map: Record<string, TopProduct> = {};

  orders.forEach((order) => {
    order.items.forEach((item) => {
      if (!map[item.title]) {
        map[item.title] = {
          title: item.title,
          qty: 0,
          revenue: 0,
        };
      }
      map[item.title].qty += item.qty;
      map[item.title].revenue += item.price * item.qty;
    });
  });

  return Object.values(map)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, limit);
}

// мінімум 2 знаки і максимум 2 знаки — завжди буде рівно 2 (для . 'en-US')
export function formatCurrencyDecimal(amount: number): string {
  return amount.toLocaleString('uk-UA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// Ціле число з розділювачем тисяч: 10 230
export function formatNumber(amount: number): string {
  return amount.toLocaleString('uk-UA');
}
