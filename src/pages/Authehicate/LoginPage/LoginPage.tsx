import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../../hooks/useLogin";
import { useAuthStore } from "../../../stores/AuthStore";
import { useTokenStore } from "../../../stores/tokenStore";

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const {
    username,
    password,
    twoFactorCode,
    setUsername,
    setPassword,
    setTwoFactorCode,
  } = useAuthStore();

  const loginMutation = useLogin();

  const setTokens = useTokenStore((state) => state.setTokens);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    loginMutation.mutate(
      {
        username,
        password,
        totp_code: twoFactorCode,
      },
      {
        onSuccess: async (data) => {
          localStorage.setItem("token", data.access_token);
          localStorage.setItem("refresh_token", data.refresh_token);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${data.access_token}`;
          setTokens(data.access_token, data.refresh_token);

          // try {
          //   const keyResponse = await cryptUraApi.getApiKey();
          //   localStorage.setItem("api_key", keyResponse.api_key);
          //   console.log("API Key:", keyResponse.api_key);
          // } catch (e) {
          //   console.error("Ошибка получения api_key", e);
          // }

          navigate("/");
        },
        onError: (error) => {
          console.error("Ошибка авторизации:", error.message);
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md w-full mx-auto">
        <div className="flex justify-center mb-8">
          <img src="/logo.svg" alt="logo" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Авторизация
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Введите данные для входа в систему
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Логин */}
          <div className="relative">
            <input
              type="text"
              placeholder="Логин"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          </div>

          {/* Пароль */}
          <div className="relative">
            <input
              type="password"
              placeholder="Пароль"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>

          {/* TOTP-код */}
          <div className="relative">
            <input
              type="text"
              placeholder="Двухфакторный код"
              required
              value={twoFactorCode}
              onChange={(e) => setTwoFactorCode(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 11c0-1.104.896-2 2-2s2 .896 2 2-.896 2-2 2-2-.896-2-2zM14 5a7 7 0 017 7c0 1.657-.67 3.157-1.757 4.243l-3.536 3.536a2 2 0 01-2.828 0l-3.535-3.535A6.978 6.978 0 017 12a7 7 0 017-7z"
                />
              </svg>
            </div>
          </div>

          <button
            type="submit"
            disabled={loginMutation.status === "pending"}
            className="w-full cursor-pointer py-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-xl hover:from-green-500 hover:to-green-700 transition"
          >
            {loginMutation.status === "pending" ? "Вход..." : "Войти"}
          </button>
        </form>

        {loginMutation.error && (
          <p className="text-red-500 text-sm text-center mt-4">
            Ошибка авторизации
          </p>
        )}

        <p className="mt-6 text-center text-gray-500 text-sm">
          Нет аккаунта?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-green-500 cursor-pointer hover:text-purple-600 font-medium transition"
            type="button"
          >
            Регистрация
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
