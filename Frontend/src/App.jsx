import Login from "./pages/Login.jsx";
import { Navigate, Route, Routes } from "react-router-dom";
import UserRegister from "./pages/UserRegister.jsx";
import ActiveProducts from "./pages/ActiveProducts.jsx";
import ProtectedRoute from "./components/Routes/ProtectedRoute.jsx";
import UnProtectedRoute from "./components/Routes/UnProtectedRoute.jsx";
import ShopCart from "./pages/ShopCart.jsx";
import History from "./pages/History.jsx";
import HistoryDetail from "./pages/HistoryDetail.jsx";
import AllProducts from "./pages/AllProducts.jsx";
import CreateProduct from "./pages/CreateProduct.jsx";
import UpdateProduct from "./pages/UpdateProduct.jsx";
import Brand from "./pages/Brand.jsx";
import Category from "./pages/Category.jsx";
import Order from "./pages/Order.jsx";
import Users from "./pages/Users.jsx";
import OperatorCreateUser from "./pages/OperatorCreateUser.jsx";
import { createTheme, colors, ThemeProvider } from "@mui/material";
const theme = createTheme({
  palette: {
    primary: { main: colors.blueGrey[500] },
    secondary: { main: colors.grey[600] },
    success: { main: colors.green["700"], light: colors.green[400] },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route exact path="/adminProduct" element={<AllProducts />}></Route>
          <Route exact path="/productForm" element={<CreateProduct />}></Route>
          <Route
            exact
            path="/editProduct/:id"
            element={<UpdateProduct />}
          ></Route>
          <Route exact path="/brands" element={<Brand />}></Route>
          <Route exact path="/categories" element={<Category />}></Route>
          <Route exact path="/orders" element={<Order />}></Route>
          <Route exact path="/users" element={<Users />}></Route>
          <Route
            exact
            path="/operatorCreateUser/:id"
            element={<OperatorCreateUser />}
          ></Route>
          <Route
            exact
            path="/operatorCreateUser"
            element={<OperatorCreateUser />}
          ></Route>
          <Route
            exact
            path="/productCatalogue"
            element={<ActiveProducts />}
          ></Route>
          <Route exact path="/shopCart" element={<ShopCart />}></Route>
          <Route exact path="/orderHistory" element={<History />}></Route>
          <Route
            exact
            path="/order/detail/:id"
            element={<HistoryDetail />}
          ></Route>
        </Route>
        <Route element={<UnProtectedRoute />}>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/userRegister" element={<UserRegister />}></Route>
        </Route>
        <Route exact path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
