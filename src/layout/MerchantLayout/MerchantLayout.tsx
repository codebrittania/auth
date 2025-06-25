import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../../index.css";
import { useAuthStore } from "../../stores/AuthStore";
import { MobileMenu } from "./MobileMenu/MobileMenu";
import { NotificationDropdown } from "./NotificationDropdown/NotificationDropdown";
import { cryptUraApi } from "../../api/CryptUraApi";

export const MerchantLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [rate, setRate] = useState<any>({});

  const activeClass = "font-medium text-black";
  const inactiveClass = "font-medium text-gray-400";

  const { username } = useAuthStore();

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const response = await cryptUraApi.rateUsdtRub();
        setRate(response); // предполагаем, что в response есть поле `rate`
      } catch (err: any) {
        console.error("Rate fetch error:", err);
      }
    };

    fetchRate();
  }, []);

  return (
    <>
      <div className="max-w-7xl mx-auto bg-white shadow-sm">
        <header className="border-b border-gray-200 max-w-7xl ">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4">
            <div className="flex items-center">
              <NavLink to="/" end>
                <div className="font-bold text-xl">
                  <img src="/logo.svg" alt="CryptUra Logo" />
                </div>
              </NavLink>
              <nav className="hidden sm:flex space-x-6 ml-8 md:ml-12">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    isActive ? activeClass : inactiveClass
                  }
                >
                  Главная
                </NavLink>
                <NavLink
                  to="/actives"
                  className={({ isActive }) =>
                    isActive ? activeClass : inactiveClass
                  }
                >
                  Баланс
                </NavLink>
              </nav>
            </div>

            <div className="flex items-center space-x-4  ">
              <div className="hidden sm:flex items-center mr-4 px-3 py-1 bg-gray-100 rounded-lg">
                <div className="text-sm">
                  <span className="text-gray-600">1 USDT =</span>
                  <span className="font-medium text-gray-900 ml-1">{rate.ask} ₽</span>
                </div>
              </div>

              <NavLink to="/profile">
                <div className="flex items-center">
                  <img
                    src="../avatar.png"
                    alt="Profile"
                    className="w-9 h-9 rounded-full mr-2"
                  />
                  <div className="hidden md:block">
                    <div className="flex items-center">
                      <span className="font-medium  text-sm">
                        {username}{" "}
                        <span className="text-gray-500 ">Merchant</span>
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">Мой кабинет →</div>
                  </div>
                </div>
              </NavLink>
              <div className="relative">
                <button
                  id="notification-bell"
                  className="relative focus:outline-none cursor-pointer"
                  aria-label="Notifications"
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  {/* <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    3
                  </span> */}
                </button>
                <button
                  id="mobile-menu-button"
                  className="ml-6 mr-2 md:hidden"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>

                {notificationsOpen && <NotificationDropdown />}
              </div>
            </div>
          </div>
          {mobileMenuOpen && <MobileMenu rate={rate.ask} />}
        </header>

        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};
