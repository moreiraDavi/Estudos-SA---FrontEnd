import styles from "./Home.module.css";

import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  return (
    <div className={styles.home}>
      <div className={styles.titulo}>
        <h1>DOMINE SUA PREPARAÇÃO PARA CONCURSOS PÚBLICOS !</h1>
        <p>
          Crie um plano de estudo personalizado, adaptado às suas necessidades e
          objetivos. Estude de forma mais inteligente, não mais difícil.
        </p>
      </div>

      <div className={styles.buttons}>
        <button onClick={() => {navigate("/login")}} className={styles.primary}>CRIE SUA AGENDA!</button>
        <button onClick={() => {navigate("/sobre")}} className={styles.secondary}>SOBRE NÓS</button>
        <button onClick={() => {navigate("/concursos")}} className={styles.primary}>CONSULTE CONCURSOS</button>
      </div>
    </div>
  );
};

export default Home;
