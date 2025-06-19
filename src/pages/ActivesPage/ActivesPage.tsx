import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export function loader() {
  return null;
}

export function ActivesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [withdrawalModalOpen, setWithdrawalModalOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [walletValid, setWalletValid] = useState(false);

  const whitelistedWallets = [
    "TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE",
    "TLa2f6VPqDgRE67v1736s7bJ8Ray5wYjU7",
    "TMuA6YqfCeX8EhbfYEg5y7S4DqzSJireY9",
    "TKzxdSv2FZKQrEqkKVgp5DcwEXBEKMg2Ax",
  ];

  const NETWORK_FEE = 2.5; // USDT
  const SERVICE_FEE_PERCENT = 0.5; // %
  const MAX_BALANCE = 19407; // USDT

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const openWithdrawalModal = () => {
    setWithdrawalModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeWithdrawalModal = () => {
    setWithdrawalModalOpen(false);
    document.body.style.overflow = "auto";
    resetForm();
  };

  const resetForm = () => {
    setWithdrawAmount("");
    setWalletAddress("");
    setWalletValid(false);
  };

  const setMaxAmount = () => {
    const maxWithdrawable = MAX_BALANCE - NETWORK_FEE;
    setWithdrawAmount(maxWithdrawable.toFixed(2));
  };

  const validateWallet = (address: string) => {
    if (!address) {
      setWalletValid(false);
      return { valid: false, message: "" };
    }

    const isValid = whitelistedWallets.includes(address);
    setWalletValid(isValid);
    return {
      valid: isValid,
      message: isValid
        ? "✓ Кошелек в белом списке"
        : "✗ Кошелек не найден в белом списке",
    };
  };

  const calculateTotal = () => {
    const amount = parseFloat(withdrawAmount) || 0;
    const serviceFee = (amount * SERVICE_FEE_PERCENT) / 100;
    const totalFees = NETWORK_FEE + serviceFee;
    const totalReceive = Math.max(0, amount - totalFees);

    return {
      amount,
      totalReceive,
      totalFees,
      serviceFee,
    };
  };

  const validateForm = () => {
    const amount = parseFloat(withdrawAmount) || 0;
    const { totalReceive } = calculateTotal();
    return (
      amount > 0 && amount <= MAX_BALANCE && totalReceive > 0 && walletValid
    );
  };

  const handleWithdrawal = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log("Проверьте введенные данные");
      return;
    }

    const { totalReceive } = calculateTotal();
    console.log(
      `Заявка на вывод ${totalReceive.toFixed(2)} USDT создана успешно!`
    );
    closeWithdrawalModal();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const mobileNav = document.getElementById("mobileNav");
      const mobileMenuButton = document.querySelector(".mobile-menu-button");

      if (
        mobileNav &&
        mobileMenuButton &&
        !mobileNav.contains(e.target as Node) &&
        !mobileMenuButton.contains(e.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const { serviceFee, totalReceive } = calculateTotal();

  return (
    <div className="max-w-7xl mx-auto bg-white shadow-sm min-h-screen">
      {/* Header */}

      {/* Main content */}
      <div className="bg-gray-50 p-6 min-h-[calc(100vh-80px)]">
        {/* Back navigation */}
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
          {/* Main asset card */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
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
                19 407 USDT
              </div>
              <div className="text-sm text-gray-500">~1 775 688 RUB</div>
            </div>

            <div className="flex space-x-3">
              <button
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                onClick={() => alert("Пополнить кошелек")}
              >
                Пополнить
              </button>
              <button
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium border border-gray-200 transition-colors"
                onClick={openWithdrawalModal}
              >
                Вывести
              </button>
            </div>
          </div>

          {/* Frozen asset card */}
          <div className="bg-white rounded-xl p-6 shadow-sm opacity-80">
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
              <div className="text-2xl font-bold text-gray-900">3 239 USDT</div>
            </div>
          </div>
        </div>
      </div>

      {/* Withdrawal modal */}
      {withdrawalModalOpen && (
        <div
          className="fixed inset-0 bg-black/20  flex items-center justify-center p-4 z-50"
          onClick={(e) =>
            e.target === e.currentTarget && closeWithdrawalModal()
          }
        >
          <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                Вывод средств
              </h3>
              <button
                className="text-gray-500 hover:text-gray-700 p-1 rounded cursor-pointer"
                onClick={closeWithdrawalModal}
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
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center mb-6">
                <div className="text-sm text-green-800 mb-2">
                  Доступный баланс
                </div>
                <div className="text-2xl font-bold text-green-700 mb-1">
                  19,407 USDT
                </div>
                <div className="text-sm text-green-600">~1,775,688 RUB</div>
              </div>

              <form onSubmit={handleWithdrawal}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Сумма вывода
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="withdrawAmount"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="0.00"
                      step="0.01"
                      min="0.01"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      required
                    />
                    <span className="absolute right-16 top-2.5 text-sm text-gray-500">
                      USDT
                    </span>
                    <button
                      type="button"
                      className="absolute right-2 top-2 cursor-pointer bg-green-400 hover:bg-green-600 text-white text-xs px-2 py-1 rounded"
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
                    id="walletAddress"
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
                      {totalReceive.toFixed(2)} USDT
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className={`w-full cursor-pointer  py-3 px-4 rounded-lg font-medium transition-colors ${
                    validateForm()
                      ? "bg-green-500 hover:bg-green-600 text-white"
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
      )}
    </div>
  );
}
