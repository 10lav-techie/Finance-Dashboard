import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useStore } from "../../store/useStore";
import { filterByTime } from "../../utils/filterByTime";
import { useState, useEffect } from "react";

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

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 🔥 Detect mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filtered = filterByTime(transactions, timeFilter);

  const categoryMap = {};
  filtered.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const data = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  const total = data.reduce((a, d) => a + d.value, 0);

  const categoryTransactions = filtered.filter(
    (t) => t.category === selectedCategory
  );

  // 🔥 MOBILE LABEL (FIXED VISIBILITY)
  const renderMobileLabel = ({
    name,
    percent,
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
  }) => {
    if (percent < 0.04) return null; // 🔥 FIX: lower threshold

    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.65;

    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={9} // 🔥 smaller text
      >
        {`${name} (${(percent * 100).toFixed(0)}%)`}
      </text>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 rounded-2xl shadow">
      
      <h2 className="mb-2 font-semibold">Spending Breakdown</h2>

      {data.length === 0 ? (
        <div className="h-[220px] flex items-center justify-center text-gray-500">
          No data available
        </div>
      ) : (
        <>
          {/* 🔹 Chart */}
          <div className="flex justify-center items-center">
            <PieChart
              width={isMobile ? 260 : 300}   // 🔥 mobile size fix
              height={isMobile ? 260 : 300}
            >
              <Pie
                data={data}
                dataKey="value"
                outerRadius={isMobile ? 95 : 110} // 🔥 better spacing
                label={
                  isMobile
                    ? renderMobileLabel
                    : ({ percent }) =>
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

              {!isMobile && <Tooltip />}
            </PieChart>
          </div>

          {/* 🔹 MOBILE LIST */}
          {isMobile && (
            <div className="mt-3 space-y-2 text-xs max-h-48 overflow-y-auto pr-1">
              {data.map((d, i) => (
                <div
                  key={i}
                  className="flex justify-between border-b pb-1"
                >
                  <span>{d.name}</span>
                  <span className="font-medium">
                    ₹{d.value} (
                    {((d.value / total) * 100).toFixed(0)}%)
                  </span>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* 🔥 MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          
          <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-6 rounded-2xl w-[90%] max-w-[400px] max-h-[80vh] overflow-y-auto">
            
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

            <p className="text-sm text-gray-500 mb-3">
              Total: ₹
              {categoryTransactions.reduce((a, t) => a + t.amount, 0)}
            </p>

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