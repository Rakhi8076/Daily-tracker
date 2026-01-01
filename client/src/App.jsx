import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

import MonthlyTrackerPage from "./pages/MonthlyTrackerPage";
import WeeklyTracker from "./pages/WeeklyTracker";
import FinanceTracker from "./pages/FinanceTracker";

import "./styles/Layout.css";

function App() {

  return (
    <BrowserRouter>
  <Navbar/>

  <div className="layout">
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />

      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/monthly"
        element={
          <ProtectedRoute>
            <MonthlyTrackerPage/>
          </ProtectedRoute>
        }
      />

      <Route 
        path="/weekly"
        element={
          <ProtectedRoute>
            <WeeklyTracker/>
          </ProtectedRoute>
        }
      />

      <Route 
        path="/finance"
        element={
          <ProtectedRoute>
            <FinanceTracker/>
          </ProtectedRoute>
        }
      />
    </Routes>
  </div>

  {/* ✅ Layout ke bahar rakho */}
  <Footer />

</BrowserRouter>

  );
}

export default App;
