"use client";

import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { cryptUraApi } from "../../api/CryptUraApi";
import { useAuthStore } from "../../stores/AuthStore";

export function ProfilePage() {
  const [showActiveSessionsModal, setShowActiveSessionsModal] = useState(false);
  const [showRecentActionsModal, setShowRecentActionsModal] = useState(false);
  const [showPushBotModal, setShowPushBotModal] = useState(false);
  const [pushBotToken, setPushBotToken] = useState("fgdf5gg234kqjvr5u3n4p6n");

  const activeSessions = [
    { device: "iPhone 11 Pro", ip: "192.168.1.1", id: 1 },
    { device: "iPhone 11 Pro", ip: "192.168.1.1", id: 2 },
    { device: "iPhone 11 Pro", ip: "192.168.1.1", id: 3 },
    { device: "iPhone 11 Pro", ip: "192.168.1.1", id: 4 },
    { device: "iPhone 11 Pro", ip: "192.168.1.1", id: 5 },
    { device: "iPhone 11 Pro", ip: "192.168.1.1", id: 6 },
  ];

  const recentActions = [
    {
      action: "Вход в аккаунт",
      location: "Москва и Московская область",
      time: "15:42 09.11.21",
      id: 1,
    },
    {
      action: "Вывод средств",
      location: "Москва и Московская область",
      time: "15:42 09.11.21",
      id: 2,
    },
    {
      action: "Вход в аккаунт",
      location: "Москва и Московская область",
      time: "15:42 09.11.21",
      id: 3,
    },
    {
      action: "Вход в аккаунт",
      location: "Москва и Московская область",
      time: "15:42 09.11.21",
      id: 4,
    },
    {
      action: "Вход в аккаунт",
      location: "Москва и Московская область",
      time: "15:42 09.11.21",
      id: 5,
    },
    {
      action: "Вход в аккаунт",
      location: "Москва и Московская область",
      time: "15:42 09.11.21",
      id: 6,
    },
  ];
  const { username } = useAuthStore();

  const [callbackUrl, setCallbackUrl] = useState<string | null>(null);
  const [merchantFee, setMerchantFee] = useState<number | null>(null);

  useEffect(() => {
    const fetchCallback = async () => {
      const response = await cryptUraApi.getMerchantFee();
      setMerchantFee(response)

    };
    fetchCallback()
  }, []);

  useEffect(() => {
    const fetchCallback = async () => {
      const response = await cryptUraApi.getCallbackApi();
      setCallbackUrl(response)

    };
    fetchCallback()
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto bg-white">
        {/* Header */}
        <header className="border-b border-gray-200 px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <NavLink to="/">
              <button className="cursor-pointer text-gray-600 hover:text-gray-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </NavLink>
            <h1 className="text-lg font-semibold">Профиль</h1>
            <div></div>
          </div>
        </header>

        {/* Profile Section */}
        <div className="px-4 sm:px-6 py-6">
          <div className="flex items-center mb-8">
            <div className="relative">
              <img
                src="/avatar.png"
                alt="Profile"
                className="w-15 h-15 rounded-full"
              />
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {username}
              </h2>
              <p className="text-gray-500">Merchant</p>
            </div>
          </div>

          {/* Settings Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Настройки
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Recent Actions */}
              {/* <button
                onClick={() => setShowRecentActionsModal(true)}
                className="flex items-center cursor-pointer p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
              >
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="text-gray-700">Последние действия</span>
              </button> */}

              {/* Active Sessions */}
              {/* <button
                onClick={() => setShowActiveSessionsModal(true)}
                className="flex items-center cursor-pointer p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
              >
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span className="text-gray-700">Активные сессии</span>
              </button> */}

              {/* Two-Factor Authentication */}
              <div className="flex items-center p-4 border border-gray-200 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-gray-700">Двухфакторная</div>
                  <div className="text-gray-700">аутентификация</div>
                </div>
              </div>

              {/* Push Bot Setup */}
              {/* <button
                onClick={() => setShowPushBotModal(true)}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left cursor-pointer"
              >
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </div>
                <span className="text-gray-700">Настроить пуш-бота</span>
              </button> */}

              {/* Merchant Rate */}
              <div className="flex items-center p-4 border border-gray-200 rounded-lg">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm font-medium text-gray-600">%</span>
                </div>
                <div>
                  <div className="text-md font-normal text-black">{merchantFee}%</div>
                  <div className="text-sm text-gray-500">
                    Текущая ставка мерчанта
                  </div>
                </div>
              </div>

              {/* Callback API */}
              <div className="flex items-center p-4 border border-gray-200 rounded-lg">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-gray-700">Callback API</div>
                  <div className="text-xs text-blue-600 truncate">
                    {callbackUrl}
                  </div>
                </div>
                <button className="ml-2 text-gray-400 hover:text-gray-600 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </button>
              </div>

              {/* Wallets */}
              {/* <button className="flex items-center cursor-pointer p-4 border  border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm font-medium text-gray-600">%</span>
                </div>
                <span className="text-gray-700">Кошелек</span>
              </button> */}

              {/* Assets */}
              <NavLink
                to="/actives"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left cursor-pointer"
              >
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
                <span className="text-gray-700">Активы</span>
              </NavLink>

              {/* Merchant Support */}
              {/* <button className="flex items-center cursor-pointer p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <span className="text-gray-700">Мерчант саппорт</span>
              </button> */}

              {/* Balance History */}
              {/* <button className="flex cursor-pointer items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <span className="text-gray-700">История баланса</span>
              </button> */}
            </div>
          </div>

          {/* Data Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Данные</h3>

            <div className="space-y-4">
              {/* Login */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Логин
                </label>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-900">{username}</span>
                  {/* <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button> */}
                </div>
              </div>

              {/* Email */}
            </div>
          </div>
        </div>
      </div>

      {/* Active Sessions Modal */}
      {showActiveSessionsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between  cursor-pointer p-4 border-b">
              <h3 className="text-lg font-semibold">Активные сессии</h3>
              <button
                onClick={() => setShowActiveSessionsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4 max-h-96 overflow-y-auto">
              <div className="space-y-3">
                {activeSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                  >
                    <div>
                      <div className="font-medium text-gray-900">
                        {session.device}
                      </div>
                      <div className="text-sm text-gray-500">{session.ip}</div>
                    </div>
                    <button className="text-red-500 hover:text-red-700 cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center mt-6  space-x-1">
                <button className="w-8 h-8 flex items-center justify-center rounded-md bg-purple-600 cursor-pointer text-white">
                  1
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-md border cursor-pointer border-gray-200">
                  2
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-md border cursor-pointer border-gray-200">
                  3
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-md border cursor-pointer border-gray-200">
                  4
                </button>
                <span className="px-2">...</span>
                <button className="w-8 h-8 flex items-center justify-center rounded-md border cursor-pointer border-gray-200">
                  40
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-md border cursor-pointer border-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Actions Modal */}
      {showRecentActionsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Последние действия</h3>
              <button
                onClick={() => setShowRecentActionsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4 max-h-96 overflow-y-auto">
              <div className="space-y-3">
                {recentActions.map((action) => (
                  <div
                    key={action.id}
                    className="flex items-start p-3 border border-gray-200 rounded-lg"
                  >
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        {action.action}
                      </div>
                      <div className="text-sm text-gray-500">
                        {action.location}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {action.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center mt-6 space-x-1">
                <button className="w-8 h-8 flex items-center justify-center rounded-md cursor-pointer bg-purple-600 text-white">
                  1
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-md cursor-pointer border border-gray-200">
                  2
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-md cursor-pointer border border-gray-200">
                  3
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-md cursor-pointer border border-gray-200">
                  4
                </button>
                <span className="px-2">...</span>
                <button className="w-8 h-8 flex items-center justify-center rounded-md cursor-pointer border border-gray-200">
                  40
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-md cursor-pointer border border-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Push Bot Setup Modal */}
      {showPushBotModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full ">
            <div className="flex items-center justify-between p-4 border-b cursor-pointer">
              <h3 className="text-lg font-semibold">Настройка пуш-бота</h3>
              <button
                onClick={() => setShowPushBotModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Токен*
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={pushBotToken}
                    onChange={(e) => setPushBotToken(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Введите токен"
                  />
                  <button className="absolute right-3 top-3 text-gray-400 cursor-pointer hover:text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="ml-2 text-sm text-gray-600 cursor-pointer">
                    О чем уведомлять
                  </span>
                </label>
                <div className="mt-2 text-sm text-gray-500">
                  Пополнения, зачисления{" "}
                  <span className="text-purple-600">+4</span>
                </div>
              </div>

              <button className="w-full bg-purple-600 text-white py-3 cursor-pointer px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                Добавить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
