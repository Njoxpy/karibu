import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { PrintingOrderContextProvider } from "./context/printing/PrintingOrdersContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PrintingOrderContextProvider>
      <App />
    </PrintingOrderContextProvider>
  </StrictMode>
);
