import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./providers/ProtectedRoute/ProtectedRoutes";
import UnauthenticatedRoute from "./providers/UnauthenticatedRoute/UnauthenticatedRoute";
import { MerchantLayout } from "./layout/MerchantLayout/MerchantLayout";
import { SupportLayout } from "./layout/SupportLayout/SupportLayout";
import { ActivesPage } from "./pages/ActivesPage/ActivesPage";
import LoginPage from "./pages/Authehicate/LoginPage/LoginPage";
import RegisterPage from "./pages/Authehicate/RegisterPage/RegisterPage";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import SupportDashboard from "./pages/SupportDashboard/SupportDashboard";
import AdminDashboard from "./pages/AdminDashboard/admin-dashboard";
import { MerchantsPage } from "./pages/MerchantsPage/merchants";
import { GatewaysPage } from "./pages/GatewaysPage/GatewaysPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UnauthenticatedRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MerchantLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/actives" element={<ActivesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          <Route path="/support" element={<SupportLayout />}>
            <Route index element={<SupportDashboard />} />
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="merchants" element={<MerchantsPage />} />
            <Route path="gateways" element={<GatewaysPage />} />
          </Route>
        </Route>
      </Routes>

      {/* <Route element={<UnauthenticatedRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<MerchantLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/actives" element={<ActivesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          <Route path="/support" element={<SupportLayout />}>
            <Route index element={<SupportDashboard />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}></Route> */}

      {/* Можно добавить редирект на /login или errorboundary для всех остальных */}
      {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
    </BrowserRouter>
  );
}

export default App;
