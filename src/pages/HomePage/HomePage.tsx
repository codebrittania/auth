import { DashboardSection } from "./components/DashboardSection/DashboardSection";
import { TransactionsTable } from "./components/TranstactionsTable/TranstactionsTable";

export const HomePage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div id="toast-container" className="toast-container p-4 sm:p-6"></div>

      <div className="max-w-7xl mx-auto bg-white shadow-sm">
        <DashboardSection />

        <main className="px-4 sm:px-6 py-6">
          <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
            Платежи
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 sm:mb-8">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-4">За неделю</div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-lg sm:text-xl font-bold">261</div>
                  <div className="text-xs text-gray-500">Платежей</div>
                  <div className="mt-4">
                    <div className="text-lg sm:text-xl font-bold">123</div>
                    <div className="text-xs text-gray-500">
                      Платежей в обработке
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold">212</div>
                  <div className="text-xs text-gray-500">Успешных платежей</div>
                  <div className="mt-4">
                    <div className="text-lg sm:text-xl font-bold">24</div>
                    <div className="text-xs text-gray-500">
                      Отмененных платежей
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-4">За месяц</div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-lg sm:text-xl font-bold">5 620</div>
                  <div className="text-xs text-gray-500">Платежей</div>
                  <div className="mt-4">
                    <div className="text-lg sm:text-xl font-bold">125</div>
                    <div className="text-xs text-gray-500">
                      Платежей в обработке
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold">5 200</div>
                  <div className="text-xs text-gray-500">Успешных платежей</div>
                  <div className="mt-4">
                    <div className="text-lg sm:text-xl font-bold">350</div>
                    <div className="text-xs text-gray-500">
                      Отмененных платежей
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 sm:col-span-2 lg:col-span-1">
              <div className="text-sm text-gray-500 mb-4">За год</div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-lg sm:text-xl font-bold">65 498</div>
                  <div className="text-xs text-gray-500">Платежей</div>
                  <div className="mt-4">
                    <div className="text-lg sm:text-xl font-bold">125</div>
                    <div className="text-xs text-gray-500">
                      Платежей в обработке
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold">64 235</div>
                  <div className="text-xs text-gray-500">Успешных платежей</div>
                  <div className="mt-4">
                    <div className="text-lg sm:text-xl font-bold">1 000</div>
                    <div className="text-xs text-gray-500">
                      Отмененных платежей
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Последние сделки</h2>

            <div className="flex flex-col gap-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Поиск..."
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full text-sm"
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
                  <select className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Метод</option>
                    <option>СБП</option>
                    <option>Карта</option>
                    <option>Криптовалюта</option>
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
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium text-gray-700 mb-2 sm:mb-0 sm:mr-2">
                  Статус:
                </div>
                <div className="flex items-center">
                  <label className="flex items-center">
                    <span className="toggle-switch mr-2">
                      <input type="checkbox" defaultChecked />
                      <span className="toggle-slider"></span>
                    </span>
                    <span className="text-sm">Включено / Отключено</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="block sm:hidden">
              <div className="space-y-4">
                {[789884, 789885, 789886].map((id) => (
                  <div
                    key={id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          ID: {id}
                        </div>
                        <div className="text-xs text-gray-500">
                          2025-05-21 19:12:28
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-600 rounded text-xs">
                        Включено
                      </span>
                    </div>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center mr-4">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                          <span className="text-xs font-medium text-blue-600">
                            С
                          </span>
                        </div>
                        <span className="text-sm">СБП</span>
                      </div>
                      <span className="text-sm text-gray-600">SBP SBER</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-sm">+7 (999) 999 99-99</div>
                      <div className="text-sm">Мухамедович А.</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm text-red-500">
                          - 25. 2025 USDT
                        </div>
                        <div className="text-sm text-green-500">+ 2 400 ₽</div>
                      </div>
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
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <TransactionsTable />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 text-sm">
              <div className="text-gray-500 text-xs sm:text-sm mb-3 sm:mb-0">
                Showing data 1 to 6 of 256k entries
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
                <button className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md bg-green-600 text-white">
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
          </div>
        </main>
      </div>
    </div>
  );
};
