import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useStore } from "../../store/useStore";
import { filterByTime } from "../../utils/filterByTime";
import { useState, useEffect } from "react";

function BalanceChart() {
  const { transactions, timeFilter } = useStore();

  const [view, setView] = useState("both");
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

  // 🔹 Chart data
  const data = Object.values(map).map((d) => ({
    ...d,
    amount:
      view === "income"
        ? d.income
        : view === "expense"
        ? d.expense
        : d.income - d.expense,
  }));

  // 🔹 Dot color
  const CustomDot = ({ cx, cy, payload }) => {
    const color =
      payload.income > payload.expense ? "#22c55e" : "#ef4444";

    return <circle cx={cx} cy={cy} r={5} fill={color} />;
  };

  // 🔹 Tooltip (desktop only)
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;

      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded shadow text-sm">
          <p className="font-semibold">{formatDate(d.date)}</p>
          <p className="text-green-500">Income: ₹{d.income}</p>
          <p className="text-red-500">Expense: ₹{d.expense}</p>

          <div className="mt-2">
            <p className="font-medium">Transactions:</p>
            {d.transactions.map((t) => (
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
    const formatDate = (dateStr) => {
    const d = new Date(dateStr);

    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = String(d.getFullYear()).slice(-2); // 👈 last 2 digits

    return `${day}/${month}/${year}`;
    };
  return (
    <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 rounded-2xl shadow">

      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold">Balance Trend</h2>

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
      <ResponsiveContainer width="100%" height={isMobile ? 220 : 300}>
        <LineChart
          data={data}
          margin={
            isMobile
              ? { top: 10, right: 10, left: -25, bottom: 0 } // 🔥 mobile fix
              : { top: 10, right: 20, left: 0, bottom: 0 }
          }
        >
            <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            tick={{ fontSize: isMobile ? 9 : 12 }}
            interval="preserveStartEnd"
            />
          <YAxis tick={{ fontSize: isMobile ? 9 : 12 }} />

          {!isMobile && <Tooltip content={<CustomTooltip />} />}

          <Line
            type="monotone"
            dataKey="amount"
            stroke="#4f46e5"
            dot={<CustomDot />}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* 🔥 MOBILE DATA VIEW */}
      {isMobile && (
        <div className="mt-3 text-xs space-y-2 max-h-60 overflow-y-auto pr-1">
          {data.map((d, i) => (
            <div key={i} className="border-b pb-2">

              <p className="font-medium">{d.date}</p>

              <p className="text-green-500">
                Income: ₹{d.income}
              </p>

              <p className="text-red-500">
                Expense: ₹{d.expense}
              </p>

              <p className="text-gray-500">
                Net: ₹{d.income - d.expense}
              </p>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BalanceChart;