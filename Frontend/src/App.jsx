import Login from "./pages/Login.jsx";
import { Route, Routes } from "react-router-dom";
import UserRegister from "./pages/UserRegister.jsx";
function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />}></Route>
      <Route exact path="/userRegister" element={<UserRegister />}></Route>
    </Routes>
  );
}

export default App;
