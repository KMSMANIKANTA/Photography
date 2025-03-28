import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { UIProvider } from "./context/UIContext";
import { DataProvider } from "./context/DataContext";
import { WebTeamProvider } from "./context/WebTeamContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <UIProvider>
          <DataProvider>
            <WebTeamProvider>
              <App />
            </WebTeamProvider>
          </DataProvider>
        </UIProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
