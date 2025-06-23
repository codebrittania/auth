"use client";

import { useMemo, useState } from "react";

interface Gateway {
  id: string;
  name: string;
  type: "sbp" | "card" | "crypto" | "bank";
  status: "active" | "inactive" | "maintenance";
  provider: string;
  commission: number;
  payInCommission: number; // Add this new field
  priority: number; // Add this new field
  minAmount: number;
  maxAmount: number;
  dailyLimit: number;
  monthlyLimit: number;
  supportedCurrencies: string[];
  apiEndpoint: string;
  lastCheck: string;
  uptime: number;
  totalTransactions: number;
  totalVolume: number;
}

const mockGateways: Gateway[] = [
  {
    id: "1",
    name: "SBP SBER",
    type: "sbp",
    status: "active",
    provider: "Сбербанк",
    commission: 0.5,
    payInCommission: 1.2, // Add this
    priority: 1, // Add this
    minAmount: 10,
    maxAmount: 100000,
    dailyLimit: 1000000,
    monthlyLimit: 30000000,
    supportedCurrencies: ["RUB"],
    apiEndpoint: "https://api.sber.ru/sbp",
    lastCheck: "2025-01-20 14:30",
    uptime: 99.8,
    totalTransactions: 5420,
    totalVolume: 542000,
  },
  {
    id: "2",
    name: "CARD TINKOFF",
    type: "card",
    status: "active",
    provider: "Тинькофф Банк",
    commission: 1.2,
    payInCommission: 2.1, // Add this
    priority: 2, // Add this
    minAmount: 50,
    maxAmount: 500000,
    dailyLimit: 2000000,
    monthlyLimit: 60000000,
    supportedCurrencies: ["RUB"],
    apiEndpoint: "https://api.tinkoff.ru/cards",
    lastCheck: "2025-01-20 14:25",
    uptime: 99.9,
    totalTransactions: 3210,
    totalVolume: 321000,
  },
  {
    id: "3",
    name: "CRYPTO USDT",
    type: "crypto",
    status: "maintenance",
    provider: "Binance",
    commission: 0.1,
    payInCommission: 0.8, // Add this
    priority: 3, // Add this
    minAmount: 1,
    maxAmount: 1000000,
    dailyLimit: 5000000,
    monthlyLimit: 150000000,
    supportedCurrencies: ["USDT", "BTC", "ETH"],
    apiEndpoint: "https://api.binance.com/crypto",
    lastCheck: "2025-01-20 13:45",
    uptime: 98.5,
    totalTransactions: 8930,
    totalVolume: 893000,
  },
  {
    id: "4",
    name: "SBP VTB",
    type: "sbp",
    status: "inactive",
    provider: "ВТБ",
    commission: 0.7,
    payInCommission: 1.5, // Add this
    priority: 4, // Add this
    minAmount: 20,
    maxAmount: 200000,
    dailyLimit: 1500000,
    monthlyLimit: 45000000,
    supportedCurrencies: ["RUB"],
    apiEndpoint: "https://api.vtb.ru/sbp",
    lastCheck: "2025-01-20 12:00",
    uptime: 97.2,
    totalTransactions: 1560,
    totalVolume: 156000,
  },
];

export function GatewaysPage() {
  const [gateways, setGateways] = useState<Gateway[]>(mockGateways);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selectedGateway, setSelectedGateway] = useState<Gateway | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Gateway>>({});

  const filteredGateways = useMemo(() => {
    return gateways.filter((gateway) => {
      const matchesSearch =
        gateway.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gateway.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gateway.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || gateway.status === statusFilter;
      const matchesType = typeFilter === "all" || gateway.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [gateways, searchTerm, statusFilter, typeFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800";
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
      case "maintenance":
        return "Обслуживание";
      default:
        return status;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "sbp":
        return "bg-blue-100 text-blue-800";
      case "card":
        return "bg-purple-100 text-purple-800";
      case "crypto":
        return "bg-orange-100 text-orange-800";
      case "bank":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case "sbp":
        return "СБП";
      case "card":
        return "Карты";
      case "crypto":
        return "Криптовалюта";
      case "bank":
        return "Банк";
      default:
        return type;
    }
  };

  const toggleGatewayStatus = (gatewayId: string) => {
    setGateways((prev) =>
      prev.map((gateway) => {
        if (gateway.id === gatewayId) {
          const newStatus = gateway.status === "active" ? "inactive" : "active";
          return { ...gateway, status: newStatus };
        }
        return gateway;
      })
    );
  };

  const openEditModal = (gateway: Gateway) => {
    setSelectedGateway(gateway);
    setEditForm({
      name: gateway.name,
      provider: gateway.provider,
      commission: gateway.commission,
      payInCommission: gateway.payInCommission, // Add this
      priority: gateway.priority, // Add this
      minAmount: gateway.minAmount,
      maxAmount: gateway.maxAmount,
      dailyLimit: gateway.dailyLimit,
      monthlyLimit: gateway.monthlyLimit,
      status: gateway.status,
      type: gateway.type,
    });
    setShowEditModal(true);
  };

  const saveChanges = () => {
    if (selectedGateway && editForm) {
      setGateways((prev) =>
        prev.map((gateway) => {
          if (gateway.id === selectedGateway.id) {
            return { ...gateway, ...editForm };
          }
          return gateway;
        })
      );
      setShowEditModal(false);
      setSelectedGateway(null);
      setEditForm({});
    }
  };

  const testConnection = (gatewayId: string) => {
    // Simulate API test
    const gateway = gateways.find((g) => g.id === gatewayId);
    if (gateway) {
      alert(
        `Тестирование подключения к ${gateway.name}...\nСтатус: Успешно\nВремя ответа: 120ms`
      );
    }
  };

  return (
    <div className="px-4 sm:px-6 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Управление платежными шлюзами
        </h1>
        <p className="text-gray-600">
          Управляйте платежными шлюзами, их настройками и лимитами
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-green-600">
            {gateways.filter((g) => g.status === "active").length}
          </div>
          <div className="text-sm text-gray-600">Активных шлюзов</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-yellow-600">
            {gateways.filter((g) => g.status === "maintenance").length}
          </div>
          <div className="text-sm text-gray-600">На обслуживании</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-600">
            {gateways.filter((g) => g.status === "inactive").length}
          </div>
          <div className="text-sm text-gray-600">Неактивных</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-green-600">
            {(
              gateways.reduce((sum, g) => sum + g.uptime, 0) / gateways.length
            ).toFixed(1)}
            %
          </div>
          <div className="text-sm text-gray-600">Средний аптайм</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Поиск по названию, провайдеру или ID..."
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
            className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-green-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Все статусы</option>
            <option value="active">Активные</option>
            <option value="inactive">Неактивные</option>
            <option value="maintenance">Обслуживание</option>
          </select>

          <select
            className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-green-500"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">Все типы</option>
            <option value="sbp">СБП</option>
            <option value="card">Карты</option>
            <option value="crypto">Криптовалюта</option>
            <option value="bank">Банк</option>
          </select>

          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Добавить шлюз
          </button>
        </div>
      </div>

      {/* Gateways Table - Mobile View */}
      <div className="block sm:hidden space-y-4">
        {filteredGateways.map((gateway) => (
          <div
            key={gateway.id}
            className="bg-white border border-gray-200 rounded-lg p-4"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="font-medium text-gray-900">{gateway.name}</div>
                <div className="text-sm text-gray-500">{gateway.provider}</div>
                <div className="text-xs text-gray-400">ID: {gateway.id}</div>
              </div>
              <div className="flex flex-col items-end space-y-1">
                <span
                  className={`px-2 py-1 rounded text-xs ${getStatusColor(
                    gateway.status
                  )}`}
                >
                  {getStatusText(gateway.status)}
                </span>
                <span
                  className={`px-2 py-1 rounded text-xs ${getTypeColor(
                    gateway.type
                  )}`}
                >
                  {getTypeText(gateway.type)}
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Комиссия:</span>
                <span className="font-medium">{gateway.commission}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Лимиты:</span>
                <span>
                  {gateway.minAmount} - {gateway.maxAmount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Аптайм:</span>
                <span className="font-medium text-green-600">
                  {gateway.uptime}%
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Объем:</span>
                <span>{gateway.totalVolume.toLocaleString()} USDT</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => toggleGatewayStatus(gateway.id)}
                className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-colors ${
                  gateway.status === "active"
                    ? "bg-red-100 text-red-700 hover:bg-red-200"
                    : "bg-green-100 text-green-700 hover:bg-green-200"
                }`}
              >
                {gateway.status === "active" ? "Выключить" : "Включить"}
              </button>
              <button
                onClick={() => openEditModal(gateway)}
                className="flex-1 bg-green-100 text-green-700 py-2 px-3 rounded text-sm font-medium hover:bg-green-200 transition-colors"
              >
                Настройки
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Gateways Table - Desktop View */}
      <div className="hidden sm:block bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Шлюз
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Тип
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Статус
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Комиссия
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Лимиты
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Аптайм
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Статистика
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredGateways.map((gateway) => (
              <tr key={gateway.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {gateway.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {gateway.provider}
                    </div>
                    <div className="text-xs text-gray-400">
                      ID: {gateway.id}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(
                      gateway.type
                    )}`}
                  >
                    {getTypeText(gateway.type)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                      gateway.status
                    )}`}
                  >
                    {getStatusText(gateway.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {gateway.commission}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div>
                    {gateway.minAmount} - {gateway.maxAmount.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    Дневной: {gateway.dailyLimit.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-green-600">
                    {gateway.uptime}%
                  </div>
                  <div className="text-xs text-gray-500">
                    {gateway.lastCheck}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div>{gateway.totalTransactions} транзакций</div>
                  <div className="text-xs text-gray-500">
                    {gateway.totalVolume.toLocaleString()} USDT
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => openEditModal(gateway)}
                      className="text-green-600 hover:text-green-800 transition-colors"
                      title="Редактировать шлюз"
                    >
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
                          strokeWidth="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => testConnection(gateway.id)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      title="Тестировать подключение"
                    >
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
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
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
          Показано {filteredGateways.length} из {gateways.length} шлюзов
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

      {/* Edit Gateway Modal */}
      {showEditModal && selectedGateway && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">
                Настройки платежного шлюза
              </h3>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Провайдер
                  </label>
                  <input
                    type="text"
                    value={editForm.provider || ""}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        provider: e.target.value,
                      }))
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Тип
                  </label>
                  <select
                    value={editForm.type || ""}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        type: e.target.value as
                          | "sbp"
                          | "card"
                          | "crypto"
                          | "bank",
                      }))
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="sbp">СБП</option>
                    <option value="card">Карты</option>
                    <option value="crypto">Криптовалюта</option>
                    <option value="bank">Банк</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Приоритет
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={editForm.priority || ""}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        priority: Number.parseInt(e.target.value),
                      }))
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-transparent"
                    placeholder="1 - высший приоритет"
                  />
                </div>
              </div>

              {/* Status Toggle */}
              <div className="border border-gray-200 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Статус шлюза
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="active"
                      checked={editForm.status === "active"}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          status: e.target.value as
                            | "active"
                            | "inactive"
                            | "maintenance",
                        }))
                      }
                      className="mr-2 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-green-700">Активен</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="inactive"
                      checked={editForm.status === "inactive"}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          status: e.target.value as
                            | "active"
                            | "inactive"
                            | "maintenance",
                        }))
                      }
                      className="mr-2 text-gray-600 focus:ring-gray-500"
                    />
                    <span className="text-sm text-gray-700">Неактивен</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="maintenance"
                      checked={editForm.status === "maintenance"}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          status: e.target.value as
                            | "active"
                            | "inactive"
                            | "maintenance",
                        }))
                      }
                      className="mr-2 text-yellow-600 focus:ring-yellow-500"
                    />
                    <span className="text-sm text-yellow-700">
                      Обслуживание
                    </span>
                  </label>
                </div>
              </div>

              {/* Commission Settings */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Настройки комиссий
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pay-Out комиссия (%)
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
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-transparent"
                      placeholder="Комиссия за вывод"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pay-In комиссия (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      value={editForm.payInCommission || ""}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          payInCommission: Number.parseFloat(e.target.value),
                        }))
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-transparent"
                      placeholder="Комиссия за пополнение"
                    />
                  </div>
                </div>
              </div>

              {/* Limits Settings */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Лимиты транзакций
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Мин. сумма
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
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Макс. сумма
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={editForm.maxAmount || ""}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          maxAmount: Number.parseInt(e.target.value),
                        }))
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Дневной лимит
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={editForm.dailyLimit || ""}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          dailyLimit: Number.parseInt(e.target.value),
                        }))
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Месячный лимит
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={editForm.monthlyLimit || ""}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          monthlyLimit: Number.parseInt(e.target.value),
                        }))
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
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
