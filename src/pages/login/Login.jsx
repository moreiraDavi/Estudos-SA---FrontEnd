import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import styles from './Login.module.css'

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data: token } = await api.post("usuarios/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      localStorage.setItem("token", token);

      alert("Login Ok");

      //  CONFIGURAR APOS CRIAÇÃO DA TELA DE PREFERENCIAS
      navigate("/");
    } catch (error) {
      alert("Dados Incorretos.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          ref={emailRef}
          type="email"
          placeholder="email"
        />
        <input
          ref={passwordRef}
          type="password"
          placeholder="senha"
        />
        <button>
          Logar
        </button>
      </form>
      <div>
        <Link to="/">
          Não tem conta, faça cadastro!
        </Link>
      </div>
    </div>
  );
};

export default Login;
