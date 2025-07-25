import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import HomePage from "./pages/HomePage";
import ReportPage from './pages/ReportPage';
import BlocksPage from "./pages/BlocksPage";
import ProgramPage from "./pages/ProgramPage";
import LabsPage from "./pages/LabsPage";
import TicketsPage from "./pages/TicketsPage";
import ComputersPage from "./pages/ComputersPage";
import ProtectedRoute from "./components/ProtectedRoute"; // rota protegida
import theme from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="container">
          <Routes>
            {/* Rota pública de Login */}
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/report" element={<ReportPage />} />
            <Route path="/labs" element={<LabsPage />} />
            <Route path="/campuses/:campusId/blocks" element={<BlocksPage />} />
            <Route path="/blocks/:blockId/labs" element={<LabsPage />} />
            <Route path="/labs/:labId/computers" element={<ComputersPage />} /> */}
            {/* Rotas protegidas */}
            <Route element={<ProtectedRoute />}>
              <Route path="/report" element={<ReportPage />} />
              <Route path="/tickets" element={<TicketsPage />} />
              <Route path="/labs" element={<LabsPage />} />
              <Route path="/blocks/:blockId/labs" element={<LabsPage />} />
              <Route path="/labs/:labId/computers" element={<ComputersPage />} />
              <Route path="/computers/:computerId/programs" element={<ProgramPage />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
