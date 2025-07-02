import { cryptUraApi } from "../../../../api/CryptUraApi";
import { BankIcon } from "./components/BankIcon";

import { debounce } from "lodash";
import { useEffect, useMemo, useState } from "react";

interface Transaction {
  id: string;
  internal_id?: string;
  created: string;
  type: string;
  status: "pending" | "completed" | "cancelled" | "processing" | "failed";
  gateway: string;
  merchant: string;
  requisite: string;
  name: string;
  amount: {
    usdt: number;
    rub: number;
  };
}

export const TransactionsTable = () => {
  const [transactionsData, setTransactionsData] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [allPages, setAllPages] = useState(0);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const limit = 6;
  const totalPages = Math.ceil(allPages / limit);
  //@ts-ignore
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Создаём дебаунсер (обновляется при первом рендере)
  const debounced = useMemo(
    () =>
      debounce((val: string) => {
        setDebouncedSearch(val);
      }, 200),
    []
  );

  // Следим за изменением searchQuery
  useEffect(() => {
    setCurrentPage(1); // Сброс страницы на 1 при новом поиске

    debounced(searchQuery);
    return () => {
      debounced.cancel(); // чистим при анмаунте
    };
  }, [searchQuery]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const offset = (currentPage - 1) * limit;
        const res = await cryptUraApi.getTransactions(
          offset,
          limit,
          statusFilter,
          debouncedSearch
        );

        setAllPages(res.total);

        const parsed = (res.transactions || []).map(mapApiToTransaction);
        setTransactionsData(parsed);

        setHasMore(parsed.length === limit);
      } catch (error) {
        console.error("Ошибка загрузки транзакций:", error);
      }
    };

    fetchTransactions();
  }, [currentPage, statusFilter, debouncedSearch]);

  const mapApiToTransaction = (item: any): Transaction => {
    const details = item.details || {};
    return {
      id: item.id.toString(),
      internal_id: details?.internal_id || "-",
      created: details?.time || item.created_at,
      type: item.payment_method?.toUpperCase() || "UNKNOWN",
      status: item.status,
      gateway: `${item.payment_method?.toUpperCase()} ${
        details?.bank_ru_name || ""
      }`.trim(),
      merchant: "Crypto Merchant",
      requisite: details.card?.telefon || "Не указано",
      name: details.card?.fio || "Не указано",
      amount: {
        usdt: item.amount_usdt || 0,
        rub: item.amount_rub || 0,
      },
    };
  };

  // const filteredTransactions = transactionsData.filter((t) => {
  //   const query = searchQuery.toLowerCase();

  //   return (
  //     t.id.toLowerCase().includes(query) ||
  //     t.amount.rub.toString().includes(query) ||
  //     t.amount.usdt.toString().includes(query)
  //   );
  // });

  const getVisiblePages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  const renderPagination = () => {
    const visiblePages = getVisiblePages();

    return (
      <div className="flex items-center justify-center sm:justify-end space-x-1 ">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          className="w-8 h-8 flex items-center  cursor-pointer justify-center  rounded-md border border-gray-200 disabled:opacity-40"
        >
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

        {visiblePages.map((page, idx) =>
          page === "..." ? (
            <span
              key={`ellipsis-${idx}`}
              className="w-8 h-8 flex items-center justify-center cursor-pointer text-gray-400"
            >
              …
            </span>
          ) : (
            <button
              key={page}
              onClick={() => setCurrentPage(page as number)}
              className={`w-8 h-8 flex items-center cursor-pointer justify-center rounded-md ${
                page === currentPage
                  ? "bg-green-600 text-white"
                  : "border border-gray-200 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          className="w-8 h-8 flex items-center justify-center  cursor-pointer rounded-md border border-gray-200 disabled:opacity-40"
        >
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
    );
  };

  const getStatusStyle = (status: Transaction["status"]) => {
    switch (status) {
      case "pending":
        return {
          text: "Ожидает",
          bg: "bg-yellow-100",
          textColor: "text-yellow-800",
        };
      case "completed":
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
      case "failed":
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
        return { text: status, bg: "bg-gray-100", textColor: "text-gray-800" };
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Поиск по ID или сумме..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full text-sm"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // при поиске сбрасывай на первую страницу
              }}
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
          <div className="relative">
            <select
              value={statusFilter || ""}
              onChange={(e) => {
                const val = e.target.value;
                setStatusFilter(val || null);
                setCurrentPage(1);
              }}
              className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Все статусы</option>
              <option value="pending">Ожидает</option>
              <option value="processing">В обработке</option>
              <option value="completed">Подтверждено</option>
              <option value="failed">Ошибка</option>
              <option value="cancelled">Отменено</option>
            </select>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400 absolute right-2 top-3 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className=" md:block overflow-x-auto custom-scrollbar">
        <div className="min-h-[478px]">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "ID",
                  "Внут. ID",
                  "Создан",
                  "Тип",
                  "Статус",
                  "Название",
                  "Реквизит",
                  "ФИО",
                  "Сумма",
                  "",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactionsData.map((transaction) => {
                const statusStyle = getStatusStyle(transaction.status);
                const [date, time] = transaction.created.split("T");
                return (
                  <tr
                    key={transaction.id}
                    className="cursor-pointer hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.internal_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{date}</div>
                      <div>{time?.split(".")[0]}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center mr-2">
                          <BankIcon gateway={transaction.gateway} />
                        </div>
                        <span className="text-sm text-gray-900">
                          {transaction.type}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyle.bg} ${statusStyle.textColor}`}
                      >
                        {statusStyle.text}
                      </span>
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
                );
              })}
            </tbody>
          </table>
          {transactionsData.length === 0 && (
            <div className=" flex justify-center items-center text-center py-20 text-gray-500 text-xl">
              Ничего не найдено
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 text-sm">
          <div className="text-gray-500 text-xs sm:text-sm mb-3 sm:mb-0">
            Showing {(currentPage - 1) * limit + 1} to{" "}
            {(currentPage - 1) * limit + transactionsData.length} of {allPages}{" "}
            entries
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 text-sm">
            {renderPagination()}
          </div>
        </div>
      </div>
    </>
  );
};
