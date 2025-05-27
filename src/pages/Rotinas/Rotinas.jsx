import { useState } from "react";
import styles from "./Rotinas.module.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Adicione esta linha

const Rotinas = () => {
  const navigate = useNavigate();
  const [pulse, setPulse] = useState(false);

  // Array de exemplo para mapear os cards
  const rotinas = [1, 2, 3, 4, 5];

  const handleClick = () => {
    setPulse(true);
    setTimeout(() => setPulse(false), 400); // duração igual ao animation
    navigate("/rotinas/create");
  };

  return (
    <div>
      <div className={styles.titulo}>
        <div className={styles.titulo__text}>
          <h1>Minhas Rotinas</h1>
          <span>
            Gerencie e acompanhe suas rotinas de preparação para concursos
          </span>
        </div>
        <div className={styles.titulo__btn}>
          <button
            className={`${styles.btn} ${pulse ? styles.btnPulse : ""}`}
            onClick={handleClick}
          >
            Criar Rotina
          </button>
          <p>Máx 6 por usuário</p>
        </div>
      </div>
      <div className={styles.rotinas}>
        <ul>
          {rotinas.map((num, idx) => (
            <motion.li
              key={num}
              className={styles.rotinas__li}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
            >
              <h2>Rotina {num}</h2>
              <p>Concurso</p>
              <p>Criado em</p>
              <div>
                <p>Data da Prova</p>
                <p>Data</p>
              </div>
              <div>
                <p>Sessões na semana</p>
                <p>Número de sessões</p>
              </div>
              <div>
                <p>Progresso de estudo</p>
                <p>Barra de Progresso</p>
                <p>
                  em progresso <span>30% Concluido</span>
                </p>
              </div>
              <div className={styles.btns}>
                <button className={styles.deletar}>Apagar</button>
                <button>Ver Rotina</button>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Rotinas;
