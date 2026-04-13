import { TEXT } from '../components/ui/Text';

interface PageStateProps {
  isLoading?: boolean;
  isError?: boolean;
  isEmpty?: boolean;
  loadingText?: string;
  errorText?: string;
  emptyText?: string;
}

function PageState({
  isLoading,
  isError,
  isEmpty,
  loadingText = 'Завантаження...',
  errorText = 'Помилка завантаження',
  emptyText = 'Даних немає',
}: PageStateProps) {
  if (isLoading) {
    return (
      <div className={TEXT.general}>
        {/* Анімований спінер — border-t робить одну сторону
            кольоровою, animate-spin крутить його */}
        <div className={`${TEXT.loading_anime} animate-spin`}/>
        <p className={TEXT.loading}>
            {loadingText}</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={TEXT.general}>
        {/* animate-pulse — плавне моргання */}
        <div className={`${TEXT.error_anime} animate-pulse flex`}>
          <span className="text-4xl">⚠️</span>
          <p className={TEXT.error}>
            {errorText}
          </p>
        </div>
        <p className="text-xs text-gray-400">
          Спробуйте оновити сторінку
        </p>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className={TEXT.general}>
        <span className="text-4xl">📭</span>
        <p className={TEXT.empty}>
            {emptyText}</p>
      </div>
    );
  }

  return null;
}

export default PageState;
