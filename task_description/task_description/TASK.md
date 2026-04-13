# TASK.md — Поточне завдання

> Прочитай:
> task_description/AGENTS_GLOBAL.md
> task_description/TASK.md
> task_description/AI_AGENT_CONTEXT.md
> і переходь до виконання завдання.

---

## Metadata

| Поле       | Значення                                        |
|------------|-------------------------------------------------|
| Проект     | test_vite — Orders Dashboard                    |
| Тип        | Bug / Enhancement / New Feature / Refactor      |
| Пріоритет  | Low / Medium / High / Critical                  |
| Статус     | In Progress / Done / Review                     |
| Файл(и)    | components/ / pages/ / hooks/ / services/       |
| Складність | S / M / L / XL                                  |

---

## Мета

> Опиши що потрібно зробити одним реченням.

---

## Опис

> Детальний опис завдання.

---

## Скриншоти / Мокапи

Файли знаходяться в `task_description/images/`

---

## Технічні вимоги

### Компоненти (`src/components/`)
- [ ] Props типізовані через `interface`
- [ ] Без `any` типів — використовувати `as OrderStatus` якщо потрібно
- [ ] Tailwind для стилізації — використовувати `TEXT` константи
- [ ] Довжина рядка ≤ 80 символів

### Сторінки (`src/pages/`)
- [ ] Зареєстровані в `src/App.tsx`
- [ ] Всі хуки до першого `if` або `return`
- [ ] Стани loading/error/empty через `<PageState />`
- [ ] Пагінація через `useSearchParams` а не `useState`
- [ ] Повернення назад через `navigate(-1)` а не `navigate('/path')`

### Хуки (`src/hooks/`)
- [ ] Серверний стан через `useQuery` / `useMutation`
- [ ] Інвалідація кешу після мутацій

### Сервіси (`src/services/`)
- [ ] Функції винесені з компонентів
- [ ] Помилки через `throw new Error(...)`

### Типи (`src/types/`)
- [ ] Нові інтерфейси в `order.ts`

---

## Критерії прийняття

- [ ] Функціонал працює у браузері
- [ ] Немає TypeScript помилок (`npm run build`)
- [ ] ESLint без помилок (`npm run lint`)
- [ ] Prettier відформатовано (`npm run format`)
- [ ] Не зламано існуючий функціонал

---

## Definition of Done

- [ ] Всі acceptance criteria виконані
- [ ] `npm run lint` — без помилок
- [ ] `npm run format` — застосовано
- [ ] `npm run build` — успішна збірка
- [ ] Коміт: `feat/fix/refactor(scope): description`
