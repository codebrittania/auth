import React, { useState } from "react";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../../../hooks/useRegister";
import { useAuthStore } from "../../../stores/AuthStore";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState("");
  const [totpUri, setTotpUri] = useState<string | null>(null);
  const {
    username,
    password,
    confirmPassword,
    inviteCode,
    setLogin,
    setPassword,
    setConfirmPassword,
    setInviteCode,
  } = useAuthStore();

  const { mutate: registerMutation, isError, error } = useRegister();

  const handleSubmit = (e: React.FormEvent) => {
    if (password !== confirmPassword) {
      setValidationError("Пароли не совпадают");
      return;
    }

    setValidationError("");

    e.preventDefault();
    registerMutation(
      { username, password },
      {
        onSuccess: (data) => {
          console.log("Успешная регистрация", data);
          setTotpUri(data.totp_uri);
        },
      }
    );
  };
  if (totpUri) {
    // Если есть totp_uri — показываем QR-код и инструкции
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md w-full mx-auto text-center">
          <h2 className="text-xl font-bold mb-4">Отсканируйте QR-код</h2>
          <div className="flex justify-center">
            <QRCode className="" value={totpUri} size={256} />
          </div>
          <p className="mt-4 mb-2">
            Отсканируйте этот QR-код в приложении-аутентификаторе.
          </p>
          <button
            className="mt-6 px-6 py-2 bg-green-500 cursor-pointer text-white rounded"
            onClick={() => navigate("/login")}
          >
            Перейти к входу
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md w-full mx-auto">
        <div className="flex justify-center mb-8">
          <img src="/logo.svg" alt="logo" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Регистрация
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Введите данные для регистрации
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Логин"
              required
              value={username}
              onChange={(e) => setLogin(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {/* Иконка пользователя */}
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

          <div className="relative">
            <input
              type="password"
              placeholder="Пароль"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {/* Иконка замка */}
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

          <div className="relative">
            <input
              type="password"
              placeholder="Повторите пароль"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {/* Иконка замка */}
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

          <div className="relative">
            <input
              type="text"
              placeholder="Инвайт код"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {/* Иконка инвайта */}
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
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-xl hover:from-green-500 hover:to-green-700 transition"
          >
            Далее
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500 text-sm">
          Есть аккаунт?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-green-500 cursor-pointer hover:text-purple-600 font-medium transition"
            type="button"
          >
            Войти
          </button>
        </p>
        {/* Ошибка валидации паролей */}
        {validationError && (
          <p className="text-red-500 mt-2">{validationError}</p>
        )}

        {/* Ошибка от сервера (мутации) */}
        {isError && (
          <div className="text-red-500 mt-2">
            {error instanceof Error
              ? error.message
              : "Ошибка при регистрации (возможно такой аккаунт уже есть)"}
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
