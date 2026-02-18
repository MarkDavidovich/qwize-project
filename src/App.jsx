import "./App.css";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { Route, Routes } from "react-router-dom";

function App() {
  return <>
  <Routes>
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
  </Routes>
  
  </>;
}

export default App;
