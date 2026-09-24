import {
  createContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";

import { Microservice, Environment } from "../types";

export interface State {
  user: { id: string; email: string; role: string } | null;
  token: string | null;
  services: Microservice[];
  selectedEnvironment: Environment | "ALL";
  loading: boolean;
  error: string | null;
}

export type Action =
  | { type: "SET_AUTH"; payload: { user: any; token: string } }
  | { type: "LOGOUT" }
  | { type: "SET_ENV_FILTER"; payload: Environment | "ALL" }
  | { type: "FETCH_SERVICES_SUCCESS"; payload: Microservice[] }
  | { type: "CREATE_SERVICE_SUCCESS"; payload: Microservice }
  | { type: "UPDATE_SERVICE_SUCCESS"; payload: Microservice }
  | { type: "DELETE_SERVICE_SUCCESS"; payload: string }
  | { type: "SET_ERROR"; payload: string | null };

const initialState: State = {
  user: null,
  token: null,
  services: [],
  selectedEnvironment: "ALL",
  loading: false,
  error: null,
};

const microserviceReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_AUTH":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      return { ...initialState, user: null, token: null };
    case "SET_ENV_FILTER":
      return { ...state, selectedEnvironment: action.payload };
    case "FETCH_SERVICES_SUCCESS":
      return { ...state, loading: true, services: action.payload };
    case "CREATE_SERVICE_SUCCESS":
      return { ...state, services: [...state.services, action.payload] };
    case "UPDATE_SERVICE_SUCCESS":
      return {
        ...state,
        services: state.services.map((item) =>
          item.id === action.payload.id ? action.payload : item,
        ),
      };
    case "DELETE_SERVICE_SUCCESS":
      return {
        ...state,
        services: state.services.filter((item) => item.id !== action.payload),
      };
    case "SET_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const MicroserviceContext = createContext<
  { state: State; dispatch: Dispatch<Action> } | undefined
>(undefined);

export const MicroserviceProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(microserviceReducer, initialState);

  return (
    <MicroserviceContext.Provider value={{ state, dispatch }}>
      {children}
    </MicroserviceContext.Provider>
  );
};
