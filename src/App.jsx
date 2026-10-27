import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { TransactionProvider } from "./context/TransactionContext";

import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Reports from "./pages/Reports";

function App() {
  return (
    <BrowserRouter>
      <TransactionProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />

            <Route path="/transactions" element={<Transactions />} />

            <Route path="/reports" element={<Reports />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </TransactionProvider>
    </BrowserRouter>
  );
}

export default App;