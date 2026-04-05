import { useState } from "react";
import Button from "../ui/Button";

function AddTransactionForm({ onAdd }) {
  const [form, setForm] = useState({
    amount: "",
    category: "",
    type: "expense",
    date: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.amount || !form.category || !form.date) {
      alert("Please fill all fields");
      return;
    }

    onAdd({
      id: Date.now(),
      amount: Number(form.amount),
      category: form.category,
      type: form.type,
      date: form.date,
    });

    // reset form
    setForm({
      amount: "",
      category: "",
      type: "expense",
      date: "",
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 rounded-2xl shadow space-y-3">
      <h2 className="font-semibold">Add Transaction</h2>

      <input
        name="amount"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        className="border p-2 rounded w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
      />

      <input
        name="category"
        placeholder="Category (Food, Salary...)"
        value={form.category}
        onChange={handleChange}
        className="border p-2 rounded w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
      />

      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="border p-2 rounded w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="border p-2 rounded w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
      />

      <Button onClick={handleSubmit}>Add</Button>
    </div>
  );
}

export default AddTransactionForm;