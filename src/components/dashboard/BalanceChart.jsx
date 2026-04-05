import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Dot,
} from "recharts";
import { useStore } from "../../store/useStore";
import { filterByTime } from "../../utils/filterByTime";
import { useState } from "react";

function BalanceChart() {
  const { transactions, timeFilter } = useStore();

  const [view, setView] = useState("both"); // income | expense | both

  const filtered = filterByTime(transactions, timeFilter);

  // 🔹 Group by date
  const map = {};

  filtered.forEach((t) => {
    if (!map[t.date]) {
      map[t.date] = {
        date: t.date,
        income: 0,
        expense: 0,
        transactions: [],
      };
    }

    if (t.type === "income") {
      map[t.date].income += t.amount;
    } else {
      map[t.date].expense += t.amount;
    }

    map[t.date].transactions.push(t);
  });

  // 🔹 Build chart data
  const data = Object.values(map).map((d) => ({
    ...d,
    amount:
      view === "income"
        ? d.income
        : view === "expense"
        ? d.expense
        : d.income - d.expense,
  }));

  // 🔹 Custom dot color
  const CustomDot = (props) => {
    const { cx, cy, payload } = props;

    const color =
      payload.income > payload.expense ? "#22c55e" : "#ef4444";

    return <circle cx={cx} cy={cy} r={5} fill={color} />;
  };

  // 🔹 Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;

      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded shadow text-sm">
          <p className="font-semibold">{data.date}</p>

          <p className="text-green-500">Income: ₹{data.income}</p>
          <p className="text-red-500">Expense: ₹{data.expense}</p>

          <div className="mt-2">
            <p className="font-medium">Transactions:</p>
            {data.transactions.map((t) => (
              <div key={t.id} className="flex justify-between gap-3">
                <span>{t.category}</span>
                <span>₹{t.amount}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 rounded-2xl shadow">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold">Balance Trend</h2>

        {/* 🔥 Filter */}
        <select
          value={view}
          onChange={(e) => setView(e.target.value)}
          className="border p-1 rounded text-sm bg-white dark:bg-gray-700"
        >
          <option value="both">Net</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />

          <Line
            type="monotone"
            dataKey="amount"
            stroke="#4f46e5"
            dot={<CustomDot />}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BalanceChart;