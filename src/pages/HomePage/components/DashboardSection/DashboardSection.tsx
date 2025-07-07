import { useEffect, useState } from "react";
import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import { WithdrawalModal } from "../../../../components/WithdrawalModal";
import { useMerchantBalance } from "../../../../hooks/useMerchantBalance";
import { useBalanceStore } from "../../../../stores/BalanceStore";
import { useStatsBalances } from "../../hooks/useStatsBalances";
import { useWithdrawalsHistory } from "../../hooks/useWithdrawalsHistory";

export interface StatsBalance {
  wallet_usdt: number;
  hold_rub: number;
  rub_in: number;
  rub_out: number;
  hold_usdt: number;
}

interface WithdrawalHistoryItem {
  id: number;
  amount: string;
  created_at: string;
  description: string | null;
  merchant_id: number;
  status: string;
  wallet_address: string;
}

export const DashboardSection = () => {
  const [withdrawalModalOpen, setWithdrawalModalOpen] = useState(false);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);

  const { data: merchantBalance } = useMerchantBalance();
  const { data: withdrawalsHistory } = useWithdrawalsHistory();

  console.log(withdrawalsHistory);
  const { setBalance } = useBalanceStore();

  useEffect(() => {
    if (typeof merchantBalance?.balance === "number") {
      setBalance(merchantBalance.balance);
    } else {
      setBalance(0);
    }
  }, [merchantBalance, setBalance]);

  const { data: statsBalance } = useStatsBalances();

  const MAX_BALANCE = merchantBalance?.balance;

  const openWithdrawalModal = () => {
    setWithdrawalModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeWithdrawalModal = () => {
    setWithdrawalModalOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <div className="mx-4 sm:mx-6 mt-6 mb-6">
        <div className="bg-gradient-to-br from-green-900 via-green-800 to-black rounded-xl p-6 text-white">
          <h2 className="text-xl font-bold mb-4">Дашборд</h2>
          <div className="flex space-x-1 mb-6">
            <button
              onClick={openWithdrawalModal}
              className="px-4 py-2 bg-white/20 cursor-pointer  rounded-lg text-sm font-medium"
            >
              Withdraw USDT
            </button>
            <button
              onClick={() => setHistoryModalOpen(true)}
              className="px-4 py-2 ml-5 md:ml-2 bg-white/20 cursor-pointer rounded-lg text-sm font-medium"
            >
              Withdraw History
            </button>
          </div>

          <div className="mb-6">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold">
              {merchantBalance?.balance === null ? 0 : merchantBalance?.balance}
              <span className="text-gray-300">
                {" "}
                {merchantBalance?.currency}
              </span>
              <span className="text-sm ml-2 text-gray-300">
                {merchantBalance?.pending} pending
              </span>
            </div>
            <div className="text-sm text-gray-300">
              {merchantBalance?.currency} Wallet
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="RUB Hold"
              value={statsBalance?.hold_rub}
              unit="RUB"
            />
            <StatCard label="RUB In" value={statsBalance?.rub_in} unit="RUB" />
            <StatCard label="" value={"Временно недоступтно"} unit="" />
            <StatCard label="" value={"Временно недоступтно"} unit="" />
            {/* <StatCard
            label="USDT Hold"
            value={statsBalance?.hold_usdt}
            unit="USDT"
          /> */}
          </div>
        </div>
      </div>
      <WithdrawalModal
        isOpen={withdrawalModalOpen}
        onClose={closeWithdrawalModal}
        maxBalance={MAX_BALANCE}
      />

      {historyModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-9999 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-black">История выводов</h3>
              <button
                onClick={() => setHistoryModalOpen(false)}
                className="text-black cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {withdrawalsHistory?.map((item: WithdrawalHistoryItem) => {
                const statusInfo = {
                  completed: {
                    text: "Завершено",
                    icon: <FaCheckCircle className="text-green-500 w-4 h-4" />,
                    color: "text-green-500",
                  },
                  rejected: {
                    text: "Отклонено",
                    icon: <FaTimesCircle className="text-red-500 w-4 h-4" />,
                    color: "text-red-500",
                  },
                  pending: {
                    text: "В ожидании",
                    icon: <FaClock className="text-yellow-500 w-4 h-4" />,
                    color: "text-yellow-500",
                  },
                };

                const currentStatus =
                  statusInfo[item.status as keyof typeof statusInfo];

                return (
                  <div
                    key={item.id}
                    className="bg-white/5 border border-black/20 p-4 rounded-xl "
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm ">Сумма</span>
                      <span className="text-sm font-medium ">
                        {item.amount} USDT
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm ">Дата</span>
                      <span className="text-sm ">
                        {new Date(item.created_at).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm ">Статус</span>
                      <span
                        className={`flex items-center gap-1 ${currentStatus.color}`}
                      >
                        {currentStatus.icon}
                        <span className="text-sm">{currentStatus.text}</span>
                      </span>
                    </div>

                    <div className="flex flex-row items-center justify-between gap-1 sm:gap-2">
                      <span className="text-sm  shrink-0">Кошелек</span>
                      <code className="text-xs max-w-[65%]  break-all font-mono">
                        {item.wallet_address}
                      </code>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const StatCard = ({
  label,
  value,
  unit,
}: {
  label: string;
  value: number | string | undefined;
  unit: string;
}) => {
  return (
    <div className="bg-white/10 rounded-lg p-4">
      <div className="flex items-center mb-2">
        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>
      </div>
      <div className="text-lg font-bold">
        {value !== undefined ? value : "—"}{" "}
        <span className="text-gray-300">{unit}</span>
      </div>
      <div className="text-xs text-gray-300">{label}</div>
    </div>
  );
};
