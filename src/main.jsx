import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { ColorModeProvider } from "./context/ColorModeContext";
import { NotificationProvider } from "./context/NotificationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ColorModeProvider>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </ColorModeProvider>
  </React.StrictMode>
);