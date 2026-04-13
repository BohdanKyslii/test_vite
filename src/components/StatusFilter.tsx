import type { OrderStatus } from '../types/order';
import {TEXT} from "./ui/Text.tsx";

// всі можливі статуси для відображення в select
const STATUSES: { value: OrderStatus | ''; label: string }[] =
  [
    { value: '', label: 'All status' },
    { value: 'new', label: 'New' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

interface StatusFilterProps {
  value: string;
  onChange: (value: string) => void;
}

function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={TEXT.filter}
    >
      {STATUSES.map((status) => (
        <option key={status.value} value={status.value}>
          {status.label}
        </option>
      ))}
    </select>
  );
}

export default StatusFilter;