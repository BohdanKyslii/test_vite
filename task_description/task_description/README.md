# Task Description — test_vite

Каталог з документацією та завданнями для проекту **test_vite**.

---

## Структура файлів

```
task_description/
├── AGENTS_GLOBAL.md    # ⭐ ГЛОБАЛЬНІ ПРАВИЛА (читати першим!)
├── AI_AGENT_CONTEXT.md # Технічний контекст (типи, хуки, сервіси)
├── CLAUDE.md           # Швидкий довідник для Claude Code
├── TASK.md             # ← СЮДИ ПИШЕМО ПОТОЧНЕ ЗАВДАННЯ
├── CHANGES.md          # Журнал змін документації
├── README.md           # Цей файл
└── images/             # Скриншоти та мокапи до завдань
```

---

## Порядок читання

```
1. AGENTS_GLOBAL.md     — архітектура, стек, патерни, конвенції
2. TASK.md              — конкретне завдання
3. AI_AGENT_CONTEXT.md  — технічні деталі типів, хуків, сервісів
4. CLAUDE.md            — швидкий довідник з прикладами коду
5. images/              — скриншоти (якщо є)
```

---

## Як використовувати TASK.md

`TASK.md` — файл **поточного завдання**. Перед початком роботи:

1. Очисти старий зміст `TASK.md`
2. Заповни за шаблоном (метадані, мета, опис, технічні вимоги)
3. Додай скриншоти або мокапи в `images/` якщо потрібно

### Для Claude Code

```
Прочитай task_description/AGENTS_GLOBAL.md,
task_description/TASK.md та
task_description/AI_AGENT_CONTEXT.md
і виконай завдання.
```

---

## Проект test_vite — коротко

**React 18 + TypeScript + Vite 6**

| Файл/Папка          | Що робить                                  |
|---------------------|--------------------------------------------|
| `src/App.tsx`       | Роутинг (React Router v6)                  |
| `src/main.tsx`      | Точка входу, провайдери (BrowserRouter, QueryClientProvider) |
| `src/pages/`        | Сторінки — реєструються в App.tsx          |
| `src/components/`   | Перевикористовувані компоненти             |
| `src/hooks/`        | useQuery / useMutation хуки                |
| `src/services/`     | Fetch функції до API                       |
| `src/types/`        | TypeScript інтерфейси та типи              |
| `src/utils/`        | Допоміжні функції                          |

---

## Типові завдання

| Тип задачі              | Що чіпати                                      |
|-------------------------|------------------------------------------------|
| Новий компонент         | `src/components/` → новий `.tsx` файл          |
| Нова сторінка           | `src/pages/` + маршрут в `App.tsx`             |
| Новий API запит         | `src/services/` + хук в `src/hooks/`           |
| Новий тип               | `src/types/` відповідний файл                  |
| Виправлення стилів      | Tailwind класи у компоненті                    |
| Глобальний стан         | `src/store/` або React Query cache             |
