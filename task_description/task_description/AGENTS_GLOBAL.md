# AGENTS_GLOBAL.md — Глобальні правила проекту test_vite

Цей документ містить правила, стандарти та архітектурні рішення проекту.
Обов'язковий до ознайомлення перед будь-яким завданням.

---

## 1. Огляд проекту

**test_vite** — React SPA проект.

> TODO: Опиши призначення проекту тут.

**Сторінки:**

| Сторінка | URL    | Призначення          |
|----------|--------|----------------------|
| Home     | `/`    | Головна сторінка     |
| 404      | `*`    | Сторінка не знайдена |

---

## 2. Tech Stack

| Компонент     | Технологія                        |
|---------------|-----------------------------------|
| Framework     | React 18 + TypeScript             |
| Routing       | React Router v6                   |
| State/Data    | TanStack React Query v5           |
| Стилізація    | Tailwind CSS v4                   |
| Збірка        | Vite 6                            |
| Лінтер        | ESLint + Prettier                 |
| Менеджер пакетів | npm                            |

---

## 3. Структура проекту

```
src/
├── assets/          # Зображення, шрифти, статика
├── components/      # Перевикористовувані компоненти
│   └── ui/          # Базові UI елементи (Button, Input, Modal)
├── pages/           # Сторінки (HomePage, NotFoundPage)
├── hooks/           # Кастомні хуки (useAuth, useFetch)
├── services/        # API запити (api.ts, userService.ts)
├── store/           # React Query клієнт, глобальний стан
├── types/           # TypeScript інтерфейси та типи
├── utils/           # Допоміжні функції
├── App.tsx          # Роутинг
├── main.tsx         # Точка входу, провайдери
└── index.css        # Tailwind імпорт
```

---

## 4. Архітектура даних

### React Query — серверний стан

Всі дані з API керуються через React Query:
- `useQuery` — отримання даних (GET)
- `useMutation` — зміна даних (POST/PUT/DELETE)
- `queryClient.invalidateQueries` — інвалідація після мутацій

### Локальний стан

- `useState` — стан компонента
- `useReducer` — складний локальний стан

---

## 5. API та сервіси

Всі запити до API знаходяться в `src/services/`.

**Базовий URL:** визначається в `src/services/api.ts`

```ts
// src/services/api.ts
const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

export const api = {
  get: (url: string) => fetch(`${BASE_URL}${url}`),
  post: (url: string, data: unknown) =>
    fetch(`${BASE_URL}${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
}
```

---

## 6. Стиль коду

### TypeScript

- Завжди визначати типи для props компонентів
- Використовувати `interface` для об'єктів, `type` для union/alias
- Уникати `any` — використовувати `unknown` якщо тип невідомий
- Експортувати типи з `src/types/`

### React компоненти

- Функціональні компоненти з arrow function або `function`
- Props — окремий `interface` вище компонента
- Один компонент — один файл
- Назва файлу = назва компонента (PascalCase)

### Файли та іменування

| Тип              | Конвенція        | Приклад               |
|------------------|------------------|-----------------------|
| Компонент        | PascalCase       | `UserCard.tsx`        |
| Хук              | camelCase        | `useUserData.ts`      |
| Сервіс           | camelCase        | `userService.ts`      |
| Тип/Інтерфейс    | PascalCase       | `User`, `ApiResponse` |
| Константа        | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT`     |
| CSS клас         | Tailwind утиліти | `className="flex..."`  |

### Форматування (Prettier)

- Максимальна довжина рядка: **80 символів**
- Відступ: **2 пробіли**
- Крапка з комою: **так**
- Лапки: **одинарні** (`'`)
- Trailing comma: **all**

---

## 7. Компонентні патерни

### Базовий компонент

```tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded ${
        variant === 'primary'
          ? 'bg-blue-600 text-white'
          : 'bg-gray-200 text-gray-800'
      }`}
    >
      {label}
    </button>
  );
}

export default Button;
```

### Компонент з React Query

```tsx
import { useQuery } from '@tanstack/react-query';

function UserList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: () =>
      fetch('/api/users').then((res) => res.json()),
  });

  if (isLoading) return <p>Завантаження...</p>;
  if (isError) return <p>Помилка завантаження</p>;

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### Кастомний хук

```ts
// src/hooks/useUsers.ts
import { useQuery } from '@tanstack/react-query';

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () =>
      fetch('/api/users').then((res) => res.json()),
  });
}
```

---

## 8. Роутинг

Роутинг налаштований у `src/App.tsx` через React Router v6:

```tsx
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
```

Нові сторінки — додавати в `src/pages/` та реєструвати в `App.tsx`.

---

## 9. Змінні середовища

Файл `.env` у кореневій директорії проекту:

```
VITE_API_URL=http://localhost:8000
```

Доступ у коді: `import.meta.env.VITE_API_URL`

> Всі змінні для Vite мають починатись з `VITE_`

---

## 10. Git Workflow

**Гілки:**
- `feature/short-name` — нова функціональність
- `bugfix/issue-name` — виправлення

**Коміти (Conventional Commits):**
```
feat(components): add UserCard component
fix(api): handle 404 response correctly
refactor(hooks): extract useUsers hook
docs: update task description
style: format with prettier
```

---

## 11. Перевірки перед комітом

```bash
npm run lint       # ESLint перевірка
npm run format     # Prettier форматування
npm run build      # TypeScript компіляція + збірка
```

Всі три команди мають виконуватись без помилок.
