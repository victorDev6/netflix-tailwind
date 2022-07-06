import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProtectedRoutes from "./components/ProtectedRoutes";
import AuthContextProvider from "./context/AuthContext";
import Account from "./pages/Account";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <>
      <AuthContextProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={ <Login /> } />
          <Route path="/signup" element={ <SignUp /> } />
          <Route path="/account" element={ <ProtectedRoutes><Account /></ProtectedRoutes> } />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
