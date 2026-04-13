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
| Проект     | test_vite                                       |
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

> Детальний опис завдання. Що змінити, що додати, як має виглядати результат.

---

## Скриншоти / Мокапи

Файли знаходяться в `task_description/images/`

---

## Технічні вимоги

### Компоненти (`src/components/`)
- [ ] Props типізовані через `interface`
- [ ] Без `any` типів
- [ ] Tailwind для стилізації (без inline styles)
- [ ] Довжина рядка ≤ 80 символів

### Сторінки (`src/pages/`)
- [ ] Зареєстровані в `src/App.tsx`
- [ ] Стан завантаження та помилки оброблені

### Хуки (`src/hooks/`)
- [ ] Серверний стан — через `useQuery` / `useMutation`
- [ ] Інвалідація кешу після мутацій

### Сервіси (`src/services/`)
- [ ] Fetch функції винесені з компонентів
- [ ] Помилки кидаються через `throw new Error(...)`

### Типи (`src/types/`)
- [ ] Нові інтерфейси додані у відповідний файл

---

## Критерії прийняття (Acceptance Criteria)

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
- [ ] Коміт за Conventional Commits: `feat/fix/refactor(scope): description`
