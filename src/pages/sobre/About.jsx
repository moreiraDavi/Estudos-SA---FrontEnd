import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import styles from "./About.module.css";
import {
  FaFilter,
  FaClock,
  FaCalendarAlt,
  FaRegChartBar,
  FaLayerGroup,
  FaClipboardList,
} from "react-icons/fa";

const recursos = [
  {
    icone: <FaFilter size={30} />,
    titulo: "Filtro de Estados e Concursos",
    descricao:
      "Personalize seu plano de estudos com base no estado e exame específico para o qual você está se preparando.",
  },
  {
    icone: <FaClock size={30} />,
    titulo: "Horário",
    descricao:
      "Escolha quando você estuda melhor: manhã, tarde, noite ou madrugada.",
  },
  {
    icone: <FaCalendarAlt size={30} />,
    titulo: "Seleção de Dias",
    descricao:
      "Selecione quais dias da semana funcionam melhor para sua agenda.",
  },
  {
    icone: <FaLayerGroup size={30} />,
    titulo: "Duração Personalizável",
    descricao:
      "Planeje para curto ou longo prazo com agendas de 1 semana, 1 mês ou 3 meses.",
  },
  {
    icone: <FaClipboardList size={30} />,
    titulo: "Priorização de Disciplinas",
    descricao:
      "Nosso algoritmo prioriza as disciplinas mais importantes para seu exame específico.",
  },
  {
    icone: <FaRegChartBar size={30} />,
    titulo: "Acompanhamento de Progresso",
    descricao:
      "Acompanhe seu progresso conforme você conclui as sessões de estudo.",
  },
];

export default function Sobre() {
  
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  const handleClick = () => {
    if (isLoggedIn) {
      navigate("/rotinas/create");
    } else {
      navigate("/login");
      alert("Por favor, faça login para criar sua rotina de estudos.");
    }
  }

  return (
    <div className={styles.sobreWrapper}>
      <div className={styles.container}>
        <h1 className={styles.titulo}>
          Recursos <span>inteligentes</span> para o estudo eficaz
        </h1>
        <p className={styles.subtitulo}>
          Nosso planejador inteligente ajuda você a se preparar para exames
          públicos com planos de estudo personalizados, adaptados às suas
          necessidades.
        </p>

        <div className={styles.grid}>
          {recursos.map((item, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.icone}>{item.icone}</div>
              <h3 className={styles.cardTitulo}>{item.titulo}</h3>
              <p className={styles.cardDescricao}>{item.descricao}</p>
            </div>
          ))}
        </div>

        <div className={styles.botaoWrapper}>
          <button onClick={handleClick} className={styles.botao}>
            Crie sua Rotina
          </button>
        </div>
      </div>
    </div>
  );
}
