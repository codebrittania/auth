// src/layout/MobileMenu/MobileMenu.tsx
import { NavLink } from "react-router-dom";

export const MobileMenu = () => {
  return (
    <nav className="md:hidden px-4 py-3 bg-gray-50 border-t border-gray-200">
      <NavLink
        to="/"
        end
        className="block py-2 px-2 text-gray-500 hover:bg-gray-100 rounded"
      >
        Главная
      </NavLink>
      <NavLink
        to="/actives"
        className="block py-2 px-2 text-gray-500 hover:bg-gray-100 rounded"
      >
        Баланс
      </NavLink>

      <NavLink
        to="/profile"
      >
      <div className="flex items-center py-3 px-2 border-t cursor-pointer border-gray-200">
        <span className="text-sm font-medium text-gray-900">MaKO Merchant</span>
        <span className="ml-2 text-xs text-gray-500">Мой кабинет →</span>
      </div>
      </NavLink>

      <div className="flex justify-between items-center py-3 px-2 border-t border-gray-200">
        <span className="text-sm text-gray-500">USDT курс:</span>
        <span className="text-sm font-medium">1 USDT = 78.7 ₽</span>
      </div>
    </nav>
  );
};
