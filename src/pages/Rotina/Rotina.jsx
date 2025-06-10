import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import styles from "./Rotina.module.css";

const diasSemana = [
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
  "Domingo",
];

export default function Rotina() {
  const { concursoId } = useParams();
  const [rotinas, setRotinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [indiceAtual, setIndiceAtual] = useState(0);

  useEffect(() => {
    const fetchRotinas = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/rotinas?concursoId=${concursoId}`);
        setRotinas(data.rotinas);
        setIndiceAtual(0);
      } catch (err) {
        setRotinas([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRotinas();
  }, [concursoId]);

  if (loading) return <p>Carregando…</p>;
  if (rotinas.length === 0)
    return <p>Nenhuma rotina encontrada para este concurso.</p>;

  const rotina = rotinas[indiceAtual];

  return (
    <div>
      <div className={styles.titulo}>
        <div className={styles.botoes}>
          <button
            onClick={() => setIndiceAtual((i) => i - 1)}
            disabled={indiceAtual === 0}
            className={styles.btn}
          >
            ←
          </button>
          <div className={styles.tituloRotina}>
            <h1>
              Rotina {indiceAtual + 1} de {rotinas.length}
            </h1>
          </div>
          <button
            onClick={() => setIndiceAtual((i) => i + 1)}
            disabled={indiceAtual === rotinas.length - 1}
            className={styles.btn}
          >
            →
          </button>
        </div>
      </div>
      <ul className={styles.diasSemana}>
        {diasSemana.map((dia) => (
          <li key={dia} style={{ fontWeight: "bold", fontSize: "1.2em" }}>
            {dia}
          </li>
        ))}
      </ul>
      <div className={styles.listaDia}>
        {diasSemana.map((dia, idx) => (
          <ul
            key={dia}
            className={
              idx === 6
                ? `${styles.listaRotina} ${styles.ultimoDia}` // aplica classe extra se for o último
                : styles.listaRotina
            }
          >
            <li>
              <p>{rotina[`conteudo${idx + 1}`] || "-"}</p>
            </li>
            <li>
              <p>11:50 - 16:00</p>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}
