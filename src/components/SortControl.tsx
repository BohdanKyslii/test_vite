import {TEXT} from "./ui/Text.tsx";

type SortField = 'date' | 'total';
type SortOrder = 'asc' | 'desc';

interface SortControlProps {
  field: SortField;
  order: SortOrder;
  onFieldChange: (field: SortField) => void;
  onOrderChange: (order: SortOrder) => void;
}

function SortControl({
  field,
  order,
  onFieldChange,
  onOrderChange,
}: SortControlProps) {
  return (
    <div className="flex gap-2">
      {/* вибір поля сортування */}
      <select
        value={field}
        onChange={(e) =>
          onFieldChange(e.target.value as SortField)
        }
        className={TEXT.filter}
      >
        <option value="date">За датою</option>
        <option value="total">За сумою</option>
      </select>

      {/* кнопка напрямку — toggle між asc і desc */}
      <button
        onClick={() =>
          onOrderChange(order === 'asc' ? 'desc' : 'asc')
        }
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm hover:bg-gray-50 min-w-32"
      >
        {order === 'asc' ? '↑ Зростання' : '↓ Спадання'}
      </button>
    </div>
  );
}

export default SortControl;