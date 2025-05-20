import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

// components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// pages
import Cadastro from "./pages/cadastro/Cadastro";
import Login from "./pages/login/Login";
import FiltroConcursos from "./pages/filtro/FiltroConcursos"
import About from "./pages/sobre/About";
import Home from "./pages/home/Home";



function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/sobre" element={<About/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Cadastro/>}/>
            <Route path="/concursos" element={<FiltroConcursos/>}/>
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
