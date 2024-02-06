import { createContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        user: null,
        isAuthenticated: false,
      };
    default:
      throw new Error("Unknown action!");
  }
}

const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState);

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function login(email, password) {
  if (email === FAKE_USER.email && password === FAKE_USER.password) {
    dispatch({ type: "login", payload: FAKE_USER });
  }
}

function logout() {
  dispatch({ type: "logout" });
}

function AuthProvider({ children }) {
  return (
    // For simulating real-world auth mechanism, we don't pass dispatch here
    <AuthContext.Provider value={(login, logout, user, isAuthenticated)}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
