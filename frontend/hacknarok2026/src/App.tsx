import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { HomePage } from "./HomePage";
import { DataProvider } from "./DataContext";
import { ProjectPage } from "./ProjectPage";
import { AccountPage } from "./AccountPage";
const App = () => {
  return (
    <DataProvider>
      <Router>
        <div className="flex flex-col bg-black min-h-screen">
          <div className="bg-gray-500 flex px-40 py-5 shrink-0">
            <Link
              to="/"
              replace
              className="flex-1 font-bold text-3xl underlined"
            >
              <p className="">Twoja porownywarka</p>
            </Link>

            <Link to="/account" replace>
              <p className="">Konto</p>
            </Link>
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
    </DataProvider>
  );
};

export default App;
