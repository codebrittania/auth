export const MobileMenu = () => {
  return (
    <nav
      id="mobile-menu"
      className="hidden sm:hidden px-4 py-3 space-y-2 bg-gray-50"
    >
      <a
        href="#"
        className="block py-2 px-2 font-medium text-gray-900 bg-gray-100 rounded-md"
      >
        Главная
      </a>
      <a
        href="#"
        className="block py-2 px-2 font-medium text-gray-600 hover:bg-gray-100 rounded-md"
      >
        Баланс
      </a>
      <a
        href="#"
        className="block py-2 px-2 font-medium text-gray-600 hover:bg-gray-100 rounded-md"
      >
        Сделки
      </a>
      <a
        href="#"
        className="block py-2 px-2 font-medium text-gray-600 hover:bg-gray-100 rounded-md"
      >
        Авторизация
      </a>
      <div className="py-2 px-2 flex items-center">
        <span className="font-medium text-sm">MaKO Merchant</span>
        <span className="ml-2 text-xs text-gray-500">Мой кабинет →</span>
      </div>
      <div className="py-2 px-2 flex items-center justify-between border-t border-gray-200 mt-2 pt-3">
        <span className="text-sm text-gray-600">USDT курс:</span>
        <span className="text-sm font-medium">1 USDT = 78.7 ₽</span>
      </div>
    </nav>
  );
};
