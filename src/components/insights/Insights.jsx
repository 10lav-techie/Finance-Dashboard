import Card from "../ui/Card";
import { useStore } from "../../store/useStore";
import { filterByTime } from "../../utils/filterByTime";
function Insights() {


  const { transactions, timeFilter } = useStore();

  const filtered = filterByTime(transactions, timeFilter);

  const totalExpense = filtered
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const categoryMap = {};

  filtered.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    }
  });

  let highestCategory = "N/A";
  let max = 0;

  for (let key in categoryMap) {
    if (categoryMap[key] > max) {
      max = categoryMap[key];
      highestCategory = key;
    }
  }

  return (
    <div className="grid md:grid-cols-3 gap-4">

      <Card>
        <h3 className="text-gray-500 dark:text-gray-400 text-sm">
          Top Category
        </h3>
        <p className="text-lg font-bold">{highestCategory}</p>
      </Card>

      <Card>
        <h3 className="text-gray-500 dark:text-gray-400 text-sm">
          Total Spending
        </h3>
        <p className="text-lg font-bold">₹{totalExpense}</p>
      </Card>

      <Card>
        <h3 className="text-gray-500 dark:text-gray-400 text-sm">
          Insight
        </h3>
        <p className="text-sm">
          You spend most on <span className="font-semibold">{highestCategory}</span>
        </p>
      </Card>

    </div>
  );
}

export default Insights;