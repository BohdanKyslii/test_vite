import {TEXT} from "./ui/Text.tsx";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function SearchInput({
  value,
  onChange,
  placeholder = 'Пошук...',
}: SearchInputProps) {
  return (
    <div className="flex-1 relative">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${TEXT.filter} w-full pr-24`}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-red-200 hover:text-red-500 text-sm"
        >
          ✕ Скинути
        </button>
      )}
    </div>
  );
}

export default SearchInput;