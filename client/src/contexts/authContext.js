import {useState, useEffect, createContext} from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = () => {
    const user = localStorage.getItem('user');
    setCurrentUser(user);
    setIsLoading(false);
  }
  useEffect(() => {
    isAuthenticated();
  }, [])

  return <AuthContext.Provider value={{currentUser, isLoading}}>{children}</AuthContext.Provider>
}