import Login from "./pages/Login.jsx";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />}></Route>
    </Routes>
  );
}

export default App;
