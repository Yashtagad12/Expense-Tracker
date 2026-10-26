import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AppLayout from "./components/layout/AppLayout";

import Dashboard from "../src/pages/Dashboard";
import Transactions from "../src/pages/Transaction";
import Reports from "../src/pages/Reports";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />

          <Route
            path="/transactions"
            element={<Transactions />}
          />

          <Route path="/reports" element={<Reports />} />

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;