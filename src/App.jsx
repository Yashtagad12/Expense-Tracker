import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { TransactionProvider } from "./context/TransactionContext";
import { BudgetProvider } from "./context/BudgetContext";

import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Reports from "./pages/Reports";
import Budgets from "./pages/Budgets";

function App() {
  return (
    <BrowserRouter>
      <TransactionProvider>
        <BudgetProvider>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/budgets" element={<Budgets />} />
              <Route path="/reports" element={<Reports />} />

              <Route
                path="*"
                element={<Navigate to="/" replace />}
              />
            </Route>
          </Routes>
        </BudgetProvider>
      </TransactionProvider>
    </BrowserRouter>
  );
}

export default App;