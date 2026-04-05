import SummaryCards from "../components/dashboard/SummaryCards";
import BalanceChart from "../components/dashboard/BalanceChart";
import CategoryChart from "../components/dashboard/CategoryChart";
import Insights from "../components/insights/Insights";

function Dashboard() {
  return (
    <div className="space-y-6">

      {/* Summary Cards */}
      <SummaryCards />

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="md:col-span-2">
          <BalanceChart />
        </div>

        <CategoryChart />
      </div>

      {/* Insights */}
      <Insights />

    </div>
  );
}

export default Dashboard;