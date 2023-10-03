import { Transaction } from "../types";

interface DataTableProps {
  colums: string[];
  data: Transaction[];
  total: string | null;
  page: string;
  onPageChange: (page: string) => void;
}

const DataTable = ({
  colums,
  data,
  total,
  page,
  onPageChange,
}: DataTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            {colums.map((column, idx) => (
              <th key={`col-${idx}`}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(({ id, description, amount, date }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>
                <div className="flex items-center space-x-3">{description}</div>
              </td>
              <td>{amount}</td>
              <td>{date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="join">
        {Array.from(
          { length: Number(total) / 10 + (Number(total) % 10 > 0 ? 1 : 0) },
          (_, i) => (
            <button
              key={`button-${i}`}
              className={`join-item btn ${
                page === String(i + 1) ? "btn-active" : ""
              }`}
              onClick={() => onPageChange(String(i + 1))}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};
export default DataTable;
