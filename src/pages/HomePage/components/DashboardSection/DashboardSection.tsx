import { useEffect, useState } from "react";
import { WithdrawalModal } from "../../../../components/WithdrawalModal";
import { useMerchantBalance } from "../../../../hooks/useMerchantBalance";
import { useBalanceStore } from "../../../../stores/BalanceStore";
import { useStatsBalances } from "../../hooks/useStatsBalances";

export interface StatsBalance {
  wallet_usdt: number;
  hold_rub: number;
  rub_in: number;
  rub_out: number;
  hold_usdt: number;
}

export const DashboardSection = () => {
  const [withdrawalModalOpen, setWithdrawalModalOpen] = useState(false);

  const { data: merchantBalance } = useMerchantBalance();

  console.log(merchantBalance?.balance);
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
