import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import Navbar from "./components/Header/Navbar";
import { app } from "./firebase/firebaseConfig";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <div>
      <HashRouter>
        <UserProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/login" element={<LoginView />} />
            <Route path="/register" element={<RegisterView />} />
          </Routes>
        </UserProvider>
      </HashRouter>
    </div>
  );
}

export default App;
