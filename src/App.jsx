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
import PlayerStatsProvider from "./store/PlayerStatsProvider";
import Quiz from "./pages/Quiz/Quiz";

import { useLocation } from "react-router-dom";

function App() {
  const [authReady, setAuthReady] = useState(null);

  const location = useLocation();
  const hideNavBar = location.pathname.includes("/quiz");

  return (
    <>
      <AuthProvider
        onAuthReady={() => {
          setAuthReady(true);
        }}
      >
        <PlayerStatsProvider>
          {!hideNavBar && <Navbar />}
          <div className="container">
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
              <Route path="/quiz/:difficulty/:amount" element={<Quiz />} />
            </Routes>
          </div>
          <Footer />
        </PlayerStatsProvider>
      </AuthProvider>
    </>
  );
}

export default App;
