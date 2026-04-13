import { useParams } from 'react-router-dom';
import { useOrderDetail } from '../hooks/useOrderDetail';
import PageState from '../components/PageState';
import BackButton from '../components/BackButton';
import { TEXT } from '../components/ui/Text';
import {
  formatCurrencyDecimal,
  formatDate,
  getStatusClasses,
} from '../utils/orderUtils';
import type { OrderStatus } from '../types/order';

function OrderDetailPage1() {
  const { id } = useParams<{ id: string }>();
  const { data: order, isLoading, isError } = useOrderDetail(
    id || '',
  );

  if (isLoading || isError || !order) {
    return (
      <div>
        <PageState
          isLoading={isLoading}
          isError={isError}
          errorText="Замовлення не знайдено"
          isEmpty={!order}
          emptyText="Замовлення не існує"
        />
        {/* кнопки показуємо тільки якщо не завантаження */}
        {!isLoading && (
          <div className="flex justify-center gap-3 mt-4">
            <BackButton label="← До списку замовлень" />
            <BackButton to="/" label="На головну" />
          </div>
        )}
      </div>
    );
  }

  const grandTotal = order.items.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">

      {/* Кнопки навігації */}
      <div className="flex gap-3 mb-6">
        <BackButton label="← До списку замовлень" />
        <BackButton to="/" label="На головну" />
      </div>

      {/* Заголовок + статус */}
      <div className="flex justify-between items-center mb-6">
        <h1 className={`${TEXT.pageTitle}`}>
          Замовлення № {order.id}
        </h1>
        <span
          className={`${TEXT.badge} text-sm px-3 py-1 ${getStatusClasses(order.status as OrderStatus)}`}
        >
          {order.status}
        </span>
      </div>

      {/* Інфо блоки */}
      <div className="grid grid-cols-2 gap-6 mb-6">

        {/* Інформація про клієнта */}
        <div className={TEXT.Div}>
          <div className="p-3 bg-gray-50 border-b">
            <h2 className="font-semibold text-gray-700">
              Інформація про клієнта
            </h2>
          </div>
          <div className="p-4 space-y-3">
            <div>
              <p className={TEXT.label}>Ім'я</p>
              <p className={`${TEXT.Text} font-medium`}>
                {order.customer.name}
              </p>
            </div>
            <div>
              <p className={TEXT.label}>Електронна пошта</p>
              <p className={`${TEXT.Text} font-medium`}>
                {order.customer.email}
              </p>
            </div>
            <div>
              <p className={TEXT.label}>Телефон</p>
              <p className={`${TEXT.Text} font-medium`}>
                {order.customer.phone}
              </p>
            </div>
            <div>
              <p className={TEXT.label}>Адреса</p>
              <p className={`${TEXT.Text} font-medium`}>
                {order.customer.address}
              </p>
            </div>
          </div>
        </div>

        {/* Інформація про замовлення */}
        <div className={TEXT.Div}>
          <div className="p-3 bg-gray-50 border-b">
            <h2 className="font-semibold text-gray-700">
              Інформація про замовлення
            </h2>
          </div>
          <div className="p-4 space-y-3">

            {/* Попередження про розбіжність */}
            {grandTotal !== order.total && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                <p className="font-semibold mb-1">
                  ⚠️ Є розбіжність:
                </p>
                <p>
                  Загальна сума по товарам:{' '}
                  {formatCurrencyDecimal(grandTotal)}
                </p>
                <p>
                  Загальна сума замовлення:{' '}
                  {formatCurrencyDecimal(order.total)}
                </p>
              </div>
            )}

            <div>
              <p className={TEXT.label}>Дата</p>
              <p className={`${TEXT.Text} font-medium`}>
                {formatDate(order.date)}
              </p>
            </div>
            <div>
              <p className={TEXT.label}>Загальна сума</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrencyDecimal(grandTotal)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Таблиця товарів */}
      <div className={TEXT.Div}>
        <div className="p-3 bg-gray-50 border-b">
          <h2 className="font-semibold text-gray-700">
            Товари замовлення
          </h2>
        </div>
        <table className={TEXT.Table}>
          <thead>
            <tr className={TEXT.Tr}>
              <th className={`${TEXT.Header} text-left`}>
                Назва
              </th>
              <th className={TEXT.Header}>Кількість</th>
              <th className={TEXT.Header}>Ціна</th>
              <th className={`${TEXT.Header} border-r-0`}>
                Сума
              </th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className={`p-3 ${TEXT.Text} border-r`}>
                  {item.title}
                </td>
                <td
                  className={`p-3 ${TEXT.Amount} text-center border-r`}
                >
                  {item.qty}
                </td>
                <td
                  className={`p-3 ${TEXT.Amount} text-right border-r`}
                >
                  {formatCurrencyDecimal(item.price)}
                </td>
                <td className={`p-3 ${TEXT.Amount} text-right`}>
                  {formatCurrencyDecimal(item.price * item.qty)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50 border-t-2">
              <td
                colSpan={3}
                className="p-3 text-sm font-semibold text-gray-700 text-right border-r"
              >
                Grand Total:
              </td>
              <td className="p-3 text-right font-bold text-green-600">
                {formatCurrencyDecimal(grandTotal)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default OrderDetailPage1;
