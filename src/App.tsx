import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoutes";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute/UnauthenticatedRoute";
import { MerchantLayout } from "./layout/MerchantLayout/MerchantLayout";
import { SupportLayout } from "./layout/SupportLayout/SupportLayout";
import { ActivesPage } from "./pages/ActivesPage/ActivesPage";
import LoginPage from "./pages/Authehicate/LoginPage/LoginPage";
import RegisterPage from "./pages/Authehicate/RegisterPage/RegisterPage";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import SupportDashboard from "./pages/SupportDashboard/SupportDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UnauthenticatedRoute />}>
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

        {/* Защищённые роуты */}
        <Route element={<ProtectedRoute />}></Route>

        {/* Можно добавить редирект на /login или errorboundary для всех остальных */}
        {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
