export const NotificationDropdown = () => {
  return (
    <div
      id="notification-dropdown"
      className="bg-white absolute right-0 mt-2 w-80  rounded-md shadow-lg z-50 overflow-hidden"
    >
      <div className="p-3 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-sm font-medium">Уведомления</h3>
        <div className="flex space-x-2">
          <button
            id="notification-settings-btn"
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
          <button
            id="mark-all-read"
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="max-h-72 overflow-y-auto">
        <a
          href="#"
          className="block p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 h-2 w-2 mt-1 bg-blue-500 rounded-full"></div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                Новый платеж получен
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Вы получили платеж на сумму 2 002 RUB
              </p>
              <p className="text-xs text-gray-400 mt-1">2 минуты назад</p>
            </div>
          </div>
        </a>
        <a
          href="#"
          className="block p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 h-2 w-2 mt-1 bg-blue-500 rounded-full"></div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                Подтверждение транзакции
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Транзакция #453543 была подтверждена
              </p>
              <p className="text-xs text-gray-400 mt-1">15 минут назад</p>
            </div>
          </div>
        </a>
        <a
          href="#"
          className="block p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 h-2 w-2 mt-1 bg-blue-500 rounded-full"></div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                Обновление системы
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Система CryptUra была обновлена до версии 2.4.0
              </p>
              <p className="text-xs text-gray-400 mt-1">1 час назад</p>
            </div>
          </div>
        </a>
      </div>
      <div className="p-2 text-center border-t border-gray-100">
        <a href="#" className="text-xs text-blue-600 hover:text-blue-800">
          Показать все уведомления
        </a>
      </div>
    </div>
  );
};
