import { Link } from 'react-router-dom';
import { useOrders } from '../hooks/useOrders';
import { useOrderDetails } from '../hooks/useOrderDetail';
import {
  calcTotalOrders,
  calcUniqueCustomers,
  calcGrandTotal,
  calcTopCustomers,
  calcTopProducts,
  formatCurrency,
  formatDate, formatCurrencyDecimal,
} from '../utils/orderUtils';
import PageState from '../components/PageState';
import {TEXT} from "../components/ui/Text.tsx";
import TableRowNumber from "../components/TableRowNumber.tsx";

function HomePage() {
  const { data, isLoading, isError } = useOrders();
  const { data: details } = useOrderDetails();

  // розраховуємо топи — якщо дані ще не завантажились
  // використовуємо порожній масив []
  const topCustomers = calcTopCustomers(data ?? []);
  const topProducts = calcTopProducts(details ?? []);
  // .reduce() знаходить замовлення з найпізнішою датою
  // порівнюємо дати через getTime() — повертає мілісекунди
  // якщо дати однакові — беремо більший id
  const lastOrder = (data ?? []).reduce(
      (latest, order) => {
        const latestTime = new Date(latest.date).getTime();
        const orderTime = new Date(order.date).getTime();

        if (orderTime > latestTime) return order;
        if (orderTime === latestTime) {
          // порівнюємо id як числа
          return Number(order.id) > Number(latest.id)
              ? order
              : latest;
        }
        return latest;
      },
      (data ?? [])[0], // початкове значення — перший елемент
  );

  if (isLoading || isError || !data) {
    return (
      <PageState
        isLoading={isLoading}
        isError={isError}
        errorText="Помилка завантаження даних"
        isEmpty={!data}
        emptyText="Замовлень немає"
      />
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className={TEXT.pageTitle}>
        Інформаційна панель замовлень
      </h1>
      <p className={TEXT.sectionTitle}>
        Загальна статистика замовлень
      </p>

      {/* Навігація */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <Link
          to="/orders"
          className="bg-blue-600 text-white rounded-lg p-4 hover:bg-blue-700 transition-colors"
        >
          <p className={TEXT.title_link}>
            Замовлення
          </p>
          <p className={TEXT.signature_link}>
            Перегляд, фільтрація та сортування замовлень
          </p>
        </Link>
        <Link
          to={lastOrder ? `/orders/${lastOrder.id}` : '/orders'}
          className="bg-purple-600 text-white rounded-lg p-4 hover:bg-purple-700 transition-colors"
        >
          <p className={TEXT.title_link}>
            Останнє замовлення
          </p>
          <p className={TEXT.signature_link}>
            {lastOrder
              ? `ID: ${lastOrder.id} — ${formatDate(lastOrder.date)}`
              : 'Немає замовлень'}
          </p>
        </Link>
      </div>

      {/* KPI блок */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className={TEXT.title_kpi}>
          <p className={TEXT.text_kpi}>Всього замовлень</p>
          <p className={`${TEXT.indicator_kpi} text-blue-600`}>
            {calcTotalOrders(data)}
          </p>
        </div>
        <div className={TEXT.title_kpi}>
          <p className={TEXT.text_kpi}>Унікальних клієнтів</p>
          <p className={`${TEXT.indicator_kpi} text-purple-600`}>
            {calcUniqueCustomers(data)}
          </p>
        </div>
        <div className={TEXT.title_kpi}>
          <p className={TEXT.text_kpi}>Загальний оборот</p>
          <p className={`${TEXT.indicator_kpi} text-green-600`}>
            {formatCurrency(calcGrandTotal(data))}
          </p>
        </div>
      </div>

      {/* Топ таблиці */}
      <div className="grid grid-cols-2 gap-6 mb-8">

        {/* Топ клієнти */}
        <div className={TEXT.Div}>
          <div className="p-4 border-b bg-gray-50">
            <h2 className="font-bold text-gray-800">
              Топ-5 клієнтів
            </h2>
          </div>
          <table className={TEXT.Table}>
            <thead>
              <tr className={TEXT.Tr}>
                <th className={TEXT.Header}>
                  №
                </th>
                <th className={TEXT.Header}>
                  Клієнт
                </th>
                <th className={TEXT.Header}>
                  Замовлень
                </th>
                <th className={TEXT.Header}>
                  Сума
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {topCustomers.map((customer, index) => (
                <tr
                  key={customer.name}
                  className="hover:bg-gray-50">
                  <TableRowNumber index={index} />
                  <td className={`${TEXT.Text} border-r-2`}>
                    {customer.name}
                  </td>
                  <td className={`${TEXT.Amount} border-r-2`}>
                    {customer.ordersCount}
                  </td>
                  <td className={TEXT.Amount}>
                    {formatCurrencyDecimal(customer.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Топ товари */}
        <div className={TEXT.Div}>
          <div className="p-4 border-b bg-gray-50">
            <h2 className="font-bold text-gray-800">
              Топ-5 товарів
            </h2>
          </div>
          <table className={TEXT.Table}>
            <thead>
              <tr className={TEXT.Tr}>
                <th className={TEXT.Header}>
                  №
                </th>
                <th className={TEXT.Header}>
                  Товар
                </th>
                <th className={TEXT.Header}>
                  Кількість
                </th>
                <th className={TEXT.Header}>
                  Виручка
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {topProducts.map((product, index) => (
                <tr
                  key={product.title}
                  className="hover:bg-gray-50"
                >
                  <TableRowNumber index={index} />
                  <td className={`${TEXT.Text} border-r-2`}>
                    {product.title}
                  </td>
                  <td className={`${TEXT.Amount} border-r-2`}>
                    {product.qty}
                  </td>
                  <td className={TEXT.Amount}>
                    {formatCurrencyDecimal(product.revenue)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HomePage;