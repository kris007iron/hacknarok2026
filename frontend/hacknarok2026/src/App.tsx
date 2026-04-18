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
import LogIn from "./assets/Login.png";
import { useState } from "react";
import { AuthPopup } from "./components/AuthPopup";
import service from "./api";
const App = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { setLoggedInUser } = useData();
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

  const handleRegister = (data: any) => {
    console.log("Rejestracja:", data);
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
        />
        <div className="bg-[#EBEBEB] flex px-9  0 py-5 shrink-0">
          <Link to="/" replace className="flex-1 font-bold text-3xl underlined">
            <p className="">Twoja porownywarka</p>
          </Link>

          <button
            onClick={() => {
              setIsAuthOpen(true);
            }}
          >
            <img className="w-10" src={LogIn} />
          </button>
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
