import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { cryptUraApi } from "../../api/CryptUraApi";
import { WithdrawalModal } from "../../components/WithdrawalModal";
import { useBalanceStore } from "../../stores/BalanceStore";

export function ActivesPage() {
  const [withdrawalModalOpen, setWithdrawalModalOpen] = useState(false);
  const [rate, setRate] = useState<any>({});

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const response = await cryptUraApi.rateUsdtRub();
        setRate(response);
      } catch (err: any) {
        console.error("Rate fetch error:", err);
      }
    };

    fetchRate();
  }, []);

  // const { data: merchantBalance } = useMerchantBalance();
  const { balance } = useBalanceStore();
  // console.log(merchantBalance);

  const USDT_TO_RUB = rate.ask;
  const MAX_BALANCE = balance === null ? 0 : balance;
  const rubEquivalent =
    typeof balance === "number"
      ? Math.round(balance * USDT_TO_RUB).toLocaleString("ru-RU")
      : "---";

  const openWithdrawalModal = () => {
    setWithdrawalModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeWithdrawalModal = () => {
    setWithdrawalModalOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="max-w-7xl mx-auto bg-white shadow-sm min-h-screen">
      <div className="bg-white p-6 min-h-[calc(100vh-80px)]">
        <NavLink
          to="/profile"
          className="flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Профиль
        </NavLink>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Активы</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {/* Основной баланс */}
          <div className="bg-white rounded-xl border border-gray-200 py-6 px-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Основной
            </h3>
            <div className="mb-4">
              <div className="text-2xl font-bold text-gray-900">
                {balance === null ? 0 : balance} USDT
              </div>
              <div className="text-sm text-gray-500">~{rubEquivalent} RUB</div>
            </div>
            <div className="flex space-x-3">
              <button
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium border border-gray-200 transition-colors cursor-pointer"
                onClick={openWithdrawalModal}
              >
                Вывести
              </button>
            </div>
          </div>

          {/* Замороженный баланс */}
          <div className="bg-white rounded-xl border border-gray-200 py-6 px-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Замороженный
            </h3>
            <div className="mb-4">
              <div className="text-2xl font-bold text-gray-900">---</div>
            </div>
          </div>
        </div>
      </div>

      <WithdrawalModal
        isOpen={withdrawalModalOpen}
        onClose={closeWithdrawalModal}
        maxBalance={MAX_BALANCE}
      />
    </div>
  );
}
