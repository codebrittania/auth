import { useEffect, useState } from "react";
import { cryptUraApi } from "../../../../api/CryptUraApi";

export const DashboardSection = () => {
  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const data = await cryptUraApi.getBalance();
        setBalance(data);
      } catch (err: any) {
        setError("Ошибка при получении баланса");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);
  return (
    <div className="mx-4 sm:mx-6 mt-6 mb-6">
      <div className="bg-gradient-to-br from-green-900 via-green-800 to-black rounded-xl p-6 text-white ">
        <h2 className="text-xl font-bold mb-4">Дашборд</h2>
        {balance}
        {error}
        <div className="flex space-x-1 mb-6">
          <button className="px-4 py-2 bg-white/20  rounded-lg text-sm font-medium">
            Deposit USDT
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white">
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
            78 987 <span className="text-gray-300">USDT</span>
          </div>
          <div className="text-sm text-gray-300">USDT Wallet</div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
              2 300 <span className="text-gray-300">USDT</span>
            </div>
            <div className="text-xs text-gray-300">RUB Hold</div>
          </div>

          <div className="bg-white/10  rounded-lg p-4">
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
              860 <span className="text-gray-300">USDT</span>
            </div>
            <div className="text-xs text-gray-300">RUB In</div>
          </div>

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
              2 300 <span className="text-gray-300">USDT</span>
            </div>
            <div className="text-xs text-gray-300">RUB Out</div>
          </div>

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
              2 300 <span className="text-gray-300">USDT</span>
            </div>
            <div className="text-xs text-gray-300">USDT Hold</div>
          </div>
        </div>
      </div>
    </div>
  );
};
