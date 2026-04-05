# 💰 Finance Dashboard UI

A modern and interactive **Finance Dashboard** built using React.
This project allows users to track financial activity, analyze spending patterns, and manage scheduled payments with a clean and responsive interface.

---

## 🚀 Features

### 📊 Dashboard Overview
<img width="1884" height="896" alt="image" src="https://github.com/user-attachments/assets/cb153a82-cf91-4b24-85ec-14204781bf3b" />



* Summary cards showing:

  * Total Balance
  * Total Income
  * Total Expenses
* Interactive charts:

  * **Balance Trend (Line Chart)** with:

    * Income / Expense / Net filtering
    * Color-coded points (green = profit, red = loss)
    * Detailed tooltip with transaction breakdown
  * **Spending Breakdown (Pie Chart)**:

    * Category-wise expense distribution
    * Click on category → view transactions (modal)

---

### 💳 Transactions Management
<img width="1867" height="899" alt="image" src="https://github.com/user-attachments/assets/122cd6e5-fc86-4853-90af-97f5c7fa4b79" />


* View all transactions with:

  * Date, Amount, Category, Type
* Features:

  * Search by category
  * Filter (Income / Expense)
  * Role-based controls:

    * Admin → Add/Delete
    * Viewer → Read-only

---

### ⏳ Scheduled Payments
<img width="1895" height="895" alt="image" src="https://github.com/user-attachments/assets/ed0893c3-ea56-4acf-ba4e-13a1ae4bfa93" />

* Add upcoming payments (e.g., Rent, Bills)
* Actions:

  * ✅ Mark as Done → moves to Transactions
  * ❌ Cancel payment
* Role-based access:

  * Admin → Full control
  * Viewer → View only

---

### 🧠 Insights Section

* Highest spending category
* Total spending summary
* Useful financial observations

---

### 🎛 Global Controls (Navbar)

* Time Filter:

  * This Week / Month / Year
* Mini Summary:

  * Balance + Spending (dynamic)
* Dark Mode toggle
* Role switch (Admin / Viewer)

---

### 💾 Data Persistence

* Uses **localStorage**
* Data remains after refresh
* Includes **Reset Demo** option

---

## 🛠 Tech Stack

* **React (Vite)**
* **Zustand** (State Management)
* **Tailwind CSS** (Styling)
* **Recharts** (Charts)

---

## 🧠 Approach & Architecture

### 🔹 State Management

* Centralized using Zustand:

  * Transactions
  * Scheduled Payments
  * Role
  * Time Filter

### 🔹 Data Flow

* Global state → filtered using timeFilter
* Components consume filtered data
* Charts & insights update dynamically

### 🔹 Component Structure

```
src/
├── components/
│   ├── dashboard/
│   ├── transactions/
│   ├── insights/
│   └── ui/
├── pages/
│   ├── Dashboard.jsx
│   ├── Transactions.jsx
│   └── Scheduled.jsx
├── store/
│   └── useStore.js
├── layout/
│   └── MainLayout.jsx
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone <your-repo-link>
cd finance-dashboard
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the project

```bash
npm run dev
```

### 4️⃣ Open in browser

```
http://localhost:5173
```

---

## 🎯 Key Highlights

* Clean and responsive UI
* Real-time data updates
* Role-based UI simulation
* Interactive charts with drill-down
* Persistent data with localStorage
* Scalable and modular structure

---

## ✨ Optional Enhancements (Future Scope)

* Notifications & reminders for scheduled payments
* Export data (CSV/JSON)
* Backend integration (API)
* Authentication system
* Advanced analytics

---

## 📌 Conclusion

This project demonstrates:

* Strong frontend fundamentals
* State management skills
* UI/UX design thinking
* Real-world dashboard implementation

---

## 👨‍💻 Author

**Lav Kumar**
