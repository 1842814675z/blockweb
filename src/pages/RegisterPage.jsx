import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register, authenticate } from "../utils/contract";
import "./RegisterPage.css"; // 引入样式文件

const RegisterPage = ({ onRegisterSuccess }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true); // 控制登录或注册模式
  const [isLoading, setIsLoading] = useState(false); // 控制按钮加载状态
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const isAuthenticated = await authenticate(username, email);
      if (isAuthenticated) {
        alert("登录成功！");
        onRegisterSuccess(username); // 更新登录状态并传递用户名
        navigate("/dashboard"); // 跳转到 Dashboard 页面
      } else {
        alert("登录失败，请检查用户名和邮箱！");
      }
    } catch (error) {
      console.error("登录失败：", error.message);
      alert("用户不存在，请注册！");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await register(username, email);
      alert("注册成功！请登录！");
      setIsLoginMode(true); // 切换到登录模式
    } catch (error) {
      console.error("注册失败：", error.message);
      alert("用户名或者邮箱已经被使用！");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1>{isLoginMode ? "登录" : "注册"}</h1>
        <form onSubmit={isLoginMode ? handleLogin : handleRegister}>
          <input
            type="text"
            placeholder="用户名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="text-input"
          />
          <input
            type="email"
            placeholder="邮箱"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-input"
          />
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? (isLoginMode ? "登录中..." : "注册中...") : isLoginMode ? "登录" : "注册"}
          </button>
        </form>
        <button
          onClick={() => setIsLoginMode(!isLoginMode)}
          className="toggle-button"
        >
          {isLoginMode ? "没有账户？注册" : "已有账户？登录"}
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;