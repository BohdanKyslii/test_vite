# CLAUDE.md — Швидкий довідник для Claude Code

Контекст проекту для Claude Code.
Перед кодом обов'язково читай `AGENTS_GLOBAL.md`.

---

## Проект

**test_vite** — React 18 + TypeScript SPA.

**Tech Stack:**
- React 18 + TypeScript 5
- React Router v6
- TanStack React Query v5
- Tailwind CSS v4
- Vite 6
- ESLint + Prettier (80 символів)

---

## Команди

```bash
npm run dev        # Dev сервер → http://localhost:5173
npm run build      # Production збірка
npm run lint       # ESLint перевірка
npm run format     # Prettier форматування
```

---

## Алгоритм роботи над завданням

1. Читай `AGENTS_GLOBAL.md` — архітектура, патерни, правила
2. Читай `TASK.md` — конкретне завдання
3. Читай `AI_AGENT_CONTEXT.md` — типи, хуки, сервіси
4. Переглянь `images/` — скриншоти або мокапи (якщо є)
5. Плануй → пиши → перевіряй lint → тестуй у браузері

---

## Патерни (обов'язкові)

### Новий компонент

```tsx
// src/components/UserCard.tsx
interface UserCardProps {
  name: string;
  email: string;
}

function UserCard({ name, email }: UserCardProps) {
  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <p className="font-semibold">{name}</p>
      <p className="text-gray-500 text-sm">{email}</p>
    </div>
  );
}

export default UserCard;
```

### Нова сторінка

```tsx
// src/pages/ExamplePage.tsx
function ExamplePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Example</h1>
    </div>
  );
}

export default ExamplePage;
```

Додати маршрут у `src/App.tsx`:
```tsx
<Route path="/example" element={<ExamplePage />} />
```

### Новий сервіс (API запит)

```ts
// src/services/exampleService.ts
const BASE_URL = import.meta.env.VITE_API_URL ?? '';

export async function getItems(): Promise<Item[]> {
  const res = await fetch(`${BASE_URL}/api/items`);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}
```

### Новий хук

```ts
// src/hooks/useItems.ts
import { useQuery } from '@tanstack/react-query';
import { getItems } from '../services/exampleService';

export function useItems() {
  return useQuery({
    queryKey: ['items'],
    queryFn: getItems,
  });
}
```

### Мутація (POST/PUT/DELETE)

```ts
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
}
```

---

## Структура файлів

```
src/
├── components/    → перевикористовувані компоненти
├── pages/         → сторінки, реєструються в App.tsx
├── hooks/         → useQuery/useMutation хуки
├── services/      → fetch функції до API
├── types/         → TypeScript інтерфейси
├── utils/         → допоміжні функції
└── store/         → QueryClient, глобальний стан
```

---

## Важливо

- Максимальна довжина рядка — **80 символів** (Prettier)
- Типи — завжди визначати, `any` — заборонено
- Дані з API — тільки через `useQuery` / `useMutation`
- Бізнес-логіка — у хуках або `utils/`, не в JSX
- Нові сторінки — реєструвати в `App.tsx`
- Нові env змінні — починаються з `VITE_`
- Перед комітом: `npm run lint` + `npm run format`
