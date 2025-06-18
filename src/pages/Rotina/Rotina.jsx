import React, { use, useEffect, useState } from "react";
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
  const { concursoId, preferenciaId } = useParams();
  const [rotinas, setRotinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [concursoNome, setConcursoNome] = useState("");
  const [turnoSelecionado, setTurnoSelecionado] = useState("manha");

  useEffect(() => {
    const fetchRotinas = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/rotinas?concursoId=${concursoId}`);
        setRotinas(data.rotinas);
        setIndiceAtual(0);

        if (data.rotinas && data.rotinas.length > 0) {
          const res = await api.get(`/concursos/nome/${concursoId}`);
          setConcursoNome(res.data.name);
          console.log("Concurso Nome:", res.data.name);
        } else {
          setConcursoNome("Concurso não encontrado");
        }
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

  let horarios = [];
  if (turnoSelecionado === "manha") {
    horarios = [
      "07:00 - 12:00",
      "07:00 - 12:00",
      "07:00 - 12:00",
      "07:00 - 12:00",
      "07:00 - 12:00",
      "07:00 - 12:00",
      "07:00 - 12:00",
    ];
  } else if (turnoSelecionado === "tarde") {
    horarios = [
      "13:00 - 18:00",
      "13:00 - 18:00",
      "13:00 - 18:00",
      "13:00 - 18:00",
      "13:00 - 18:00",
      "13:00 - 18:00",
      "13:00 - 18:00",
    ];
  } else if (turnoSelecionado === "noite") {
    horarios = [
      "19:00 - 22:00",
      "19:00 - 22:00",
      "19:00 - 22:00",
      "19:00 - 22:00",
      "19:00 - 22:00",
      "19:00 - 22:00",
      "19:00 - 22:00",
    ];
  }

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
              Semana {indiceAtual + 1} de {rotinas.length}
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
        <div className={styles.concursotext}>
          <h2>
            Concurso: <span> </span>
            <span className={styles.concursoName}>{concursoNome}</span>
          </h2>
          <label>
            Selecione o Turno:&nbsp;
            <select
              value={turnoSelecionado}
              onChange={(e) => setTurnoSelecionado(e.target.value)}
            >
              <option value="manha">Manhã</option>
              <option value="tarde">Tarde</option>
              <option value="noite">Noite</option>
            </select>
          </label>
        </div>
      </div>
      <div className={styles.rotinaContainer}>
        <div className={styles.headerGrid}>
          {diasSemana.map((dia) => (
            <div key={dia} className={styles.diaHeader}>
              {dia}
            </div>
          ))}
        </div>

        <div className={styles.conteudoGrid}>
          {diasSemana.map((dia, idx) => (
            <div
              key={dia}
              className={`${styles.diaConteudo} ${
                idx === 6 ? styles.ultimoDia : ""
              }`}
            >
              <div className={styles.blocoHorario}>
                <p>{horarios[idx]}</p>
              </div>
              <div className={styles.blocoConteudo}>
                <p>{rotina[`conteudo${idx + 1}`] || "-"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
