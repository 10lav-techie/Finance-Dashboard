import { useState } from "react";
import { useStore } from "../store/useStore";
import Button from "../components/ui/Button";

function Scheduled() {
  const {
    scheduledPayments,
    addScheduled,
    completeScheduled,
    deleteScheduled,
    role,
  } = useStore();

  const [form, setForm] = useState({
    category: "",
    amount: "",
    date: "",
  });

  const handleAdd = () => {
    if (!form.category || !form.amount || !form.date) return;

    addScheduled({
      id: Date.now(),
      category: form.category,
      amount: Number(form.amount),
      date: form.date,
    });

    setForm({ category: "", amount: "", date: "" });
  };

  return (
    <div className="space-y-5 text-gray-800 dark:text-gray-100">

      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold">
          Schedule Your Upcoming Payments
        </h2>

        {role === "viewer" && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            You are in view-only mode
          </p>
        )}
      </div>

      {/* 🔹 Admin Form */}
      {role === "admin" && (
        <div className="flex flex-wrap gap-2">

          <input
            placeholder="Category (e.g. Rent)"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
            className="border border-gray-300 dark:border-gray-600 
                       p-2 rounded 
                       bg-white dark:bg-gray-700 
                       text-gray-800 dark:text-white 
                       placeholder-gray-400 dark:placeholder-gray-300"
          />

          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: e.target.value })
            }
            className="border border-gray-300 dark:border-gray-600 
                       p-2 rounded 
                       bg-white dark:bg-gray-700 
                       text-gray-800 dark:text-white 
                       placeholder-gray-400 dark:placeholder-gray-300"
          />

          <input
            type="date"
            value={form.date}
            onChange={(e) =>
              setForm({ ...form, date: e.target.value })
            }
            className="border border-gray-300 dark:border-gray-600 
                       p-2 rounded 
                       bg-white dark:bg-gray-700 
                       text-gray-800 dark:text-white"
          />

          <Button onClick={handleAdd}>Add</Button>
        </div>
      )}

      {/* 🔹 List */}
      <div className="space-y-3">
        {scheduledPayments.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            No scheduled payments
          </p>
        ) : (
          scheduledPayments.map((p) => (
            <div
              key={p.id}
              className="flex justify-between items-center 
                         border border-gray-200 dark:border-gray-700 
                         p-3 rounded-lg 
                         bg-white dark:bg-gray-800"
            >
              {/* Left */}
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-100">
                  {p.category}
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  ₹{p.amount} • {p.date}
                </p>
              </div>

              {/* Right */}
              <div className="flex items-center gap-2">

                {role === "admin" ? (
                  <>
                    <Button onClick={() => completeScheduled(p.id)}>
                      Done
                    </Button>

                    <button
                      onClick={() => deleteScheduled(p.id)}
                      className="text-red-500 dark:text-red-400 hover:underline"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <span className="text-sm text-gray-400 dark:text-gray-500">
                    View Only
                  </span>
                )}

              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default Scheduled;