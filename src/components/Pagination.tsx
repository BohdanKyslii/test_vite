interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t">
      <p className="text-sm text-gray-500">
        Показано{' '}
        {(currentPage - 1) * pageSize + 1}–
        {Math.min(currentPage * pageSize, totalItems)}{' '}
        з {totalItems}
      </p>

      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border border-gray-200 rounded text-sm hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ←
        </button>

        {Array.from(
          { length: totalPages },
          (_, i) => i + 1,
        ).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 border rounded text-sm ${
              page === currentPage
                ? 'bg-blue-600 text-white border-blue-600'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border border-gray-200 rounded text-sm hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          →
        </button>
      </div>
    </div>
  );
}

export default Pagination;