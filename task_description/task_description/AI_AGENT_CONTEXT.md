# AI_AGENT_CONTEXT.md — Технічний контекст проекту test_vite

Технічний контекст для AI-агентів. Читати після `AGENTS_GLOBAL.md`.

---

## Проект

**Назва:** test_vite
**Тип:** React SPA (Single Page Application)
**Середовище:** Node.js / браузер
**React:** 18
**TypeScript:** 5.x
**Vite:** 6.x

---

## Конфігурація

### vite.config.ts

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

### tsconfig.app.json (ключові параметри)

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

---

## Залежності

### dependencies (package.json)

```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "react-router-dom": "^6.x",
  "@tanstack/react-query": "^5.x"
}
```

### devDependencies

```json
{
  "typescript": "^5.x",
  "vite": "^6.x",
  "@vitejs/plugin-react": "^4.x",
  "tailwindcss": "^4.x",
  "@tailwindcss/vite": "^4.x",
  "eslint": "^9.x",
  "prettier": "^3.x",
  "@typescript-eslint/eslint-plugin": "^8.x",
  "@typescript-eslint/parser": "^8.x",
  "eslint-config-prettier": "^9.x",
  "eslint-plugin-react-hooks": "^5.x",
  "eslint-plugin-react-refresh": "^0.4.x"
}
```

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
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
```

---

## Структура src/

```
src/
├── assets/
├── components/
│   └── ui/
├── hooks/
├── pages/
│   ├── HomePage.tsx
│   └── NotFoundPage.tsx
├── services/
│   └── api.ts
├── store/
├── types/
├── utils/
├── App.tsx
├── main.tsx
└── index.css        ← @import "tailwindcss";
```

---

## Типові патерни

### Сервіс (src/services/)

```ts
// src/services/userService.ts
const BASE_URL = import.meta.env.VITE_API_URL ?? '';

export async function getUsers(): Promise<User[]> {
  const res = await fetch(`${BASE_URL}/api/users`);
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

export async function createUser(
  data: CreateUserPayload,
): Promise<User> {
  const res = await fetch(`${BASE_URL}/api/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create user');
  return res.json();
}
```

### Хук з useQuery

```ts
// src/hooks/useUsers.ts
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../services/userService';

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });
}
```

### Хук з useMutation

```ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser } from '../services/userService';

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}
```

### Типи (src/types/)

```ts
// src/types/user.ts
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface CreateUserPayload {
  name: string;
  email: string;
}

export type UserStatus = 'active' | 'inactive' | 'pending';
```

### Сторінка

```tsx
// src/pages/UsersPage.tsx
import { useUsers } from '../hooks/useUsers';

function UsersPage() {
  const { data, isLoading, isError } = useUsers();

  if (isLoading) {
    return <p className="text-gray-500">Завантаження...</p>;
  }

  if (isError) {
    return (
      <p className="text-red-600">Помилка завантаження даних</p>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Користувачі</h1>
      <ul className="space-y-2">
        {data?.map((user) => (
          <li key={user.id} className="p-2 border rounded">
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersPage;
```

---

## ESLint конфігурація (eslint.config.js)

Проект використовує ESLint 9 flat config + Prettier.
Правила визначені в `eslint.config.js` у корені проекту.

## Prettier конфігурація (.prettierrc)

```json
{
  "printWidth": 80,
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "bracketSpacing": true,
  "arrowParens": "always"
}
```

---

## npm скрипти

```bash
npm run dev       # Vite dev сервер (localhost:5173)
npm run build     # TypeScript + Vite production збірка
npm run preview   # Прев'ю production збірки
npm run lint      # ESLint перевірка
npm run format    # Prettier форматування всього src/
```

---

## Типові помилки та як їх уникнути

| Неправильно | Правильно |
|-------------|-----------|
| `any` тип | `unknown` або конкретний тип |
| Прямий `fetch` у компоненті | Виносити в `services/` + хук |
| Стан сервера в `useState` | `useQuery` / `useMutation` |
| Бізнес-логіка у JSX | Виносити у хук або utils |
| Імпорт з відносного шляху `../../` | Налаштувати path alias `@/` |
| `console.log` у production коді | Видаляти або використовувати logger |
