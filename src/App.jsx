import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

// components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// pages
import Cadastro from "./pages/cadastro/Cadastro";
import Login from "./pages/login/Login";
import FiltroConcursos from "./pages/filtro/FiltroConcursos";
import About from "./pages/sobre/About";
import Home from "./pages/home/Home";
import Rotinas from "./pages/Rotinas/Rotinas";
import Preferencias from "./pages/preferencias/Preferencias";
import Rotina from "./pages/Rotina/Rotina";

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/concursos" element={<FiltroConcursos />} />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={isLoggedIn ? <Navigate to="/" /> : <Cadastro />}
          />
          <Route
            path="/rotinas"
            element={isLoggedIn ? <Rotinas /> : <Navigate to="/login" />}
          />
          <Route
            path="/rotinas/create"
            element={isLoggedIn ? <Preferencias /> : <Navigate to="/login" />}
          />
          <Route
            path="/rotina/:concursoId"
            element={isLoggedIn ? <Rotina /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
