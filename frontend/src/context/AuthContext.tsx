import {
  createContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

type AuthAction =
  | { type: "SET_AUTH"; payload: { user: any; token: string } }
  | { type: "LOGOUT" };

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SET_AUTH":
      localStorage.setItem("token", action.payload.token);
      return { ...state, token: action.payload.token, isAuthenticated: true };
    case "LOGOUT":
      localStorage.removeItem("token");
      return { ...state, token: null, isAuthenticated: false };
  }
};

export const AuthContext = createContext<
  { state: AuthState; dispatch: Dispatch<AuthAction> } | undefined
>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
