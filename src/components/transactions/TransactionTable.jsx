import { useStore } from "../../store/useStore";
import Badge from "../ui/Badge";

function TransactionTable({ search, filter }) {
  const { transactions, deleteTransaction, role } = useStore();

  const filtered = transactions.filter((t) => {
    const matchesSearch = t.category
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" || t.type === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-2xl shadow-sm p-4">
      
      {/* Table */}
      <table className="w-full text-left text-sm">
        
        {/* Header */}
        <thead>
          <tr className="text-gray-500 dark:text-gray-400 border-b">
            <th className="py-3 font-medium">Date</th>
            <th className="font-medium">Category</th>
            <th className="font-medium">Amount</th>
            <th className="font-medium">Type</th>
            {role === "admin" && <th className="font-medium">Action</th>}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {filtered.map((t) => (
            <tr
              key={t.id}
              className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              <td className="py-3">{t.date}</td>
              <td className="font-medium">{t.category}</td>
              <td className="font-semibold">₹{t.amount}</td>
              <td>
                <Badge type={t.type} />
              </td>

              {role === "admin" && (
                <td>
                  <button
                    onClick={() => deleteTransaction(t.id)}
                    className="text-red-500 hover:text-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p className="text-lg font-medium">No transactions found</p>
          <p className="text-sm">Try adjusting filters</p>
        </div>
      )}
    </div>
  );
}

export default TransactionTable;