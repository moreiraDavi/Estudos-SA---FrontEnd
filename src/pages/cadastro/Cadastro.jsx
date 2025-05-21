import { useRef } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import styles from './Cadastro.module.css'

const Cadastro = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("usuarios/cadastro", {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      alert("Usuário Cadastrado com sucesso");
    } catch (error) {
      alert("Erro ao cadastrar o Usuário");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Cadastro</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          ref={nameRef}
          type="text"
          placeholder="nome"
          className={styles.input}
        />
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
        <button className={styles.button}>
          Cadastrar
        </button>
      </form>
      <div style={{ textAlign: "center", marginTop: "28px"}}>
        <Link to="/login" className={styles.link}>
          Ir para Login
        </Link>
      </div>
    </div>
  );
};

export default Cadastro;