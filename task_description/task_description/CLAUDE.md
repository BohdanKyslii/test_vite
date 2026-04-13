# CLAUDE.md — Швидкий довідник для Claude Code

Контекст проекту для Claude Code.
Перед кодом обов'язково читай `AGENTS_GLOBAL.md`.

---

## Проект

**test_vite** — Orders Dashboard, React 18 + TypeScript SPA.

**Tech Stack:**
- React 18 + TypeScript 5
- React Router v6 + useSearchParams для пагінації
- TanStack React Query v5
- Tailwind CSS v4
- Vite 6
- ESLint + Prettier (80 символів, одинарні лапки)

---

## Команди

```bash
npm run dev       # localhost:5173
npm run build     # production збірка
npm run lint      # ESLint
npm run format    # Prettier
```

---

## Алгоритм роботи над завданням

1. Читай `AGENTS_GLOBAL.md` — архітектура, патерни, правила
2. Читай `TASK.md` — конкретне завдання
3. Читай `AI_AGENT_CONTEXT.md` — типи, компоненти, сторінки
4. Переглянь `images/` — скриншоти (якщо є)
5. Плануй → пиши → `npm run lint` → тестуй у браузері

---

## Патерни (обов'язкові)

### Нова сторінка зі списком

```tsx
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useOrders } from '../hooks/useOrders';
import PageState from '../components/PageState';
import Pagination from '../components/Pagination';
import BackButton from '../components/BackButton';
import { TEXT } from '../components/ui/Text';

const PAGE_SIZE = 10;

function NewPage() {
  const { data, isLoading, isError } = useOrders();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page') ?? '1');
  const setCurrentPage = (page: number) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: String(page),
    });
  };
  const [search, setSearch] = useState('');
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  if (isLoading || isError || !data) {
    return (
      <PageState
        isLoading={isLoading}
        isError={isError}
        isEmpty={!data}
      />
    );
  }

  const filteredData = data.filter(...);
  const sortedData = filteredData.slice().sort(...);
  const totalPages = Math.ceil(sortedData.length / PAGE_SIZE);
  const pageData = sortedData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <BackButton label="← Назад" />
      <h1 className={`${TEXT.pageTitle} mb-2`}>Заголовок</h1>
      {/* таблиця */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={sortedData.length}
        pageSize={PAGE_SIZE}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
```

### Нова деталь сторінка

```tsx
function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: item, isLoading, isError } = useQuery(...);

  if (isLoading || isError || !item) {
    return (
      <div>
        <PageState isLoading={isLoading} isError={isError} isEmpty={!item} />
        {!isLoading && (
          <div className="flex justify-center gap-3 mt-4">
            <BackButton label="← До списку" />
            <BackButton to="/" label="На головну" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex gap-3 mb-6">
        <BackButton label="← До списку" />
        <BackButton to="/" label="На головну" />
      </div>
      {/* контент */}
    </div>
  );
}
```

### Новий сервіс

```ts
import type { MyType } from '../types/myType';
import myData from '../data/myData.json';

const data = myData as MyType[];
const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function getItems(): Promise<MyType[]> {
  await delay(300);
  return data;
}
```

### Новий хук

```ts
import { useQuery } from '@tanstack/react-query';
import { getItems } from '../services/myService';

export function useItems() {
  return useQuery({
    queryKey: ['items'],
    queryFn: getItems,
  });
}
```

---

## Структура файлів

```
components/     → BackButton, PageState, Pagination,
                  SearchInput, StatusFilter, SortControl,
                  TableRowNumber, ui/Text
pages/          → HomePage, OrdersPage, OrderDetailPage,
                  NotFoundPage (+ версії з '1')
hooks/          → useOrders, useOrderDetail
services/       → orderService
types/          → order.ts
utils/          → orderUtils.ts
data/           → orders.json, orderDetails.json
```

---

## Важливо

- Пагінація — завжди `useSearchParams`, не `useState`
- Повернення назад — `navigate(-1)`, не `navigate('/orders')`
- `setSearchParams` — завжди зберігати існуючі params через spread
- Хуки — завжди до першого `if` або `return`
- `border` без кольору — бере колір тексту, завжди додавай `border-gray-200`
- `as any` — забороняємо, використовуй `as OrderStatus`
- Перед комітом: `npm run lint` + `npm run format`
