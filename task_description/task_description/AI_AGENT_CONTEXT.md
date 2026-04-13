# AI_AGENT_CONTEXT.md — Технічний контекст проекту test_vite

Технічний контекст для AI-агентів. Читати після `AGENTS_GLOBAL.md`.

---

## Проект

**Назва:** test_vite — Orders Dashboard
**Тип:** React SPA
**React:** 18 + TypeScript 5
**Vite:** 6

---

## Точка входу — main.tsx

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import App from './App.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);
```

---

## Роутинг — App.tsx

```tsx
// Перемикач між двома версіями сторінок
const USE_V1 = true; // true = навчальна версія, false = основна

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/orders"
        element={USE_V1 ? <OrdersPage1 /> : <OrdersPage />} />
      <Route path="/orders/:id"
        element={USE_V1 ? <OrderDetailPage1 /> : <OrderDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
```

---

## Типи (`src/types/order.ts`)

```ts
export type OrderStatus =
  | 'new' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  date: string;           // ISO 8601
  customerName: string;
  total: number;
  status: OrderStatus;
}

export interface OrderItem {
  id: string;
  title: string;
  qty: number;
  price: number;
}

export interface Customer {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface OrderDetail {
  id: string;
  date: string;
  status: OrderStatus;
  customer: Customer;
  items: OrderItem[];
  total: number;
}

export interface TopCustomer {
  name: string;
  total: number;
  ordersCount: number;
}

export interface TopProduct {
  title: string;
  qty: number;
  revenue: number;
}
```

---

## Сервіс (`src/services/orderService.ts`)

```ts
// Імпорт JSON як mock API
import ordersData from '../data/orders.json';
import orderDetailsData from '../data/orderDetails.json';

const orders = ordersData as Order[];
const orderDetails = orderDetailsData as OrderDetail[];

// Імітація затримки мережі
const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function getOrders(): Promise<Order[]>
export async function getOrderById(id: string): Promise<OrderDetail>
export async function getAllOrderDetails(): Promise<OrderDetail[]>
```

---

## Хуки

### useOrders.ts
```ts
export function useOrders() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  });
}
```

### useOrderDetail.ts
```ts
// Деталі одного замовлення
export function useOrderDetail(id: string) {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: () => getOrderById(id),
  });
}

// Всі деталі (для KPI на HomePage)
export function useOrderDetails() {
  return useQuery({
    queryKey: ['orderDetails'],
    queryFn: getAllOrderDetails,
  });
}
```

---

## Компоненти

### PageState.tsx
```tsx
interface PageStateProps {
  isLoading?: boolean;
  isError?: boolean;
  isEmpty?: boolean;
  loadingText?: string;  // дефолт: 'Завантаження...'
  errorText?: string;    // дефолт: 'Помилка завантаження'
  emptyText?: string;    // дефолт: 'Даних немає'
}
// Показує спінер / помилку з ⚠️ / порожній стан з 📭
```

### BackButton.tsx
```tsx
interface BackButtonProps {
  to?: string;           // якщо не передано — navigate(-1)
  label?: string;        // дефолт: '← Назад'
}
```

### Pagination.tsx
```tsx
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}
// Показується тільки якщо totalPages > 1
```

### SearchInput.tsx
```tsx
interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;    // наприклад 'flex-1'
}
// Кнопка ✕ Скинути з'являється коли є текст
```

### StatusFilter.tsx
```tsx
interface StatusFilterProps {
  value: string;         // '' = всі статуси
  onChange: (value: string) => void;
}
// <select> з опціями: всі/new/processing/shipped/delivered/cancelled
```

### SortControl.tsx
```tsx
interface SortControlProps {
  field: 'date' | 'total';
  order: 'asc' | 'desc';
  onFieldChange: (field: 'date' | 'total') => void;
  onOrderChange: (order: 'asc' | 'desc') => void;
}
// <select> для поля + кнопка toggle для напрямку
```

### TableRowNumber.tsx
```tsx
interface TableRowNumberProps {
  index: number;  // index з .map() — відображає index + 1
}
// Повертає <td> з порядковим номером
```

---

## Сторінки

### HomePage.tsx
- KPI: кількість замовлень, унікальні клієнти, загальний оборот
- Навігаційні картки: до списку замовлень, до останнього замовлення
- Топ-5 клієнтів по сумі
- Топ-5 товарів по виручці
- Останнє замовлення — розраховується по найпізнішій даті + більшому ID

### OrdersPage.tsx / OrdersPage1.tsx
- Таблиця: №, ID, Дата, Клієнт, Вартість, Статус
- Фільтр по ID/імені клієнта (`SearchInput`)
- Фільтр по статусу (`StatusFilter`)
- Сортування по даті або сумі (`SortControl`)
- Пагінація 10 на сторінку (`Pagination`) — сторінка в URL
- Клік по рядку → `/orders/:id`

### OrderDetailPage.tsx / OrderDetailPage1.tsx
- Заголовок: `Замовлення #ID` + бейдж статусу
- Блок клієнта: ім'я, email, телефон, адреса
- Блок замовлення: дата, сума (розрахована з items)
- Попередження якщо `grandTotal !== order.total`
- Таблиця товарів: назва, кількість, ціна, сума
- `tfoot` з Grand Total
- Кнопки: `← До списку замовлень` (navigate(-1)), `На головну`

---

## Типові помилки та як їх уникнути

| Неправильно | Правильно |
|-------------|-----------|
| `useState` для пагінації | `useSearchParams` — зберігає при поверненні |
| `navigate('/orders')` з деталей | `navigate(-1)` — повертає на ту саму сторінку |
| `setSearchParams({ page })` | `setSearchParams({ ...Object.fromEntries(searchParams), page })` |
| `useEffect` для скидання сторінки | Скидати в handlers: `setCurrentPage(1)` |
| `any` тип для `order.status` | `order.status as OrderStatus` + імпорт типу |
| `.map()` всередині `<td>` | `.map()` тільки на рівні `<tr>` в `<tbody>` |
| Хуки після `if` умов | Всі хуки завжди перед першим `if` або `return` |
| `border-r-2` без `border-gray-200` | Завжди додавати колір межі інакше бере колір тексту |

---

## npm скрипти

```bash
npm run dev       # Vite dev сервер → localhost:5173
npm run build     # TypeScript + production збірка
npm run preview   # Прев'ю production збірки
npm run lint      # ESLint перевірка
npm run format    # Prettier форматування src/
```
