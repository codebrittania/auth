"use client";

import { useMemo, useState } from "react";

interface Merchant {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive" | "suspended";
  commission: number;
  minAmount: number;
  apiToken: string;
  createdAt: string;
  lastActive: string;
  totalTransactions: number;
  totalVolume: number;
}

const mockMerchants: Merchant[] = [
  {
    id: "1",
    name: "MaKO Merchant",
    email: "mako@example.com",
    status: "active",
    commission: 2.5,
    minAmount: 100,
    apiToken: "mk_live_abc123def456",
    createdAt: "2024-01-15",
    lastActive: "2025-01-20 14:30",
    totalTransactions: 1250,
    totalVolume: 125000,
  },
  {
    id: "2",
    name: "CryptoTrader Pro",
    email: "crypto@trader.com",
    status: "active",
    commission: 3.0,
    minAmount: 50,
    apiToken: "mk_live_xyz789ghi012",
    createdAt: "2024-02-20",
    lastActive: "2025-01-20 12:15",
    totalTransactions: 890,
    totalVolume: 89000,
  },
  {
    id: "3",
    name: "Digital Assets Ltd",
    email: "info@digitalassets.com",
    status: "inactive",
    commission: 2.8,
    minAmount: 200,
    apiToken: "mk_live_def456jkl789",
    createdAt: "2024-03-10",
    lastActive: "2025-01-18 09:45",
    totalTransactions: 456,
    totalVolume: 45600,
  },
  {
    id: "4",
    name: "BlockChain Trader",
    email: "support@blockchain.com",
    status: "suspended",
    commission: 4.0,
    minAmount: 75,
    apiToken: "mk_live_mno345pqr678",
    createdAt: "2024-04-05",
    lastActive: "2025-01-15 16:20",
    totalTransactions: 234,
    totalVolume: 23400,
  },
];

export function MerchantsPage() {
  const [merchants, setMerchants] = useState<Merchant[]>(mockMerchants);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(
    null
  );
  const [showEditModal, setShowEditModal] = useState(false);

  // const [showTokenModal, setShowTokenModal] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Merchant>>({});

  const filteredMerchants = useMemo(() => {
    return merchants.filter((merchant) => {
      const matchesSearch =
        merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        merchant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        merchant.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || merchant.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [merchants, searchTerm, statusFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Активен";
      case "inactive":
        return "Неактивен";
      case "suspended":
        return "Заблокирован";
      default:
        return status;
    }
  };

  const toggleMerchantStatus = (merchantId: string) => {
    setMerchants((prev) =>
      prev.map((merchant) => {
        if (merchant.id === merchantId) {
          const newStatus =
            merchant.status === "active" ? "inactive" : "active";
          return { ...merchant, status: newStatus };
        }
        return merchant;
      })
    );
  };

  const openEditModal = (merchant: Merchant) => {
    setSelectedMerchant(merchant);
    setEditForm({
      name: merchant.name,
      email: merchant.email,
      commission: merchant.commission,
      minAmount: merchant.minAmount,
      status: merchant.status,
    });
    setShowEditModal(true);
  };

  const saveChanges = () => {
    if (selectedMerchant && editForm) {
      setMerchants((prev) =>
        prev.map((merchant) => {
          if (merchant.id === selectedMerchant.id) {
            return { ...merchant, ...editForm };
          }
          return merchant;
        })
      );
      setShowEditModal(false);
      setSelectedMerchant(null);
      setEditForm({});
    }
  };

  const generateNewToken = (merchantId: string) => {
    const newToken = `mk_live_${Math.random().toString(36).substring(2, 15)}`;
    setMerchants((prev) =>
      prev.map((merchant) => {
        if (merchant.id === merchantId) {
          return { ...merchant, apiToken: newToken };
        }
        return merchant;
      })
    );
    alert(`Новый API токен сгенерирован: ${newToken}`);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Скопировано в буфер обмена");
  };

  return (
    <div className="px-4 sm:px-6 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Управление мерчантами
        </h1>
        <p className="text-gray-600">
          Управляйте мерчантами, их настройками и API токенами
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-green-600">
            {merchants.filter((m) => m.status === "active").length}
          </div>
          <div className="text-sm text-gray-600">Активных мерчантов</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-600">
            {merchants.filter((m) => m.status === "inactive").length}
          </div>
          <div className="text-sm text-gray-600">Неактивных</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-red-600">
            {merchants.filter((m) => m.status === "suspended").length}
          </div>
          <div className="text-sm text-gray-600">Заблокированных</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-purple-600">
            {merchants
              .reduce((sum, m) => sum + m.totalVolume, 0)
              .toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Общий объем (USDT)</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Поиск по имени, email или ID..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400 absolute left-3 top-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <select
            className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Все статусы</option>
            <option value="active">Активные</option>
            <option value="inactive">Неактивные</option>
            <option value="suspended">Заблокированные</option>
          </select>

          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Добавить мерчанта
          </button>
        </div>
      </div>

      {/* Merchants Table - Mobile View */}
      <div className="block sm:hidden space-y-4">
        {filteredMerchants.map((merchant) => (
          <div
            key={merchant.id}
            className="bg-white border border-gray-200 rounded-lg p-4"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="font-medium text-gray-900">{merchant.name}</div>
                <div className="text-sm text-gray-500">{merchant.email}</div>
                <div className="text-xs text-gray-400">ID: {merchant.id}</div>
              </div>
              <span
                className={`px-2 py-1 rounded text-xs ${getStatusColor(
                  merchant.status
                )}`}
              >
                {getStatusText(merchant.status)}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Комиссия:</span>
                <span className="font-medium">{merchant.commission}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Мин. сумма:</span>
                <span>{merchant.minAmount} USDT</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Транзакций:</span>
                <span>{merchant.totalTransactions}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Объем:</span>
                <span>{merchant.totalVolume.toLocaleString()} USDT</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => toggleMerchantStatus(merchant.id)}
                className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-colors ${
                  merchant.status === "active"
                    ? "bg-red-100 text-red-700 hover:bg-red-200"
                    : "bg-green-100 text-green-700 hover:bg-green-200"
                }`}
              >
                {merchant.status === "active"
                  ? "Деактивировать"
                  : "Активировать"}
              </button>
              <button
                onClick={() => openEditModal(merchant)}
                className="flex-1 bg-green-100 text-green-700 py-2 px-3 rounded text-sm font-medium hover:bg-green-200 transition-colors"
              >
                Редактировать
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Merchants Table - Desktop View */}
      <div className="hidden sm:block bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Мерчант
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Статус
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Комиссия
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Мин. сумма
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Статистика
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                API токен
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredMerchants.map((merchant) => (
              <tr key={merchant.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {merchant.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {merchant.email}
                    </div>
                    <div className="text-xs text-gray-400">
                      ID: {merchant.id}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                      merchant.status
                    )}`}
                  >
                    {getStatusText(merchant.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {merchant.commission}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {merchant.minAmount} USDT
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div>{merchant.totalTransactions} транзакций</div>
                  <div className="text-xs text-gray-500">
                    {merchant.totalVolume.toLocaleString()} USDT
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {merchant.apiToken.substring(0, 20)}...
                    </code>
                    <button
                      onClick={() => copyToClipboard(merchant.apiToken)}
                      className="text-gray-400 hover:text-gray-600"
                    >
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
                          strokeWidth="2"
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleMerchantStatus(merchant.id)}
                      className={`px-3 py-1 rounded text-xs transition-colors ${
                        merchant.status === "active"
                          ? "bg-red-100 text-red-700 hover:bg-red-200"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                      }`}
                    >
                      {merchant.status === "active" ? "Выключить" : "Включить"}
                    </button>
                    <button
                      onClick={() => openEditModal(merchant)}
                      className="bg-green-100 text-green-700 px-3 py-1 rounded text-xs hover:bg-green-200 transition-colors"
                    >
                      Редактировать
                    </button>
                    <button
                      onClick={() => generateNewToken(merchant.id)}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-xs hover:bg-blue-200 transition-colors"
                    >
                      Новый токен
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 text-sm">
        <div className="text-gray-500 text-xs sm:text-sm mb-3 sm:mb-0">
          Показано {filteredMerchants.length} из {merchants.length} мерчантов
        </div>
        <div className="flex items-center justify-center sm:justify-end space-x-1">
          <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200">
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
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-md bg-green-600 text-white">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200">
            3
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200">
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
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Edit Merchant Modal */}
      {showEditModal && selectedMerchant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Редактировать мерчанта</h3>
              <button
                onClick={() => setShowEditModal(false)}
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
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Название
                </label>
                <input
                  type="text"
                  value={editForm.name || ""}
                  onChange={(e) =>
                    setEditForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={editForm.email || ""}
                  onChange={(e) =>
                    setEditForm((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Комиссия (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={editForm.commission || ""}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      commission: Number.parseFloat(e.target.value),
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Минимальная сумма (USDT)
                </label>
                <input
                  type="number"
                  min="0"
                  value={editForm.minAmount || ""}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      minAmount: Number.parseInt(e.target.value),
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Статус
                </label>
                <select
                  value={editForm.status || ""}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      status: e.target.value as
                        | "active"
                        | "inactive"
                        | "suspended",
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="active">Активен</option>
                  <option value="inactive">Неактивен</option>
                  <option value="suspended">Заблокирован</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-3 p-4 border-t">
              <button
                onClick={saveChanges}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded font-medium hover:bg-green-700 transition-colors"
              >
                Сохранить
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded font-medium hover:bg-gray-400 transition-colors"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
