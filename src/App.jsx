import "./App.css";
import { Route, Routes, useLocation } from "react-router";
import HomePage from "./pages/HomePage";
import { Header } from "./components/fragments/Header";
import Footer from "./components/fragments/Footer";
import DetailProductPage from "./pages/DetailProductPage";
import LoginPage from "./pages/LoginPage";
import ProductManagementPage from "./pages/admin/ProductManagementPage";

function App() {
  const location = useLocation();

  return (
    <>
      {!location.pathname.startsWith("/admin") && <Header />}

      <Routes>
        <Route index element={<HomePage />} />
        <Route path="product/:productId" element={<DetailProductPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="about" element={<h1>About</h1>} />
        <Route path="admin/products" element={<ProductManagementPage />} />
        <Route
          path="*"
          element={
            <h1 className="text-6xl flex justify-center items-center min-h-screen">
              404 Not Found
            </h1>
          }
        />
      </Routes>

      {!location.pathname.startsWith("/admin") && <Footer />}
    </>
  );
}

export default App;
