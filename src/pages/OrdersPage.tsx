import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useOrders } from '../hooks/useOrders';
import Pagination from '../components/Pagination';
import {
  getStatusClasses,
  formatCurrency,
  formatDate,
} from '../utils/orderUtils';

const PAGE_SIZE = 10;

function OrdersPage() {
  // 1. Дані з сервера
  const { data, isLoading, isError } = useOrders();

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
  const isFirstRender = useRef(false);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        setCurrentPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, statusFilter, sortField, sortOrder]);

  if (isLoading) {
    return (
      <p className="p-6 text-gray-500">Завантаження...</p>
    );
  }

  if (isError) {
    return (
      <p className="p-6 text-red-600">
        Помилка завантаження замовлень
      </p>
    );
  }

  if (!data || data.length === 0) {
    return (
      <p className="p-6 text-gray-400">Замовлень немає</p>
    );
  }

  // фільтрація
  const filteredData = data.filter((order) => {
    const query = search.toLowerCase();
    const matchesSearch =
      !search ||
      order.id.toLowerCase().includes(query) ||
      order.customerName.toLowerCase().includes(query);

    const matchesStatus =
      !statusFilter || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // сортування
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

  // пагінація по відсортованих даних
  const totalPages = Math.ceil(sortedData.length / PAGE_SIZE);
  const pageData = sortedData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <button
        onClick={() => navigate('/')}
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
      >
        На головну
      </button>

      <h1 className="text-2xl font-bold mb-6">Замовлення</h1>

      {/* Пошук та фільтри */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Пошук по ID або імені клієнта..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="">Всі статуси</option>
          <option value="new">New</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select
          value={sortField}
          onChange={(e) =>
            setSortField(e.target.value as 'date' | 'total')
          }
          className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="date">За датою</option>
          <option value="total">За сумою</option>
        </select>

        <button
          onClick={() =>
            setSortOrder((prev) =>
              prev === 'asc' ? 'desc' : 'asc',
            )
          }
          className="border rounded-lg px-3 py-2 text-sm hover:bg-gray-50"
        >
          {sortOrder === 'asc' ? '↑ Зростання' : '↓ Спадання'}
        </button>
      </div>

      {/* Таблиця */}
      <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left border-b">
              <th className="p-3 font-semibold">Order ID</th>
              <th className="p-3 font-semibold">Date</th>
              <th className="p-3 font-semibold">Customer</th>
              <th className="p-3 font-semibold">Total</th>
              <th className="p-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((order, index) => (
              <tr
                key={order.id}
                onClick={() => navigate(`/orders/${order.id}`)}
                className="border-b hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <td className="p-3">
                  <span className="text-gray-400 text-xs mr-2">
                    {index + 1}.
                  </span>
                  <span className="font-mono text-blue-600">
                    {order.id}
                  </span>
                </td>
                <td className="p-3 text-gray-600">
                  {formatDate(order.date)}
                </td>
                <td className="p-3">{order.customerName}</td>
                <td className="p-3 font-medium">
                  {formatCurrency(order.total)}
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClasses(order.status)}`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {sortedData.length === 0 && (
          <p className="p-4 text-center text-gray-400">
            Нічого не знайдено
          </p>
        )}

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

export default OrdersPage;