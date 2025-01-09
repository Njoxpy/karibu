import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// context
import { AnimalFeedingContextProvider } from "./context/AnimalFeedingContext";
import { FreshOilContextProvider } from "./context/FreshOilContext";  // Import FreshOilContext
import { HardwareContextProvider } from "./context/HardwareContext";
import { PrintingContextProvider } from "./context/PrintingContext";
import { StationeryContextProvider } from "./context/StationeryContext";
import { GodownContextProvider } from "./context/GodownContext";


createRoot(document.getElementById("root")).render(
  <StrictMode>
      <AnimalFeedingContextProvider>
        <FreshOilContextProvider> 
          <HardwareContextProvider>
            <PrintingContextProvider>
              <StationeryContextProvider>
                <GodownContextProvider>
                  <App />
                </GodownContextProvider>
              </StationeryContextProvider>
            </PrintingContextProvider>
          </HardwareContextProvider>
        </FreshOilContextProvider>
      </AnimalFeedingContextProvider>
  </StrictMode>
);
