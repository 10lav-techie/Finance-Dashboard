import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useStore } from "./store/useStore";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import MainLayout from "./layout/MainLayout";
import Scheduled from "./pages/Scheduled";

function App() {
  const [dark, setDark] = useState(false);

  const role = useStore((state) => state.role);
  const setRole = useStore((state) => state.setRole);

  return (
    <BrowserRouter>
      <div className={dark ? "dark" : ""}>
        <MainLayout dark={dark} setDark={setDark} role={role} setRole={setRole}>
          
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/scheduled" element={<Scheduled />} />
          </Routes>

        </MainLayout>
      </div>
    </BrowserRouter>
  );
}

export default App;