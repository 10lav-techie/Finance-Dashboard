import Card from "../ui/Card";
import { useStore } from "../../store/useStore";
import { filterByTime } from "../../utils/filterByTime";

function Insights() {
  const { transactions, timeFilter } = useStore();

  const filtered = filterByTime(transactions, timeFilter);

  // 🔹 Total Expense
  const totalExpense = filtered
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  // 🔹 Category Map
  const categoryMap = {};
  filtered.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    }
  });

  // 🔹 Top Category
  let highestCategory = "N/A";
  let max = 0;

  for (let key in categoryMap) {
    if (categoryMap[key] > max) {
      max = categoryMap[key];
      highestCategory = key;
    }
  }

  // 🔥 Highest Transaction (NEW)
  const highestTxn = filtered.reduce(
    (max, t) => (t.amount > (max?.amount || 0) ? t : max),
    null
  );

  // 🔹 Format Date
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = String(d.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="grid md:grid-cols-3 gap-4 text-gray-800 dark:text-gray-100">

      {/* 🔹 Top Category */}
      <Card>
        <h3 className="text-gray-500 dark:text-gray-400 text-sm">
          Top Category
        </h3>
        <p className="text-lg font-bold">{highestCategory}</p>
      </Card>

      {/* 🔥 Highest Transaction (REPLACED) */}
        <Card>
        <h3 className="text-gray-500 dark:text-gray-400 text-sm">
            Highest Transaction
        </h3>

        {highestTxn ? (
            <div className="flex justify-between items-center mt-1 text-sm">

            {/* Category */}
            <span className="font-medium text-indigo-600">
                {highestTxn.category}
            </span>

            {/* Amount */}
            <span className="font-semibold">
                ₹{highestTxn.amount}
            </span>

            {/* Date */}
            <span className="text-gray-400 text-xs">
                {formatDate(highestTxn.date)}
            </span>

            </div>
        ) : (
            <p className="text-sm text-gray-400">
            No data available
            </p>
        )}
        </Card>

      {/* 🔹 Insight */}
      <Card>
        <h3 className="text-gray-500 dark:text-gray-400 text-sm">
          Insight
        </h3>

        <p className="text-sm">
          You spend most on{" "}
          <span className="font-semibold">
            {highestCategory}
          </span>
        </p>
      </Card>

    </div>
  );
}

export default Insights;