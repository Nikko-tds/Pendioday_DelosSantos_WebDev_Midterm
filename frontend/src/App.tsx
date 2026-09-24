import { ServiceProvider } from "./context/ServiceContext";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import { useContext } from "react";
import ServiceForm from "./components/ServiceForm";
import { AuthForm } from "./components/AuthForm";
import ServiceList from "./components/ServiceList";

const MainApp = () => {
  const authContext = useContext(AuthContext);

  const handleLogout = () => {
    authContext?.dispatch({ type: "LOGOUT" });
  };
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1>The Service Hub</h1>
        {authContext?.state.isAuthenticated && (
          <button className="bg-[#333]" onClick={handleLogout}>
            Sign Out
          </button>
        )}
      </div>

      {authContext?.state.isAuthenticated ? <ServiceForm /> : <AuthForm />}

      <hr className="mx-0 border-[#eee]" />
      <h2>Menu</h2>
      <ServiceList />
    </div>
  );
};


const App = () => {
  return (
    <ServiceProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </ServiceProvider>
  );
};

export default App;
