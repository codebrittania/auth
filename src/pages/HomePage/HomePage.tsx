import { useEffect } from "react";
import { cryptUraApi } from "../../api/CryptUraApi";
import { DashboardSection } from "./components/DashboardSection/DashboardSection";
import DashboardSummary from "./components/DashboardSummary/DashboardSummary";
import { TransactionsTable } from "./components/TranstactionsTable/TranstactionsTable";

export const HomePage = () => {
  useEffect(() => {
    const fetchKey = async () => {
      try {
        const response = await cryptUraApi.getApiKey();
        //@ts-ignore

        localStorage.setItem("api_key", response);
        // console.log(response);

        return response;
      } catch (err: any) {
        // if (err.response?.status === 403) {
        //   setError("Доступ запрещён");
        // } else {
        //   setError("Ошибка при получении API ключа");
        // }
      }
    };

    fetchKey();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div id="toast-container" className="toast-container p-4 sm:p-6"></div>

      <div className="max-w-7xl mx-auto bg-white shadow-sm">
        <DashboardSection />

        <main className="px-4 sm:px-6 py-6">
          <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
            Платежи
          </h1>

          <DashboardSummary />

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Последние сделки</h2>

            {/* <div className="flex flex-col gap-4 mb-6">
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
            </div> */}
            {/* <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 p-3 bg-gray-50 rounded-lg">
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
              </div> */}

            <div className="hidden md:hidden">
              <div className="space-y-4">
                {/* {[789884, 789885, 789886].map((id) => (
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
                        <div className="w-6 h-6 rounded-full  flex items-center justify-center mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="37"
                            height="44"
                            viewBox="0 0 42 49"
                            fill="none"
                          >
                            <path
                              d="M12.1929 24.4954L5.86836 28.1832L0 38.4605L23.9386 24.4954H12.1929Z"
                              fill="#874691"
                            />
                            <path
                              d="M30.263 13.9651L23.9384 17.653L18.0701 27.9302L41.9997 13.9651H30.263Z"
                              fill="#DA1844"
                            />
                            <path
                              d="M23.9384 10.2773L18.0701 0V21.0697V27.9303V49L23.9384 38.7227V10.2773Z"
                              fill="#F9B229"
                            />
                            <path
                              d="M18.0701 0L23.9384 10.2773L30.263 13.9651H41.9997L18.0701 0Z"
                              fill="#F07F1A"
                            />
                            <path
                              d="M18.0701 21.0696V48.9999L23.9384 38.7226V31.3378L18.0701 21.0696Z"
                              fill="#72B22C"
                            />
                            <path
                              d="M30.263 35.0347L23.9384 38.7225L18.0701 48.9998L41.9997 35.0347H30.263Z"
                              fill="#00743E"
                            />
                            <path
                              d="M0 10.5303V38.4605L5.86836 28.1833V20.8075L0 10.5303Z"
                              fill="#5F5A94"
                            />
                            <path
                              d="M18.0702 21.0697V21.0787L0 10.5303L5.86836 20.8075L30.2632 35.0348H41.9999L18.0702 21.0697Z"
                              fill="#0D90CD"
                            />
                          </svg>
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
                ))} */}
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
                        <div className="w-6 h-6 rounded-full  flex items-center justify-center mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="37"
                            height="44"
                            viewBox="0 0 42 49"
                            fill="none"
                          >
                            <path
                              d="M12.1929 24.4954L5.86836 28.1832L0 38.4605L23.9386 24.4954H12.1929Z"
                              fill="#874691"
                            />
                            <path
                              d="M30.263 13.9651L23.9384 17.653L18.0701 27.9302L41.9997 13.9651H30.263Z"
                              fill="#DA1844"
                            />
                            <path
                              d="M23.9384 10.2773L18.0701 0V21.0697V27.9303V49L23.9384 38.7227V10.2773Z"
                              fill="#F9B229"
                            />
                            <path
                              d="M18.0701 0L23.9384 10.2773L30.263 13.9651H41.9997L18.0701 0Z"
                              fill="#F07F1A"
                            />
                            <path
                              d="M18.0701 21.0696V48.9999L23.9384 38.7226V31.3378L18.0701 21.0696Z"
                              fill="#72B22C"
                            />
                            <path
                              d="M30.263 35.0347L23.9384 38.7225L18.0701 48.9998L41.9997 35.0347H30.263Z"
                              fill="#00743E"
                            />
                            <path
                              d="M0 10.5303V38.4605L5.86836 28.1833V20.8075L0 10.5303Z"
                              fill="#5F5A94"
                            />
                            <path
                              d="M18.0702 21.0697V21.0787L0 10.5303L5.86836 20.8075L30.2632 35.0348H41.9999L18.0702 21.0697Z"
                              fill="#0D90CD"
                            />
                          </svg>
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
          </div>
        </main>
      </div>
    </div>
  );
};
