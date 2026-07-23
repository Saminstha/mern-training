import { useState } from "react";

function useMockAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function login(): void {
    setIsAuthenticated(true);
  }

  function logout(): void {
    setIsAuthenticated(false);
  }

  return {
    isAuthenticated,
    login,
    logout,
  };
}

export default useMockAuth;