import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [userRole, setUserRole] = useState("");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API = "https://api.neohospital.com";

  const authorizationToken = token ? `Bearer ${token}` : "";

  // Store Token
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  // Logout
  const logoutUser = () => {
    setToken("");
    setUser(null);
    setUserRole("");
    localStorage.removeItem("token");
  };

  // Authenticate User
  const userAuthentication = async () => {
    // No token => don't call API
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(`${API}/api/auth/user`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();

        setUser(data.userData);
        setUserRole(data.userData.username);
        setError(null);
      } else {
        // Invalid/Expired Token
        logoutUser();
        setError("Session expired. Please login again.");
      }
    } catch (error) {
      logoutUser();
      setError("Unable to authenticate user.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    userAuthentication();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!user,
        storeTokenInLS,
        logoutUser,
        user,
        userRole,
        authorizationToken,
        isLoading,
        error,
        API,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);

  if (!authContextValue) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return authContextValue;
};
