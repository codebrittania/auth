import { useMemo, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";

interface Transaction {
  id: string;
  created: string;
  type: string;
  status: "pending" | "confirmed" | "cancelled" | "processing";
  gateway: string;
  merchant: string;
  requisite: string;
  name: string;
  amount: {
    usdt: number;
    rub: number;
  };
}

const mockTransactions: Transaction[] = [
  {
    id: "789884",
    created: "2025-05-21 19:12:28",
    type: "СБП",
    status: "pending",
    gateway: "SBP SBER",
    merchant: "MaKO Merchant",
    requisite: "+7 (999) 999 99-99",
    name: "Мухамедович А.",
    amount: { usdt: -25.2025, rub: 2400 },
  },
  {
    id: "789885",
    created: "2025-05-21 18:45:12",
    type: "Карта",
    status: "processing",
    gateway: "CARD TINKOFF",
    merchant: "CryptoTrader Pro",
    requisite: "5536 9137 **** 4532",
    name: "Иванов И.И.",
    amount: { usdt: -50.5, rub: 4800 },
  },
  {
    id: "789886",
    created: "2025-05-21 17:30:45",
    type: "СБП",
    status: "confirmed",
    gateway: "SBP VTB",
    merchant: "Digital Assets Ltd",
    requisite: "+7 (988) 123 45-67",
    name: "Петров П.П.",
    amount: { usdt: -100.0, rub: 9500 },
  },
  {
    id: "789887",
    created: "2025-05-21 17:30:45",
    type: "СБП",
    status: "processing",
    gateway: "SBP VTB",
    merchant: "Digital Assets Ltd",
    requisite: "+7 (988) 123 45-67",
    name: "Петров П.П.",
    amount: { usdt: -100.0, rub: 9500 },
  },
  {
    id: "789888",
    created: "2025-05-21 15:00:15",
    type: "СБП",
    status: "cancelled",
    gateway: "SBP ALFA",
    merchant: "Quick Exchange",
    requisite: "+7 (977) 555 66-77",
    name: "Козлов К.К.",
    amount: { usdt: -75.25, rub: 7150 },
  },
];

export default function SupportDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter((transaction) => {
      const matchesSearch =
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.gateway.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.requisite.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || transaction.status === statusFilter;
      const matchesType =
        typeFilter === "all" || transaction.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [searchTerm, statusFilter, typeFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Ожидает";
      case "processing":
        return "Обработка";
      case "confirmed":
        return "Подтверждено";
      case "cancelled":
        return "Отменено";
      default:
        return status;
    }
  };

  const handleConfirm = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowConfirmModal(true);
  };

  const handleReject = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowRejectModal(true);
  };

  const confirmTransaction = () => {
    if (selectedTransaction) {
      console.log("Confirming transaction:", selectedTransaction.id);
      // Here you would make an API call to confirm the transaction
      alert(`Транзакция ${selectedTransaction.id} подтверждена`);
    }
    setShowConfirmModal(false);
    setSelectedTransaction(null);
  };

  const rejectTransaction = () => {
    if (selectedTransaction && rejectReason.trim()) {
      console.log(
        "Rejecting transaction:",
        selectedTransaction.id,
        "Reason:",
        rejectReason
      );
      // Here you would make an API call to reject the transaction
      alert(
        `Транзакция ${selectedTransaction.id} отклонена. Причина: ${rejectReason}`
      );
    }
    setShowRejectModal(false);
    setSelectedTransaction(null);
    setRejectReason("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-8xl mx-auto bg-white shadow-sm">
        {/* Header */}
        {/* <header className="border-b border-gray-200">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4">
            <div className="flex items-center">
              <div className="font-bold text-xl">CryptUra</div> */}

        {/* Mobile menu button */}
        {/* <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="ml-4 sm:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button> */}

        {/* Desktop navigation */}
        {/* <nav className="hidden sm:flex space-x-6 ml-12">
                <a href="#" className="font-medium text-gray-900">
                  Поддержка
                </a>
                <a href="#" className="font-medium text-gray-400">
                  Транзакции
                </a>
                <a href="#" className="font-medium text-gray-400">
                  Мерчанты
                </a>
                <a href="#" className="font-medium text-gray-400">
                  Отчеты
                </a>
              </nav>
            </div> */}

        {/* <div className="flex items-center space-x-4"> */}
        {/* USDT Course Display */}
        {/* <div className="hidden sm:flex items-center mr-4 px-3 py-1 bg-gray-100 rounded-lg">
                <div className="text-sm">
                  <span className="text-gray-600">1 USDT =</span>
                  <span className="font-medium text-gray-900 ml-1">78.7 ₽</span>
                </div>
              </div>

              <div className="flex items-center">
                <img src="/placeholder.svg?height=36&width=36" alt="Profile" className="w-9 h-9 rounded-full mr-2" />
                <div className="hidden sm:block">
                  <div className="flex items-center">
                    <span className="font-medium text-sm">Support Admin</span>
                  </div>
                  <div className="text-xs text-gray-500">Панель поддержки →</div>
                </div>
              </div>

              <div className="relative">
                <button className="relative focus:outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    5
                  </span>
                </button>
              </div>
            </div>
          </div> */}

        {/* Mobile navigation menu */}
        {/* {mobileMenuOpen && (
            <nav className="sm:hidden px-4 py-3 space-y-2 bg-gray-50">
              <a href="#" className="block py-2 px-2 font-medium text-gray-900 bg-gray-100 rounded-md">
                Поддержка
              </a>
              <a href="#" className="block py-2 px-2 font-medium text-gray-600 hover:bg-gray-100 rounded-md">
                Транзакции
              </a>
              <a href="#" className="block py-2 px-2 font-medium text-gray-600 hover:bg-gray-100 rounded-md">
                Мерчанты
              </a>
              <a href="#" className="block py-2 px-2 font-medium text-gray-600 hover:bg-gray-100 rounded-md">
                Отчеты
              </a>
              <div className="py-2 px-2 flex items-center">
                <span className="font-medium text-sm">Support Admin</span>
                <span className="ml-2 text-xs text-gray-500">Панель поддержки →</span>
              </div>
              <div className="py-2 px-2 flex items-center justify-between border-t border-gray-200 mt-2 pt-3">
                <span className="text-sm text-gray-600">USDT курс:</span>
                <span className="text-sm font-medium">1 USDT = 78.7 ₽</span>
              </div>
            </nav>
          )}
        </header> */}

        {/* Support Dashboard Section */}
        <div className="mx-4 sm:mx-6 mt-6 mb-6">
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 rounded-xl p-6 text-white">
            <h2 className="text-xl font-bold mb-4">Панель поддержки</h2>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-lg font-bold">12</div>
                <div className="text-xs text-gray-300">
                  Ожидают подтверждения
                </div>
              </div>

              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-lg font-bold">8</div>
                <div className="text-xs text-gray-300">В обработке</div>
              </div>

              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-lg font-bold">156</div>
                <div className="text-xs text-gray-300">
                  Подтверждено сегодня
                </div>
              </div>

              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-lg font-bold">3</div>
                <div className="text-xs text-gray-300">Отклонено сегодня</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="px-4 sm:px-6 py-6">
          <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
            Управление транзакциями
          </h1>

          {/* Search and Filters */}
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Поиск по ID, мерчанту, шлюзу, имени..."
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

              <div className="flex gap-2">
                <select
                  className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">Все статусы</option>
                  <option value="pending">Ожидает</option>
                  <option value="processing">Обработка</option>
                  <option value="confirmed">Подтверждено</option>
                  <option value="cancelled">Отменено</option>
                </select>

                <select
                  className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="all">Все типы</option>
                  <option value="СБП">СБП</option>
                  <option value="Карта">Карта</option>
                  <option value="Криптовалюта">Криптовалюта</option>
                </select>
              </div>
            </div>
          </div>

          {/* Transactions Table - Mobile View */}
          <div className="block sm:hidden">
            <div className="space-y-4">
              {filteredTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        ID: {transaction.id}
                      </div>
                      <div className="text-xs text-gray-500">
                        {transaction.created}
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs ${getStatusColor(
                        transaction.status
                      )}`}
                    >
                      {getStatusText(transaction.status)}
                    </span>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Мерчант:</span>
                      <span className="font-medium">
                        {transaction.merchant}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Шлюз:</span>
                      <span>{transaction.gateway}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Тип:</span>
                      <span>{transaction.type}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Реквизит:</span>
                      <span>{transaction.requisite}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">ФИО:</span>
                      <span>{transaction.name}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <div className="text-sm text-red-500">
                        {transaction.amount.usdt} USDT
                      </div>
                      <div className="text-sm text-green-500">
                        + {transaction.amount.rub} ₽
                      </div>
                    </div>
                  </div>

                  {(transaction.status === "pending" ||
                    transaction.status === "processing") && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleConfirm(transaction)}
                        className="flex-1 bg-green-500 text-white py-2 px-3 rounded text-sm font-medium hover:bg-green-600"
                      >
                        Подтвердить
                      </button>
                      <button
                        onClick={() => handleReject(transaction)}
                        className="flex-1 bg-red-500 text-white py-2 px-2 rounded text-sm font-medium hover:bg-red-700"
                      >
                        О
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Transactions Table - Desktop View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Создан
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Тип
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Статус
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Шлюз
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Мерчант
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Реквизит
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ФИО
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Сумма
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{transaction.created.split(" ")[0]}</div>
                      <div>{transaction.created.split(" ")[1]}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                          <span className="text-xs font-medium text-blue-600">
                            {transaction.type === "СБП"
                              ? "С"
                              : transaction.type === "Карта"
                              ? "К"
                              : "Ƀ"}
                          </span>
                        </div>
                        <span className="text-sm text-gray-900">
                          {transaction.type}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          transaction.status
                        )}`}
                      >
                        {getStatusText(transaction.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.gateway}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.merchant}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.requisite}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="text-red-500">
                        {transaction.amount.usdt} USDT
                      </div>
                      <div className="text-green-500">
                        + {transaction.amount.rub} ₽
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {transaction.status === "pending" ||
                      transaction.status === "processing" ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleConfirm(transaction)}
                            className="bg-green-500 text-white px-1 py-1 rounded text-xs  cursor-pointer transition-all duration-200 hover:bg-green-600"
                          >
                            <FaCheck size={21} />
                          </button>
                          <button
                            onClick={() => handleReject(transaction)}
                            className="bg-red-500 text-white px-1 py-1 rounded text-xs  cursor-pointer transition-all duration-200 hover:bg-red-600"
                          >
                            <MdCancel size={21} />
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 text-sm">
            <div className="text-gray-500 text-xs sm:text-sm mb-3 sm:mb-0">
              Показано {filteredTransactions.length} из{" "}
              {mockTransactions.length} записей
            </div>
            <div className="flex items-center justify-center sm:justify-end space-x-1">
              <button className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md border border-gray-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 sm:h-4 sm:w-4"
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
              <button className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md bg-blue-600 text-white">
                1
              </button>
              <button className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md border border-gray-200">
                2
              </button>
              <button className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md border border-gray-200">
                3
              </button>
              <button className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md border border-gray-200 hidden sm:flex">
                4
              </button>
              <button className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md border border-gray-200">
                ...
              </button>
              <button className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md border border-gray-200">
                40
              </button>
              <button className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md border border-gray-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 sm:h-4 sm:w-4"
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
        </main>
      </div>

      {/* Confirm Modal */}
      {showConfirmModal && selectedTransaction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">
                Подтверждение транзакции
              </h3>
              <button
                onClick={() => setShowConfirmModal(false)}
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
            <div className="p-4">
              <p className="text-gray-600 mb-4">
                Вы уверены, что хотите подтвердить транзакцию{" "}
                <strong>#{selectedTransaction.id}</strong>?
              </p>
              <div className="bg-gray-50 p-3 rounded-lg mb-4">
                <div className="text-sm space-y-1">
                  <div>
                    <strong>Мерчант:</strong> {selectedTransaction.merchant}
                  </div>
                  <div>
                    <strong>Сумма:</strong> {selectedTransaction.amount.usdt}{" "}
                    USDT ({selectedTransaction.amount.rub} ₽)
                  </div>
                  <div>
                    <strong>Получатель:</strong> {selectedTransaction.name}
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={confirmTransaction}
                  className="flex-1 bg-green-500 text-white py-2 px-4 rounded font-medium hover:bg-green-600"
                >
                  Подтвердить
                </button>
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded font-medium hover:bg-gray-400"
                >
                  Отмена
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && selectedTransaction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Отклонение транзакции</h3>
              <button
                onClick={() => setShowRejectModal(false)}
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
            <div className="p-4">
              <p className="text-gray-600 mb-4">
                Укажите причину отклонения транзакции{" "}
                <strong>#{selectedTransaction.id}</strong>:
              </p>
              <div className="bg-gray-50 p-3 rounded-lg mb-4">
                <div className="text-sm space-y-1">
                  <div>
                    <strong>Мерчант:</strong> {selectedTransaction.merchant}
                  </div>
                  <div>
                    <strong>Сумма:</strong> {selectedTransaction.amount.usdt}{" "}
                    USDT ({selectedTransaction.amount.rub} ₽)
                  </div>
                  <div>
                    <strong>Получатель:</strong> {selectedTransaction.name}
                  </div>
                </div>
              </div>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Введите причину отклонения..."
                className="w-full p-3 border border-gray-300 rounded-lg resize-none h-24 mb-4"
                required
              />
              <div className="flex space-x-3">
                <button
                  onClick={rejectTransaction}
                  disabled={!rejectReason.trim()}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded font-medium hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Отклонить
                </button>
                <button
                  onClick={() => setShowRejectModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded font-medium hover:bg-gray-400"
                >
                  Отмена
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
