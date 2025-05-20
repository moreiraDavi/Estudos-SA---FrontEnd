import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./FiltroConcursos.module.css";

const estados = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
  "MT", "MS", "MG", "PA", "PB", "PE", "PI", "PR", "RJ", "RN",
  "RS", "RO", "RR", "SC", "SP", "SE", "TO"
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
    <div className={styles.container}>
      <h2 className={styles.titulo}>Filtro por Estado</h2>

      <div className={styles.botoesEstados}>
        {estados.map((uf) => (
          <button
            key={uf}
            onClick={() => alternarEstado(uf)}
            className={`${styles.botaoEstado} ${
              selecionados.includes(uf) ? styles.selecionado : ""
            }`}
          >
            {uf}
          </button>
        ))}
      </div>

      <h3 className={styles.subtitulo}>Concursos Abertos:</h3>
      <ul className={styles.listaConcursos}>
        {concursos.map((c) => (
          <li key={c.id}>
            <strong>{c.name}</strong> — {c.estado} — Prova: {c.dataProva}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FiltroConcursos;