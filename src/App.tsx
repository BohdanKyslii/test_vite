import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import OrdersPage from './pages/OrdersPage';
import OrdersPage1 from './pages/OrdersPage1';
import OrderDetailPage from './pages/OrderDetailPage';
import OrderDetailPage1 from './pages/OrderDetailPage1';

// перемикач — змінюй тут true/false
const USE_V1 = true;

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/orders"
        element={USE_V1 ? <OrdersPage1 /> : <OrdersPage />}
      />
      <Route
        path="/orders/:id"
        element={
          USE_V1 ? <OrderDetailPage1 /> : <OrderDetailPage />
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<HomePage />} />
//       <Route path="/orders" element={<OrdersPage />} />
//       <Route path="/orders/:id" element={<OrderDetailPage />} />
//       <Route path="*" element={<NotFoundPage />} />
//     </Routes>
//   )
// }

export default App