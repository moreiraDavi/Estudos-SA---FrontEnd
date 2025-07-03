import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./FiltroConcursos.module.css";

const estados = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
  "MT", "MS", "MG", "PA", "PB", "PE", "PI", "PR", "RJ", "RN",
  "RS", "RO", "RR", "SC", "SP", "SE", "TO", "NACIONAL"
];

function FiltroConcursos() {
  const [selecionados, setSelecionados] = useState([]);
  const [concursos, setConcursos] = useState([]);

  const alternarEstado = (uf) => {
    setSelecionados((prev) =>
      prev.includes(uf) ? prev.filter((e) => e !== uf) : [...prev, uf]
    );
  };

  useEffect(() => {
    const buscarConcursos = async () => {
      const query = selecionados.map((uf) => `estado=${uf}`).join("&");
      try {
        const res = await axios.get(`http://localhost:3000/concursos?${query}`);
        setConcursos(res.data);
      } catch (err) {
        console.error("Erro ao buscar concursos:", err);
      }
    };

    buscarConcursos();
  }, [selecionados]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.titulo}>Lista de Concursos Ativos</h1>
        <p className={styles.subtitulo}>
          Utilize nosso filtro de estados para visualizar concursos ativos no seu estado.
        </p>

        <div className={styles.filtros}>
          {estados.map((uf) => (
            <button
              key={uf}
              onClick={() => alternarEstado(uf)}
              className={`${styles.estadoBtn} ${
                selecionados.includes(uf) ? styles.selecionado : ""
              }`}
            >
              {uf}
            </button>
          ))}
        </div>

        <h3 className={styles.subtitulo}>Concursos Abertos:</h3>
        <div className={styles.grid}>
          {concursos.map((c) => (
            <div key={c.id} className={styles.card}>
              <h3 className={styles.nome}>{c.name}</h3>
              <p><strong>Banca:</strong> {c.banca}</p>
              <p><strong>Estado:</strong> {c.estado}</p>
              <p><strong>Data final das inscrições:</strong> {c.dataInscricaoFim}</p>
              <p><strong>Data da Prova:</strong> {c.dataProva}</p>
              <p><strong>Salário:</strong> {c.salario}</p>
              <p><strong>Número de vagas:</strong> {c.numVagas}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FiltroConcursos;
