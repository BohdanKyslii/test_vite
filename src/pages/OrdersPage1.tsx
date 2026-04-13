import { useState } from 'react'; // useEffect, useRef
import {useNavigate, useSearchParams} from 'react-router-dom';
import { useOrders, } from '../hooks/useOrders';
import TableRowNumber from '../components/TableRowNumber';
import Pagination from '../components/Pagination';
import SearchInput from '../components/SearchInput';
import StatusFilter from '../components/StatusFilter';
import SortControl from '../components/SortControl';
import PageState from '../components/PageState';
import BackButton from '../components/BackButton';
import { TEXT } from '../components/ui/Text';
import {
  formatDate,
  formatCurrencyDecimal,
  getStatusClasses,
} from '../utils/orderUtils';

const PAGE_SIZE = 10;

function OrdersPage1() {
  // 1. Дані з сервера
  const {data, isLoading, isError} = useOrders();
  // 2. Навігація
  const navigate = useNavigate();
  // 3. URL стан (пагінація)
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page') ?? '1');
  const setCurrentPage = (page: number) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: String(page),
    });
  };
  // 4. Локальний стан (фільтри та сортування)
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortField, setSortField] =
      useState<'date' | 'total'>('date');
  const [sortOrder, setSortOrder] =
      useState<'asc' | 'desc'>('desc');

  // 5. Скидання сторінки при зміні фільтрів
  // useRef — пропускаємо перший рендер щоб не скидати
  // сторінку при поверненні назад
  // const isFirstRender = useRef(true);
  // useEffect(() => {
  //   if (isFirstRender.current) {
  //     isFirstRender.current = false;
  //     return;
  //   }
  //   setCurrentPage(1);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [search, statusFilter, sortField, sortOrder]);

  // перевірки станів — після всіх хуків
  if (isLoading || isError || !data) {
    return (
      <PageState
        isLoading={isLoading}
        isError={isError}
        errorText="Замовлення не знайдено"
        isEmpty={!data}
        emptyText="Список замовлень порожній"
      />
    );
  }
  // далі без змін...

  if (isLoading || isError || !data) {
    return (
        <PageState
            isLoading={isLoading}
            isError={isError}
            errorText="Замовлення не знайдено"
            isEmpty={!data}
            emptyText="Список замовлень порожній"
        />
    );
  }

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatus = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  // фільтрація по пошуку та статусу
  const filteredData = (data ?? []).filter((order) => {
    const query = search.toLowerCase();
    const matchesSearch =
      !search ||
      order.id.toLowerCase().includes(query) ||
      order.customerName.toLowerCase().includes(query);

    const matchesStatus =
      !statusFilter || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // .slice() — копія масиву щоб не змінювати оригінал
  // .sort() — сортує копію
  const sortedData = filteredData.slice().sort((a, b) => {
    const multiplier = sortOrder === 'asc' ? 1 : -1;

    if (sortField === 'date') {
      return (
          (new Date(a.date).getTime() -
              new Date(b.date).getTime()) *
          multiplier
      );
    }
    return (a.total - b.total) * multiplier;
  });

// пагінація вже по відсортованих даних
  const totalPages = Math.ceil(sortedData.length / PAGE_SIZE);
  const pageData = sortedData.slice(
      (currentPage - 1) * PAGE_SIZE,
      currentPage * PAGE_SIZE,
  );

  return (
      <div className="p-6 max-w-5xl mx-auto">

        {/* Заголовок */}
        <div className="mb-6">
          <BackButton to="/" label="← На головну"/>
          <h1 className={`${TEXT.pageTitle} mt-3 mb-1`}>
            Список замовлень
          </h1>
          <p className={TEXT.sectionTitle}>
            Перегляд, фільтрація та сортування замовлень
          </p>
        </div>

        {/* Фільтри */}
        <div className="flex gap-3 mb-4">
          <SearchInput
              value={search}
              onChange={handleSearch}
              placeholder="Пошук по ID або імені клієнта..."
          />
          <StatusFilter
              value={statusFilter}
              onChange={handleStatus}
          />
          <SortControl
              field={sortField}
              order={sortOrder}
              onFieldChange={(f) => {
                setSortField(f);
                setCurrentPage(1);
              }}
              onOrderChange={(o) => {
                setSortOrder(o);
                setCurrentPage(1);
              }}
          />
        </div>

        {/* Лічильник результатів */}
        <p className={`${TEXT.hint} mb-2`}>
          Знайдено замовлень: {sortedData.length}
        </p>

        {/* Таблиця */}
        <div className={TEXT.Div}>
          <table className={TEXT.Table}>
            <thead>
            <tr className={TEXT.Tr}>
              <th className={`${TEXT.Header} w-10`}>№</th>
              <th className={TEXT.Header}>ID</th>
              <th className={TEXT.Header}>Дата</th>
              <th className={`${TEXT.Header} text-left`}>
                Клієнт
              </th>
              <th className={TEXT.Header}>Вартість</th>
              <th className={`${TEXT.Header} border-r-0`}>
                Статус
              </th>
            </tr>
            </thead>
            <tbody>
            {pageData.map((order, index) => (
                <tr
                    key={order.id}
                    onClick={() => navigate(`/orders/${order.id}`)}
                    className="border-b hover:bg-blue-50 cursor-pointer transition-colors"
                >
                  <TableRowNumber index={index}/>
                  <td className={`p-3 ${TEXT.Id} text-center border-r`}>
                    {order.id}
                  </td>
                  <td className={`p-3 ${TEXT.Date} text-center border-r`}>
                    {formatDate(order.date)}
                  </td>
                  <td className={`p-3 ${TEXT.Text} border-r`}>
                    {order.customerName}
                  </td>
                  <td className={`p-3 ${TEXT.Amount} text-right border-r`}>
                    {formatCurrencyDecimal(order.total)}
                  </td>
                  <td className="p-3 text-center">
                  <span
                      className={`${TEXT.badge} ${getStatusClasses(order.status)}`}
                  >
                    {order.status}
                  </span>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>

          {/* Порожній результат */}
          {pageData.length === 0 && (
              <div className="flex flex-col items-center py-10 gap-2">
                <span className="text-3xl">🔍</span>
                <p className={TEXT.empty}>Нічого не знайдено</p>
              </div>
          )}

          {/* Пагінація */}
          <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={sortedData.length}
              pageSize={PAGE_SIZE}
              onPageChange={setCurrentPage}
          />
        </div>
      </div>
  );
}

export default OrdersPage1;