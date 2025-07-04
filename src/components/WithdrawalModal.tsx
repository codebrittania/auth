import React, { useEffect, useState } from "react";
import { cryptUraApi } from "../api/CryptUraApi";

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  maxBalance: number | undefined;
}

type WhitelistWallet = {
  address: string;
  created_at: string;
  created_by: number;
  currency: string;
  id: number;
  is_active: boolean;
  is_default: boolean;
  merchant_id: number;
  network: string;
  updated_at: string | null;
};

export const WithdrawalModal: React.FC<WithdrawalModalProps> = ({
  isOpen,
  onClose,
  maxBalance,
}) => {
  const [whitelistedWallets, setWhitelistedWallets] = useState<
    WhitelistWallet[]
  >([]);
  console.log(whitelistedWallets);

  useEffect(() => {
    const getWhiteListWallets = async () => {
      try {
        const res = await cryptUraApi.getWallets();
        setWhitelistedWallets(res.wallets);
      } catch (error) {
        console.log(error);
      }
    };

    getWhiteListWallets();
  }, []);
  const NETWORK_FEE = 2.5;
  const SERVICE_FEE_PERCENT = 0.5;

  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [walletValid, setWalletValid] = useState(false);

  const validateWallet = (address: string) => {
    const cleaned = address.trim();
    const isValid = whitelistedWallets.some(
      (wallet) => wallet.address.trim() === cleaned
    );
    setWalletValid(isValid);
  };

  const calculateTotal = () => {
    const amount = parseFloat(withdrawAmount) || 0;
    if (amount < 0.01) return { amount: 0, totalFees: 0, totalReceive: 0 };

    const serviceFee = (amount * SERVICE_FEE_PERCENT) / 100;
    const totalFees = NETWORK_FEE + serviceFee;
    const totalReceive = Math.max(0, amount - totalFees);

    return { amount, totalFees, totalReceive };
  };

  const validateForm = () => {
    const { amount, totalReceive } = calculateTotal();
    return (
      //@ts-ignore
      amount > 0 && amount <= maxBalance && totalReceive > 0 && walletValid
    );
  };

  const handleWithdrawal = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log("Ошибка: некорректные данные");
      return;
    }

    try {
      const amount = parseFloat(withdrawAmount);
      const data = await cryptUraApi.createWithdraw(amount, walletAddress);
      console.log("Вывод успешно отправлен:", data);

      onClose();
      resetForm();
    } catch (error) {
      console.error("Ошибка при выводе средств:", error);
    }
  };

  const resetForm = () => {
    setWithdrawAmount("");
    setWalletAddress("");
    setWalletValid(false);
  };

  const setMaxAmount = () => {
    if (!maxBalance || maxBalance <= NETWORK_FEE) {
      setWithdrawAmount("");
      return;
    }

    const max = maxBalance ;
    const safeMax = Math.floor(max * 100) / 100;
    setWithdrawAmount(safeMax.toFixed(2));
  };

  if (!isOpen) return;
  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">Вывод средств</h3>
          <button
            className="text-gray-500 hover:text-gray-700 p-1 rounded cursor-pointer"
            onClick={onClose}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <form onSubmit={handleWithdrawal}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Сумма вывода
              </label>
              <div className="relative">
                <input
                  type="number"
                  className="w-full outline:none px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="0.00"
                  step="0.01"
                  min="0.00"
                  value={withdrawAmount}
                  onChange={(e) => {
                    const raw = e.target.value;
                    const parsed = parseFloat(raw);
                    const safeMax = maxBalance || 0;

                    if (isNaN(parsed) || parsed < 0.01) {
                      setWithdrawAmount("");
                    } else if (parsed > safeMax) {
                      setWithdrawAmount(safeMax.toFixed(2));
                    } else {
                      setWithdrawAmount(raw);
                    }
                  }}
                  required
                />
                <span className="absolute right-16 top-3.5 text-sm text-gray-500">
                  USDT
                </span>
                <button
                  type="button"
                  className="absolute right-2 top-3 cursor-pointer bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1 rounded"
                  onClick={setMaxAmount}
                >
                  MAX
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Адрес кошелька
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Введите адрес кошелька"
                value={walletAddress}
                onChange={(e) => {
                  setWalletAddress(e.target.value);
                  validateWallet(e.target.value);
                }}
                required
              />
              <div
                className={`text-xs mt-2 ${
                  walletValid ? "text-green-600" : "text-red-600"
                }`}
              >
                {walletAddress &&
                  (walletValid
                    ? "✓ Кошелек в белом списке"
                    : "✗ Кошелек не найден в белом списке")}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Комиссия сети:</span>
                <span className="text-gray-900">2.5 USDT</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Комиссия сервиса:</span>
                <span className="text-gray-900">0.5%</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-gray-200 font-semibold">
                <span className="text-gray-900">К получению:</span>
                <span className="text-gray-900">
                  {calculateTotal().totalReceive.toFixed(2)} USDT
                </span>
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-3  px-4 rounded-lg font-medium transition-colors ${
                validateForm()
                  ? "bg-green-500 hover:bg-green-600 cursor-pointer text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!validateForm()}
            >
              Вывести средства
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
