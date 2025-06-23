import { BankIcon } from "./components/BankIcon";

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
    amount: { usdt: 25.2025, rub: 2400 },
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
    amount: { usdt: 50.5, rub: 4800 },
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
    amount: { usdt: 100.0, rub: 9500 },
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
    amount: { usdt: 100.0, rub: 9500 },
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
    amount: { usdt: 75.25, rub: 7150 },
  },
];

export const TransactionsTable = () => {
  const getStatusStyle = (status: Transaction["status"]) => {
    switch (status) {
      case "pending":
        return {
          text: "Ожидает",
          bg: "bg-yellow-100",
          textColor: "text-yellow-800",
        };
      case "confirmed":
        return {
          text: "Подтверждено",
          bg: "bg-green-100",
          textColor: "text-green-800",
        };
      case "cancelled":
        return {
          text: "Отменено",
          bg: "bg-red-100",
          textColor: "text-red-800",
        };
      case "processing":
        return {
          text: "В обработке",
          bg: "bg-blue-100",
          textColor: "text-blue-800",
        };
      default:
        return {
          text: status,
          bg: "bg-gray-100",
          textColor: "text-gray-800",
        };
    }
  };

  return (
    <div className="hidden sm:block overflow-x-auto custom-scrollbar">
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
              Название
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
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {mockTransactions.map((transaction) => (
            <tr
              key={transaction.id}
              className="cursor-pointer hover:bg-gray-50"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {transaction.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div>2025-05-21</div>
                <div>19:12:28</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-5 h-5  rounded-full flex items-center justify-center mr-2">
                    <BankIcon gateway={transaction.gateway} />
                  </div>
                  <span className="text-sm text-gray-900">
                    {transaction.type}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {(() => {
                  const statusStyle = getStatusStyle(transaction.status);
                  return (
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyle.bg} ${statusStyle.textColor}`}
                    >
                      {statusStyle.text}
                    </span>
                  );
                })()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {transaction.gateway}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {transaction.requisite}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {transaction.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <div className="text-red-500">
                  - {transaction.amount.usdt} USDT
                </div>
                <div className="text-green-500">
                  + {transaction.amount.rub}₽
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
