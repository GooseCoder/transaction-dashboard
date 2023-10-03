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

  useEffect(() => {
    fetch("http://localhost:3001/transactions?_page=1&limit=10")
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
  }, []);

  const pageChangeHandler = (page: string) => {
    setLoading(true);
    fetch(`http://localhost:3001/transactions?_page=${page}&limit=10`)
      .then((data) => {
        setTotal(data.headers.get("X-Total-Count"));
        return data.json();
      })
      .then((data) => {
        setData(data);
        setPage(page);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  };

  const filteringHandler = (startDate: string, endDate: string) => {
    setLoading(true);
    fetch(
      `http://localhost:3001/transactions?_page=${page}&limit=10&date_gte=${startDate}&date_lte=${endDate}`
    )
      .then((data) => {
        setTotal(data.headers.get("X-Total-Count"));
        return data.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      }).catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Ops! Something went wrong...</div>;

  return (
    <div>
      <Filters onFilter={filteringHandler} />
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
