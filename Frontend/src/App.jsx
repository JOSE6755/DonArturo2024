import Login from "./pages/Login.jsx";
import { Route, Routes } from "react-router-dom";
import UserRegister from "./pages/UserRegister.jsx";
import ActiveProducts from "./pages/ActiveProducts.jsx";
import ProtectedRoute from "./components/Routes/ProtectedRoute.jsx";
import UnProtectedRoute from "./components/Routes/UnProtectedRoute.jsx";
import ShopCart from "./pages/ShopCart.jsx";
import History from "./pages/History.jsx";
import HistoryDetail from "./pages/HistoryDetail.jsx";
function App() {
  return (
    <Routes>
      <Route element={<UnProtectedRoute />}>
        <Route exact path="/" element={<Login />}></Route>
        <Route exact path="/userRegister" element={<UserRegister />}></Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route exact path="/home" element={<ActiveProducts />}></Route>
        <Route exact path="/shopCart" element={<ShopCart />}></Route>
        <Route exact path="/orderHistory" element={<History />}></Route>
        <Route
          exact
          path="/order/detail/:id"
          element={<HistoryDetail />}
        ></Route>
      </Route>
    </Routes>
  );
}

export default App;
