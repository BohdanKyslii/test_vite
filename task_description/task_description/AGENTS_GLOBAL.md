# AGENTS_GLOBAL.md — Глобальні правила проекту test_vite

Цей документ містить правила, стандарти та архітектурні рішення проекту.
Обов'язковий до ознайомлення перед будь-яким завданням.

---

## 1. Огляд проекту

**test_vite** — React SPA для перегляду та управління замовленнями
(Orders Dashboard). Тестове завдання.

**Сторінки:**

| Сторінка       | URL            | Призначення                          |
|----------------|----------------|--------------------------------------|
| Home           | `/`            | Дашборд — KPI, топ клієнти/товари   |
| Orders         | `/orders`      | Список замовлень з фільтрами         |
| Order Detail   | `/orders/:id`  | Деталі замовлення                    |
| 404            | `*`            | Сторінка не знайдена                 |

---

## 2. Tech Stack

| Компонент        | Технологія                  |
|------------------|-----------------------------|
| Framework        | React 18 + TypeScript 5     |
| Routing          | React Router v6             |
| State/Data       | TanStack React Query v5     |
| Стилізація       | Tailwind CSS v4             |
| Збірка           | Vite 6                      |
| Лінтер           | ESLint + Prettier           |
| Менеджер пакетів | npm                         |

---

## 3. Структура проекту

```
src/
├── components/          # Перевикористовувані компоненти
│   ├── ui/
│   │   └── Text.tsx     # TEXT константи стилів
│   ├── BackButton.tsx   # Кнопка повернення
│   ├── PageState.tsx    # Стани loading/error/empty
│   ├── Pagination.tsx   # Пагінація
│   ├── SearchInput.tsx  # Поле пошуку з кнопкою скидання
│   ├── StatusFilter.tsx # Фільтр по статусу
│   ├── SortControl.tsx  # Сортування поле + напрямок
│   └── TableRowNumber.tsx # Нумерація рядків таблиці
├── data/
│   ├── orders.json          # Mock дані — список замовлень
│   └── orderDetails.json    # Mock дані — деталі замовлень
├── hooks/
│   ├── useOrders.ts         # useQuery для списку замовлень
│   └── useOrderDetail.ts    # useQuery для деталей + всіх деталей
├── pages/
│   ├── HomePage.tsx         # Дашборд з KPI і топами
│   ├── OrdersPage.tsx       # Список замовлень
│   ├── OrderDetailPage.tsx  # Деталі замовлення
│   └── NotFoundPage.tsx     # 404
├── services/
│   └── orderService.ts      # Функції отримання даних з JSON
├── types/
│   └── order.ts             # TypeScript типи та інтерфейси
├── utils/
│   ├── orderUtils.ts        # Форматування, KPI розрахунки, стилі статусів
│   └── typography.ts        # TEXT константи (альтернативне розташування)
├── App.tsx                  # Роутинг + перемикач USE_V1
├── main.tsx                 # Точка входу, провайдери
└── index.css                # @import "tailwindcss"
```

---

## 4. Mock API

Дані зберігаються в `src/data/` і імпортуються через `src/services/orderService.ts`.

**Доступні ендпоінти (mock):**

| Функція              | Опис                              |
|----------------------|-----------------------------------|
| `getOrders()`        | Список всіх замовлень             |
| `getOrderById(id)`   | Деталі замовлення по ID           |
| `getAllOrderDetails()`| Всі деталі (для KPI розрахунків)  |

Всі функції `async` з імітацією затримки через `delay()` — легко замінити на реальний `fetch`.

---

## 5. Типи даних (`src/types/order.ts`)

```ts
type OrderStatus =
  'new' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

interface Order          // рядок в таблиці замовлень
interface OrderDetail    // повні деталі замовлення
interface OrderItem      // товар в замовленні
interface Customer       // інформація про клієнта
interface TopCustomer    // для KPI топ клієнтів
interface TopProduct     // для KPI топ товарів
```

---

## 6. Утиліти (`src/utils/orderUtils.ts`)

### Форматування

| Функція                   | Опис                          | Приклад               |
|---------------------------|-------------------------------|-----------------------|
| `formatDate(str)`         | ISO → локальна дата           | `"02.01.2026"`        |
| `formatCurrency(n)`       | Число → валюта                | `"7 340 ₴"`           |
| `formatCurrencyDecimal(n)`| Число → валюта з копійками    | `"7 340,00"`          |
| `formatNumber(n)`         | Ціле число з розділювачем     | `"7 340"`             |
| `getStatusClasses(status)`| Статус → Tailwind класи       | `"bg-yellow-100 ..."`  |

### KPI розрахунки

| Функція                    | Опис                          |
|----------------------------|-------------------------------|
| `calcTotalOrders(orders)`  | Кількість замовлень           |
| `calcUniqueCustomers(orders)` | Унікальні клієнти          |
| `calcGrandTotal(orders)`   | Загальна сума                 |
| `calcTopCustomers(orders)` | Топ-5 клієнтів по сумі        |
| `calcTopProducts(details)` | Топ-5 товарів по виручці      |

---

## 7. Стилізація

### TEXT константи (`src/components/ui/Text.tsx`)

Tailwind класи згруповані в об'єкт `TEXT` для повторного використання:

```ts
TEXT.pageTitle     // заголовок сторінки h1
TEXT.sectionTitle  // підзаголовок h2
TEXT.Div           // обгортка таблиці/картки
TEXT.Table         // таблиця
TEXT.Tr            // рядок шапки таблиці
TEXT.Header        // комірка шапки th
TEXT.Id            // комірка ID
TEXT.Text          // звичайний текст td
TEXT.Date          // дата td
TEXT.Amount        // сума td
TEXT.badge         // бейдж статусу
TEXT.button        // кнопка
TEXT.loading       // текст завантаження
TEXT.error         // текст помилки
TEXT.empty         // текст порожнього стану
TEXT.label         // підпис над полем
TEXT.filter        // стиль інпуту/select фільтра
TEXT.title_kpi     // картка KPI обгортка
TEXT.text_kpi      // назва KPI
TEXT.indicator_kpi // значення KPI
```

### Правила стилізації

```
TEXT містить    — типографіку, кольори, форму
Сторінка додає — padding, margin, border, вирівнювання
```

```tsx
// padding і border окремо від TEXT
<td className={`p-3 ${TEXT.Id} border-r`}>
// відступи заголовку окремо
<h1 className={`${TEXT.pageTitle} mb-2`}>
```

### Порядок Tailwind класів

```
Layout → Spacing → Sizing → Typography → Colors → Effects → States
flex     p-4       w-full   text-sm     text-gray  border    hover:
```

---

## 8. Компоненти

### PageState — стани сторінки

```tsx
<PageState
  isLoading={isLoading}
  isError={isError}
  isEmpty={!data}
  loadingText="Завантаження..."    // необов'язково
  errorText="Помилка"              // необов'язково
  emptyText="Даних немає"          // необов'язково
/>
```

### BackButton — кнопка повернення

```tsx
<BackButton />                                    // navigate(-1)
<BackButton to="/orders" label="← До списку" />  // конкретний шлях
```

### Pagination — пагінація

```tsx
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  totalItems={sortedData.length}
  pageSize={PAGE_SIZE}
  onPageChange={setCurrentPage}
/>
```

### SearchInput — пошук

```tsx
<SearchInput
  value={search}
  onChange={handleSearch}
  placeholder="Пошук..."
  className="flex-1"    // необов'язково
/>
```

### StatusFilter, SortControl, TableRowNumber

```tsx
<StatusFilter value={statusFilter} onChange={handleStatus} />
<SortControl field={sortField} order={sortOrder}
  onFieldChange={setSortField} onOrderChange={setSortOrder} />
<TableRowNumber index={index} />
```

---

## 9. Патерни сторінок

### Порядок хуків у компоненті

```tsx
function Page() {
  // 1. Дані з сервера
  const { data, isLoading, isError } = useOrders();
  // 2. Навігація
  const navigate = useNavigate();
  // 3. URL стан (пагінація)
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page') ?? '1');
  // 4. Локальний стан (фільтри, сортування)
  const [search, setSearch] = useState('');
  // 5. Refs
  const isFirstRender = useRef(true);
  // 6. Effects
  useEffect(() => { ... }, [deps]);
  // 7. Перевірки станів
  if (isLoading || isError || !data) return <PageState ... />;
  // 8. Обчислення (filter, sort, paginate)
  // 9. return JSX
}
```

### Пагінація з URL

```tsx
const [searchParams, setSearchParams] = useSearchParams();
const currentPage = Number(searchParams.get('page') ?? '1');
const setCurrentPage = (page: number) => {
  setSearchParams({
    ...Object.fromEntries(searchParams),
    page: String(page),
  });
};
```

### Фільтрація + Сортування + Пагінація

```tsx
const filteredData = data.filter(...);
const sortedData = filteredData.slice().sort(...);
const totalPages = Math.ceil(sortedData.length / PAGE_SIZE);
const pageData = sortedData.slice(
  (currentPage - 1) * PAGE_SIZE,
  currentPage * PAGE_SIZE,
);
```

---

## 10. Git Workflow

**Гілки:**
- `feature/short-name` — нова функціональність
- `bugfix/issue-name` — виправлення

**Коміти (Conventional Commits):**
```
feat(pages): add order detail page
fix(pagination): preserve page on back navigation
refactor(utils): extract KPI calculations
style: format with prettier
docs: update task description
```

**Перед комітом:**
```bash
npm run lint      # ESLint перевірка
npm run format    # Prettier форматування
npm run build     # TypeScript + збірка
```
