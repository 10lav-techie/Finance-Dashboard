import { create } from "zustand";
import { transactions as demoData } from "../data/transactions";

// 🔹 Load from localStorage
const loadData = () => {
  const data = localStorage.getItem("finance-data");
  return data ? JSON.parse(data) : null;
};

// 🔹 Save to localStorage
const saveData = (data) => {
  localStorage.setItem("finance-data", JSON.stringify(data));
};

export const useStore = create((set, get) => {
  const stored = loadData();

  return {
    // 🔹 State
    transactions: stored?.transactions || demoData,
    scheduledPayments: stored?.scheduledPayments || [],
    role: stored?.role || "viewer",
    timeFilter: stored?.timeFilter || "month",

    // ==============================
    // 🔹 TRANSACTIONS
    // ==============================

    addTransaction: (txn) => {
      const updated = [...get().transactions, txn];

      const newState = {
        transactions: updated,
        scheduledPayments: get().scheduledPayments,
        role: get().role,
        timeFilter: get().timeFilter,
      };

      set({ transactions: updated });
      saveData(newState);
    },

    deleteTransaction: (id) => {
      const updated = get().transactions.filter((t) => t.id !== id);

      const newState = {
        transactions: updated,
        scheduledPayments: get().scheduledPayments,
        role: get().role,
        timeFilter: get().timeFilter,
      };

      set({ transactions: updated });
      saveData(newState);
    },

    // ==============================
    // 🔹 SCHEDULED PAYMENTS (NEW)
    // ==============================

    addScheduled: (payment) => {
      const updated = [...get().scheduledPayments, payment];

      const newState = {
        transactions: get().transactions,
        scheduledPayments: updated,
        role: get().role,
        timeFilter: get().timeFilter,
      };

      set({ scheduledPayments: updated });
      saveData(newState);
    },

    // 🔥 Mark as done → move to transactions
    completeScheduled: (id) => {
      const payment = get().scheduledPayments.find((p) => p.id === id);
      if (!payment) return;

      const newTransaction = {
        id: Date.now(),
        date: payment.date,
        amount: payment.amount,
        category: payment.category,
        type: "expense",
      };

      const updatedTransactions = [
        ...get().transactions,
        newTransaction,
      ];

      const updatedScheduled = get().scheduledPayments.filter(
        (p) => p.id !== id
      );

      const newState = {
        transactions: updatedTransactions,
        scheduledPayments: updatedScheduled,
        role: get().role,
        timeFilter: get().timeFilter,
      };

      set({
        transactions: updatedTransactions,
        scheduledPayments: updatedScheduled,
      });

      saveData(newState);
    },

    // 🔹 Delete scheduled payment
    deleteScheduled: (id) => {
      const updated = get().scheduledPayments.filter(
        (p) => p.id !== id
      );

      const newState = {
        transactions: get().transactions,
        scheduledPayments: updated,
        role: get().role,
        timeFilter: get().timeFilter,
      };

      set({ scheduledPayments: updated });
      saveData(newState);
    },

    // ==============================
    // 🔹 SETTINGS
    // ==============================

    setRole: (role) => {
      const newState = {
        transactions: get().transactions,
        scheduledPayments: get().scheduledPayments,
        role,
        timeFilter: get().timeFilter,
      };

      set({ role });
      saveData(newState);
    },

    setTimeFilter: (filter) => {
      const newState = {
        transactions: get().transactions,
        scheduledPayments: get().scheduledPayments,
        role: get().role,
        timeFilter: filter,
      };

      set({ timeFilter: filter });
      saveData(newState);
    },

    // ==============================
    // 🔥 RESET (FULL RESET)
    // ==============================

    resetData: () => {
      const newState = {
        transactions: demoData,
        scheduledPayments: [], // 🔥 clear scheduled too
        role: "viewer",
        timeFilter: "month",
      };

      set(newState);
      saveData(newState);
    },
  };
});