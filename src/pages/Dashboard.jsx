import SummaryCards from "../components/dashboard/SummaryCards";
import BalanceChart from "../components/dashboard/BalanceChart";
import CategoryChart from "../components/dashboard/CategoryChart";
import Insights from "../components/insights/Insights";

function Dashboard() {
  return (
    <div className="space-y-5 text-gray-800 dark:text-gray-100">

      {/* Summary Cards */}
      <SummaryCards />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">

        {/* Balance Chart */}
        <div className="lg:col-span-2 h-full">
          <BalanceChart />
        </div>

        {/* Category Chart */}
        <div className="h-full">
          <CategoryChart />
        </div>

      </div>

      {/* Insights */}
      <Insights />

    </div>
  );
}

export default Dashboard;