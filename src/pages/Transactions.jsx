import { useState } from "react";
import { useStore } from "../store/useStore";

import TransactionTable from "../components/transactions/TransactionTable";
import AddTransactionForm from "../components/transactions/AddTransactionForm";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

function Transactions() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);

  const { addTransaction, role } = useStore();

  return (
    <div className="space-y-5 text-gray-800 dark:text-gray-100">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Transactions
        </h2>

        {role === "admin" && (
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? "Close" : "+ Add Transaction"}
          </Button>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4">

        {/* Search */}
        <Input
          placeholder="Search by category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Filter */}
        <select
          className="border border-gray-300 dark:border-gray-600 
                     p-2 rounded-lg 
                     bg-white dark:bg-gray-700 
                     text-gray-800 dark:text-white"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

      </div>

      {/* Add Form */}
      {role === "admin" && showForm && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
          <AddTransactionForm onAdd={addTransaction} />
        </div>
      )}

      {/* Table */}
      <TransactionTable search={search} filter={filter} />

    </div>
  );
}

export default Transactions;