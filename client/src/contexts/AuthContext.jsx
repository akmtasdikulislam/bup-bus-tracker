import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { AuthContext } from "../hooks/useAuth";
import { auth } from "../lib/firebase";
import authService from "../services/authService";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [backendUser, setBackendUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Get stored user data from localStorage
          const storedUser = localStorage.getItem('backendUser');
          if (storedUser) {
            setBackendUser(JSON.parse(storedUser));
          }
          setUser(firebaseUser);
        } catch (error) {
          console.error('Error loading user data:', error);
          setUser(firebaseUser);
        }
      } else {
        setUser(null);
        setBackendUser(null);
        localStorage.removeItem('backendUser');
        localStorage.removeItem('authToken');
      }
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const result = await authService.login(email, password);
      localStorage.setItem('backendUser', JSON.stringify(result.backendUser));
      localStorage.setItem('authToken', result.token);
      setBackendUser(result.backendUser);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setBackendUser(null);
      localStorage.removeItem('backendUser');
      localStorage.removeItem('authToken');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    user,
    backendUser,
    loading,
    login,
    logout,
    getCurrentUser: () => authService.getCurrentUser(),
    getIdToken: () => authService.getIdToken(),
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
