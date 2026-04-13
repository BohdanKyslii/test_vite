import { useParams, useNavigate } from 'react-router-dom';
import { useOrderDetail } from '../hooks/useOrderDetail';
import { formatCurrency, formatDate, getStatusClasses } from '../utils/orderUtils';

function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: order, isLoading, isError } = useOrderDetail(id || '');

  if (isLoading) {
    return <div className="p-6 text-center text-gray-500">Завантаження деталей замовлення...</div>;
  }

  if (isError || !order) {
    return (
        <div className="p-6 text-center text-red-600">
          <p className="mb-4">Помилка: Замовлення не знайдено</p>
                      <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              ← До списку замовлень
            </button>
        </div>
    );
  }

  const grandTotal = order.items.reduce(
  (acc, item) => acc + item.price * item.qty,
  0,
);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex gap-3 mb-6">
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
      >
        <span className="mr-1">←</span> До списку замовлень
      </button>
      <button
        onClick={() => navigate('/')}
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
      >
        <span className="mr-1"></span> На головну
      </button>
    </div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Order {order.id}</h1>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusClasses(order.status as any)}`}>
          {order.status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Customer Info */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold mb-4 text-gray-800 border-b pb-2">Customer Info</h2>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Name</p>
              <p className="font-medium">{order.customer.name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Email</p>
              <p className="font-medium">{order.customer.email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Phone</p>
              <p className="font-medium">{order.customer.phone}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Address</p>
              <p className="text-sm text-gray-600">{order.customer.address}</p>
            </div>
          </div>
        </div>

        {/* Order Info */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold mb-4 text-gray-800 border-b pb-2">Order Info</h2>
          <div className="space-y-4">

            {/* Попередження якщо є розбіжність */}
            {grandTotal !== order.total && (
                <div
                    className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                  <p className="font-semibold mb-1">⚠️ Є розбіжність: {formatCurrency(grandTotal - order.total)}</p>
                  <p>Загальна сума по товарам: {formatCurrency(grandTotal)}</p>
                  <p>Загальна сума замовлення: {formatCurrency(order.total)}</p>
                </div>
            )}

            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Date</p>
              <p className="font-medium text-lg">{formatDate(order.date)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Total Amount</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(order.total)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 bg-gray-50 border-b">
          <h2 className="font-bold text-gray-800">Order Items</h2>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="text-xs uppercase text-gray-400 tracking-wider border-b bg-gray-50">
              <th className="px-6 py-3 font-semibold">Title</th>
              <th className="px-6 py-3 font-semibold text-center">Qty</th>
              <th className="px-6 py-3 font-semibold text-right">Price</th>
              <th className="px-6 py-3 font-semibold text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {order.items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium">{item.title}</td>
                <td className="px-6 py-4 text-center">{item.qty}</td>
                <td className="px-6 py-4 text-right text-gray-500">{formatCurrency(item.price)}</td>
                <td className="px-6 py-4 text-right font-semibold">{formatCurrency(item.price * item.qty)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50 font-bold">
              <td colSpan={3} className="px-6 py-4 text-right text-gray-800">Grand Total:</td>
              <td className="px-6 py-4 text-right text-blue-600 text-lg">{formatCurrency(grandTotal)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default OrderDetailPage;
