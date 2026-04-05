import Card from "../ui/Card";
import { useStore } from "../../store/useStore";
import { filterByTime } from "../../utils/filterByTime";

function SummaryCards() {
  const { transactions, timeFilter } = useStore();

  const filtered = filterByTime(transactions, timeFilter);

  const income = filtered
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = filtered
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

      {/* Balance */}
      <Card>
        <h3 className="text-sm text-gray-500 dark:text-gray-400">
          Balance
        </h3>
        <p className="text-2xl font-bold text-indigo-600">
          ₹{balance}
        </p>
        <p className="text-xs text-gray-400">
          Overall account balance
        </p>
      </Card>

      {/* Income */}
      <Card>
        <h3 className="text-sm text-gray-500 dark:text-gray-400">
          Income
        </h3>
        <p className="text-2xl font-bold text-green-500">
          ₹{income}
        </p>
        <p className="text-xs text-gray-400">
          Total earnings
        </p>
      </Card>

      {/* Expenses */}
      <Card>
        <h3 className="text-sm text-gray-500 dark:text-gray-400">
          Expenses
        </h3>
        <p className="text-2xl font-bold text-red-500">
          ₹{expense}
        </p>
        <p className="text-xs text-gray-400">
          Total spending
        </p>
      </Card>

    </div>
  );
}

export default SummaryCards;