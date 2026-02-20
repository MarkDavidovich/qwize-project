import "./App.css";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import { AuthProvider } from "./auth/AuthProvider";
import { Navbar } from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";
import Leaderboards from "./pages/Leaderboards/Leaderboards";
import ProtectedRoute from "./auth/ProtectedRoute";
import Quiz from "./pages/Quiz/Quiz";
import { AnsweringProvider } from "./store/AnsweringProvider";

function App() {
  const [authReady, setAuthReady] = useState(null);

  return (
    <>
      <AuthProvider
        onAuthReady={() => {
          setAuthReady(true);
        }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/leaderboards"
            element={
              <ProtectedRoute>
                <Leaderboards />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz/:difficulty/:amount"
            element={
              <ProtectedRoute>
                <AnsweringProvider>
                  <Quiz />
                </AnsweringProvider>
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
