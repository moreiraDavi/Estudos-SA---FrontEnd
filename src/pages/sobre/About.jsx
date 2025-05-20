import styles from './About.module.css'

const About = () => {
  return (
    <div>
      <div className={styles.aboutcontainer}>
        <h1>Recursos inteligentes para o estudo eficaz</h1>
        <p>
          Nosso planejador inteligente ajuda você a se preparar para exames
          públicos com planos de estudo personalizados, adaptados a suas
          necessidades
        </p>
      </div>
      <div className={styles.listarecursos}>
        <div className={styles.recurso}>
          <h2>Filtro de Estados e Concursos</h2>
          <p>Personalize seu plano de estudos com base no estado e exame específico para o qual você está se preparando.</p>
        </div>
        <div className={styles.recurso}>
          <h2>Horário</h2>
          <p>Escolha quando você estuda melhor: manhã, tarde, noite ou madrugada.</p>
        </div>
        <div className={styles.recurso}>
          <h2>Seleção de Dias</h2>
          <p>Selecione quais dias da semana funcionam melhor para sua agenda.</p>
        </div>
      </div>
      <div className={styles.listarecursos}>
        <div className={styles.recurso}>
          <h2>Duração Personalizavel</h2>
          <p>Planeje para curto ou longo prazo com agendas de 1 semana, 1 mês ou 3 meses.</p>
        </div>
        <div className={styles.recurso}>
          <h2>Priorização de disciplinas</h2>
          <p>Nosso algoritmo prioriza as disciplinas mais importantes para seu exame específico</p>
        </div>
        <div className={styles.recurso}>
          <h2>Acompanhamento de progresso</h2>
          <p>Acompanhe seu progresso conforme você conclui as sessões de estudo.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
