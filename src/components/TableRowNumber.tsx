interface TableRowNumberProps {
  index: number;
}

function TableRowNumber({ index }: TableRowNumberProps) {
  return (
    <td className="p-3 text-gray-800 text-xs text-center border-r">
      {index + 1}).
    </td>
  );
}

export default TableRowNumber;

//Використання:
// додаємо колонку в <thead>:
// <th className={TEXT.Header}>№</th>
// в <tbody> між <tr ...>
// <TableRowNumber index={index} />
// перед <td (потрібної колонки)