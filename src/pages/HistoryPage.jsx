import { HistoryItem } from "@/components/fragments/HistoryItem";
import AuthedPage from "@/components/guard/AuthedPage";
import { useCallback, useEffect, useState } from "react";
import { axiosBaseURL } from "@/lib/axios";
import { useSelector } from "react-redux";

const HistoryPage = () => {
  const [transactions, setTransactions] = useState([]);

  const userselector = useSelector((state) => state.user);

  const fetchTransactionsHistory = useCallback(async () => {
    const res = await axiosBaseURL.get("/transactions", {
      params: { userId: userselector.id },
    });
    console.log(res.data);
    setTransactions(res.data);
  }, [userselector.id]);

  useEffect(() => {
    fetchTransactionsHistory();
  }, [fetchTransactionsHistory]);

  return (
    <AuthedPage>
      <main className="min-h-screen max-w-screen-lg mx-auto px-4 mt-8">
        <h1 className="text-3xl font-bold">My Orders</h1>
        <div className="flex flex-col mt-8 gap-24">
          {transactions.map((transaction) => (
            <HistoryItem key={transaction.id} transaction={transaction} />
          ))}
        </div>
      </main>
    </AuthedPage>
  );
};

export default HistoryPage;
