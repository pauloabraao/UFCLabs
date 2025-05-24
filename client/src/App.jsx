import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import HomePage from "./pages/HomePage";
import BlocksPage from "./pages/BlocksPage";
import LabsPage from "./pages/LabsPage";
import ComputersPage from "./pages/ComputersPage";
import theme from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/campuses/:campusId/blocks" element={<BlocksPage />} />
            <Route path="/blocks/:blockId/labs" element={<LabsPage />} />
            <Route path="/labs/:labId/computers" element={<ComputersPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
