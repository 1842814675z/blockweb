import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleRegisterSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div>
        <Routes>
          {/* 注册登录页面 */}
          <Route
            path="/"
            element={<RegisterPage onRegisterSuccess={handleRegisterSuccess} />}
          />
          {/* 登录成功后跳转到 Dashboard */}
          {isAuthenticated && <Route path="/dashboard" element={<DashboardPage />} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;



