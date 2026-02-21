import { useNavigate } from "react-router";
import { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "../lib/supabase.js";

const AuthContext = createContext(null);

export function AuthProvider({ onAuthReady, children }) {
  const [loggedOnUser, setLoggedOnUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchActiveUser = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        setLoggedOnUser(data.user);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      } finally {
        onAuthReady();
      }
    };

    fetchActiveUser();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      setLoggedOnUser(data.user);
      console.log(`Logged in: ${data.user.email}`);
      navigate("/");
      return { success: true };
    } catch (err) {
      console.log(`Error: ${err.message}`);
      return { success: false, error: err.message };
    }
  };

  const handleRegister = async (email, password) => {
    const cleanEmail = email.trim().toLowerCase();

    try {
      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
      });

      if (error) {
        throw error;
      }

      console.log(`Registration successful!`);
      setLoggedOnUser(data.user);
      navigate("/");
      return { success: true };
    } catch (err) {
      console.log(`Error: ${err.message}`);
      return { success: false, error: err.message };
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setLoggedOnUser(null);
      navigate("/login");
      console.log("`Logged out successfully");
    } catch (err) {
      console.log(`Failed to log out! ${err.message}`);
    }
  };

  const userCtx = {
    loggedOnUser,
    handleLogin,
    handleRegister,
    handleLogout,
  };

  return <AuthContext value={userCtx}>{children}</AuthContext>;
}

export function useAuth() {
  return useContext(AuthContext);
}
