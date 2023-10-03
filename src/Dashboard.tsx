import { useEffect, useState } from "react";
import DataTable from "./components/DataTable";
import { Transaction } from "./types";
import Filters from "./Filters";

const Dashboard = () => {
  const colums = ["ID", "Description", "Amount (USD)", "Date"];
  const [data, setData] = useState<Transaction[]>([]);
  const [page, setPage] = useState<string>("1");
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState<string | null>("0");
  const [error, setError] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  useEffect(() => {
    let url = "http://localhost:3001/transactions?_page=" + page + "&limit=10";
    if (startDate && endDate) {
      url += `&date_gte=${startDate}&date_lte=${endDate}`;
    }
    setLoading(true);
    fetch(url)
      .then((data) => {
        setTotal(data.headers.get("X-Total-Count"));
        return data.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, [page, startDate, endDate]);

  const pageChangeHandler = (page: string) => {
    setPage(page);
  };

  const filteringHandler = (startDate: string, endDate: string) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setPage("1");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Ops! Something went wrong...</div>;

  return (
    <div>
      <Filters sDate={startDate} eDate={endDate} onFilter={filteringHandler} />
      <DataTable
        colums={colums}
        data={data}
        page={page}
        total={total}
        onPageChange={pageChangeHandler}
      />
    </div>
  );
};
export default Dashboard;
