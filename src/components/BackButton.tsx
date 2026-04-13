import { useNavigate } from 'react-router-dom';
import {TEXT} from "./ui/Text.tsx";

interface BackButtonProps {
  // to — конкретний шлях, якщо не передано — navigate(-1)
  to?: string;
  label?: string;
}

function BackButton({
  to,
  label = '← Назад',
}: BackButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => (to ? navigate(to) : navigate(-1))}
      className={TEXT.button}>
      {label}
    </button>
  );
}

export default BackButton;

// Використання:
// import BackButton from '../components/BackButton';
//
// // повернутись на попередню сторінку
// <BackButton />
//
// // повернутись на конкретну сторінку
// <BackButton to="/orders" label="← До списку замовлень" />
//
// // на головну
// <BackButton to="/" label="На головну" />
//
// // кілька кнопок поряд
// <div className="flex gap-3 mb-6">
//   <BackButton to="/orders" label="← До списку замовлень" />
//   <BackButton to="/" label="На головну" />
// </div>