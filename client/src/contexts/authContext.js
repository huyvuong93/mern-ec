import { createContext } from "react";

const authContext = createContext({
  authenticated: false,
  user: null,
  setAuthenticated: (user) => {
    this.authenticated = true;
    this.user = user;
  }
});

export default authContext;