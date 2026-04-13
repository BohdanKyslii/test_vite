export const TEXT = {
  // Заголовки — без відступів, додаємо на сторінці
  pageTitle: 'text-2xl font-bold text-gray-900',
  sectionTitle: 'text-base text-gray-600',

  // Таблиця — структура
  Div: 'bg-white border rounded-lg shadow-sm overflow-hidden',
  Table: 'w-full text-sm border-collapse',
  Tr: 'bg-gray-100 text-left border-b-2',
  // Header без вирівнювання — додаємо text-left/text-center окремо
  Header: 'p-3 text-sm font-semibold text-gray-700 text-center border-r border-gray-600',

  // Комірки — тільки типографіка, без border і padding
  // padding і border додаємо окремо через className
  Id: 'font-mono text-blue-600 border-gray-600',
  Text: 'text-sm text-gray-900',
  Date: 'text-sm text-gray-500',
  Amount: 'text-sm font-medium text-gray-900',
  AmountTotal: 'text-base font-bold text-green-600',

  // Стани — без padding, додаємо окремо
  loading: 'text-sm text-gray-500',
  error: 'text-sm text-red-600 font-semibold',
  empty: 'text-sm text-gray-400 text-center',
  hint: 'text-xs text-gray-400',
  label: 'text-xs text-gray-400 uppercase tracking-wider',

  // Анімації для PageState
  general: 'flex flex-col items-center justify-center p-12 gap-3',
  loading_anime: 'w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin',
  error_anime: 'animate-pulse flex flex-col items-center gap-2',

  // Кнопки — без margin, додаємо окремо
  button: 'px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors text-sm',

  // Link картки
  title_link: 'text-lg font-semibold mb-1',
  signature_link: 'text-sm opacity-80',

  // КПІ картки
  title_kpi: 'bg-white border rounded-lg px-4 py-2 shadow-sm',
  text_kpi: 'text-sm text-gray-500',
  indicator_kpi: 'text-2xl font-bold',

  // Фільтри
  filter: 'border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300',

  // Бейдж
  badge: 'px-2 py-1 rounded-full text-xs font-medium',
};

// ```
// **Правило яке тут застосоване:**
// ```
// TEXT містить — типографіку, кольори, форму елементу
// Сторінка додає — padding, margin, border, вирівнювання