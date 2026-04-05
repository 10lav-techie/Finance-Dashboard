import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useStore } from "../../store/useStore";
import { filterByTime } from "../../utils/filterByTime";
import { useState } from "react";

const COLORS = [
  "#4f46e5",
  "#22c55e",
  "#ef4444",
  "#f59e0b",
  "#06b6d4",
  "#a855f7",
  "#84cc16",
  "#f97316",
  "#14b8a6",
  "#e11d48",
];

function CategoryChart() {
  const { transactions, timeFilter } = useStore();

  // 🔹 Filter by time
  const filtered = filterByTime(transactions, timeFilter);

  // 🔹 Modal state
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // 🔹 Build category map (ONLY expenses)
  const categoryMap = {};

  filtered.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    }
  });

  // 🔹 Chart data
  const data = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  // 🔹 Transactions for selected category
  const categoryTransactions = filtered.filter(
    (t) => t.category === selectedCategory
  );

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 rounded-2xl shadow">
      
      <h2 className="mb-2 font-semibold">Spending Breakdown</h2>

      {/* Empty state */}
      {data.length === 0 ? (
        <div className="h-[300px] flex items-center justify-center text-gray-500">
          No data available
        </div>
      ) : (
        <div className="flex justify-center">
          <PieChart width={300} height={300}>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={100}
              label={({ percent }) =>
                `${(percent * 100).toFixed(0)}%`
              }
              labelLine={false}
              onClick={(entry) => {
                setSelectedCategory(entry.name);
                setShowModal(true);
              }}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                  style={{ cursor: "pointer" }}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </div>
      )}

      {/* 🔥 MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          
          <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-6 rounded-2xl w-[400px] max-h-[80vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {selectedCategory} Transactions
              </h3>

              <button
                onClick={() => setShowModal(false)}
                className="text-red-500 text-lg"
              >
                ✕
              </button>
            </div>

            {/* Total */}
            <p className="text-sm text-gray-500 mb-3">
              Total: ₹
              {categoryTransactions.reduce((a, t) => a + t.amount, 0)}
            </p>

            {/* List */}
            {categoryTransactions.length === 0 ? (
              <p className="text-gray-500">No transactions</p>
            ) : (
              <div className="space-y-2">
                {categoryTransactions.map((t) => (
                  <div
                    key={t.id}
                    className="flex justify-between border-b pb-2 text-sm"
                  >
                    <span>{t.date}</span>
                    <span className="font-medium">₹{t.amount}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryChart;