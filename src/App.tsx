import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoutes";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute/UnauthenticatedRoute";
import AdminLayout from "./layout/AdminLayout/AdminLayout";
import LoginPage from "./pages/Authehicate/LoginPage/LoginPage";
import RegisterPage from "./pages/Authehicate/RegisterPage/RegisterPage";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UnauthenticatedRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Защищённые роуты */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<HomePage />} />
            {/* другие защищённые роуты здесь */}
          </Route>
        </Route>

        {/* Можно добавить редирект на /login для всех остальных */}
        {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
