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

      
      navigate("/");
    } catch (error) {
      alert("Dados Incorretos.");
    }
  };

  return (
    <div className= {styles.loginPage}>
      <div>
      
      <h2 className= {styles.title}>Login</h2>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        
          
          <input
          ref={emailRef}
          type="email"
          placeholder="email"
          className={styles.input}
      />
        <input
          ref={passwordRef}
          type="password"
          placeholder="senha"
          className={styles.input}
        />
        <div className={styles.forgot}>
            <a href="#">Esqueceu a senha?</a>
          </div>
           
      
        <button type="submit" className={styles.loginbtn}>
          Logar
        </button>
      </form>
      <p className={styles.registerText}>
          Não tem conta , faça cadastro! <Link to="/">Registrar</Link>
        </p>
      <div className="">


      </div>
      </div>
    </div>
  );
};

export default Login;