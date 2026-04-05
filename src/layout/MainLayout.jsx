import { Link } from "react-router-dom";
import { useStore } from "../store/useStore";
import { filterByTime } from "../utils/filterByTime";
import Button from "../components/ui/Button";
function MainLayout({ children, dark, setDark, role, setRole }) {

  // 🔹 Global state
  const { transactions, timeFilter, setTimeFilter, resetData } = useStore();

  // 🔹 Filtered data based on time
  const filtered = filterByTime(transactions, timeFilter);

  // 🔹 Calculate summary
  const income = filtered
    .filter((t) => t.type === "income")
    .reduce((a, t) => a + t.amount, 0);

  const expense = filtered
    .filter((t) => t.type === "expense")
    .reduce((a, t) => a + t.amount, 0);

  const balance = income - expense;

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">

      {/* 🔹 Sidebar */}
      <aside className="w-64 bg-indigo-900 text-white p-5 flex flex-col justify-between">

        <div>
          <h1 className="text-xl font-bold mb-6">FinBoard</h1>

          <nav className="flex flex-col gap-2">
            <Link to="/" className="hover:bg-indigo-700 p-2 rounded">
              Dashboard
            </Link>

            <Link to="/transactions" className="hover:bg-indigo-700 p-2 rounded">
              Transactions
            </Link>
            <Link to="/scheduled" className="hover:bg-indigo-700 p-2 rounded">
            Upcoming Payments
            </Link>
          </nav>
        </div>

        {/* Bottom controls */}
        {/* Bottom controls */}
        <div className="space-y-3">

        {/* Role */}
        <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 rounded text-black"
        >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
        </select>

        {/* Dark mode */}
        <button
            onClick={() => setDark(!dark)}
            className="w-full bg-indigo-700 p-2 rounded"
        >
            {dark ? "Light Mode" : "Dark Mode"}
        </button>

        {/* 🔥 Reset Demo Button */}
        <Button onClick={resetData}>
            Reset Demo
        </Button>

        </div>
      </aside>

      {/* 🔹 Right side */}
      <div className="flex-1 flex flex-col">

        {/* 🔹 Topbar */}
        <header className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-6 py-4 shadow-sm flex justify-between items-center">

          {/* Left */}
          <div>
            <h2 className="text-lg font-semibold">Dashboard</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Overview of your finances
            </p>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">

            {/* 🧠 Mini Summary */}
            <div className="text-sm text-right">
              <p className="font-medium">₹{balance}</p>
              <p className="text-red-500 text-xs">Spent ₹{expense}</p>
            </div>

            {/* 📅 Time Filter */}
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="border p-2 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>

            {/* 👤 Avatar */}
            <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold">
              A
            </div>

          </div>
        </header>

        {/* 🔹 Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>

      </div>
    </div>
  );
}

export default MainLayout;