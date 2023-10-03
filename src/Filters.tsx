import { useState } from "react";

interface FiltersProps {
  onFilter: (startDate: string, endDate: string) => void;
}

const Filters = ({ onFilter }: FiltersProps) => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  return (
    <div className="flex gap-3 justify-center items-center">
      Filter by Date:
      <input
        type="text"
        placeholder="Start Date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="input input-bordered w-full max-w-xs"
      />
      <input
        type="text"
        placeholder="End Date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="input input-bordered w-full max-w-xs"
      />
      <button className="btn btn-primary" onClick={() => onFilter(startDate, endDate)}>Search</button>
    </div>
  );
};
export default Filters;
