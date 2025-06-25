import { useEffect, useState } from "react";
import { cryptUraApi } from "../../../../api/CryptUraApi";
import { WithdrawalModal } from "../../../../components/WithdrawalModal";

export interface StatsBalance {
  wallet_usdt: number;
  hold_rub: number;
  rub_in: number;
  rub_out: number;
  hold_usdt: number;
}

export const DashboardSection = () => {
  const [withdrawalModalOpen, setWithdrawalModalOpen] = useState(false);

  const [statsBalance, setStatsBalance] = useState<StatsBalance | null>(null);
  //@ts-ignore
  const [error, setError] = useState<string | null>(null);

  const MAX_BALANCE = statsBalance?.wallet_usdt;

  const openWithdrawalModal = () => {
    setWithdrawalModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeWithdrawalModal = () => {
    setWithdrawalModalOpen(false);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    const fetchStatsBalances = async () => {
      try {
        const res = await cryptUraApi.getStatsBalances();
        setStatsBalance(res);
      } catch (e) {
        console.error("Ошибка при получении статистики баланса", e);
      }
    };

    fetchStatsBalances();
  }, []);

  return (
    <>
    <div className="mx-4 sm:mx-6 mt-6 mb-6">
      <div className="bg-gradient-to-br from-green-900 via-green-800 to-black rounded-xl p-6 text-white">
        <h2 className="text-xl font-bold mb-4">Дашборд</h2>
        <div className="flex space-x-1 mb-6">
          <button onClick={openWithdrawalModal} className="px-4 py-2 bg-white/20 cursor-pointer  rounded-lg text-sm font-medium">
            Withdraw USDT
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
            {statsBalance?.wallet_usdt ?? "—"}
            <span className="text-gray-300"> USDT</span>
          </div>
          <div className="text-sm text-gray-300">USDT Wallet</div>
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
