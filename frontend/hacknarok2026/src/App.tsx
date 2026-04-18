import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { HomePage } from "./HomePage";
import { DataProvider, useData } from "./DataContext";
import { ProjectPage } from "./ProjectPage";
import { AccountPage } from "./AccountPage";
import { useState } from "react";
import { AuthPopup } from "./components/AuthPopup";
import service from "./api";
import Login from "./assets/Login.png";
import type { User } from "./types";
const App = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);

  const { setLoggedInUser, loggedInUser } = useData();
  const handleLogin = (email: string, pass: string) => {
    console.log("Logowanie:", email, pass);

    service
      .login(email, pass)
      .then((user) => {
        setLoggedInUser(user.data);

        setIsAuthOpen(false);
      })
      .catch((er) => {
        alert("error");
      });
  };

  const handleRegister = (data: User) => {
    console.log("Rejestracja:", data);
    service.register(data);
    setIsAuthOpen(false);
  };
  return (
    <Router>
      <div className="flex flex-col bg-black min-h-screen">
        <AuthPopup
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onLogin={handleLogin}
          onRegister={handleRegister}
          isLoginView={isLoginView}
          setIsLoginView={setIsLoginView}
        />
        <div className="bg-gray flex px-70  0 py-5 shrink-0 text-[22px] font-seasons">
          <Link to="/" replace className="flex-1 font-bold text-4xl underlined">
            <p className=" font-light ">Repoviewer</p>
          </Link>

          {!loggedInUser && (
            <button
              onClick={() => {
                setIsAuthOpen(true);
              }}
            >
              <span onClick={() => setIsLoginView(true)} className="font-light">
                Sign in
              </span>{" "}
              |{" "}
              <span
                onClick={() => setIsLoginView(false)}
                className="font-bold underline "
              >
                Sign up
              </span>
            </button>
          )}
          {loggedInUser && (
            <Link to="/account">
              <img className="h-10" src={Login} />
            </Link>
          )}
        </div>
        <div className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/project" element={<ProjectPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
