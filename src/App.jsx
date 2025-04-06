import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 管理登录状态
  const [loggedInUsername, setLoggedInUsername] = useState(""); // 管理当前登录的用户名

  // 注册或登录成功后调用
  const handleRegisterSuccess = (username) => {
    setIsAuthenticated(true); // 设置为已登录
    setLoggedInUsername(username); // 设置当前登录的用户名
  };

  return (
    <Router>
      <div>
        <Routes>
          {/* 注册登录页面 */}
          <Route
            path="/"
            element={
              <RegisterPage onRegisterSuccess={handleRegisterSuccess} />
            }
          />
          {/* 登录成功后跳转到 Dashboard */}
          {isAuthenticated && (
            <Route
              path="/dashboard"
              element={<DashboardPage loggedInUsername={loggedInUsername} />}
            />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;