import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Homepage } from "./pages/homepage";
import { Dashboard } from "./pages/dashboard";
import { Auth } from "./pages/auth";
import { FinancialRecordsProvider } from "./contexts/financial-record-context";
import { SignedIn, UserButton } from "@clerk/clerk-react";

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="navbar">
          <Link to="/"> Homepage</Link>
          <Link to="/dash"> Dashboard</Link>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <FinancialRecordsProvider>
                <Homepage />
              </FinancialRecordsProvider>
            }
          />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dash" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
