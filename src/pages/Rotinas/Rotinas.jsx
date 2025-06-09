import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../services/api";
import styles from "./Rotinas.module.css";

export default function Rotinas() {
  const navigate = useNavigate();
  const [preferencias, setPreferencias] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPreferencias = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/preferencias/getPreferencias");
        setPreferencias(data.preferencias || []);
      } catch (err) {
        if (err.response) {
          console.error(
            "Erro ao buscar preferências:",
            err.response.status,
            err.response.data
          );
        } else {
          console.error("Erro (sem response):", err.message);
        }
        setPreferencias(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPreferencias();
  }, []);

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
            className={styles.btn}
            onClick={() => navigate("/rotinas/create")}
            disabled={loading}
          >
            Criar Rotina
          </button>
          <p>Máx 6 por usuário</p>
        </div>
      </div>

      <div className={styles.rotinas}>
        {loading ? (
          <p>Carregando…</p>
        ) : preferencias === null ? (
          <p className={styles.error}>
            Não foi possível carregar suas preferências
          </p>
        ) : preferencias.length === 0 ? (
          <p>Você ainda não tem rotinas cadastradas.</p>
        ) : (
          <ul>
            {preferencias.map((pref, idx) => (
              <motion.li
                key={pref.id}
                className={styles.rotinas__li}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.3 }}
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 8px 32px -8px rgba(69,142,238,0.12)",
                  zIndex: 2,
                }}
              >
                <h2>{pref.concurso.name}</h2>
                <p>
                  <strong>Dias de estudo:</strong> {pref.diasEstudo}
                </p>
                <p>
                  <strong>Turno:</strong> {pref.turno}
                </p>
                <p>
                  <strong>Duração:</strong> {pref.duracao}{" "}
                  {pref.duracao === "1" ? "semana" : "semanas"}
                </p>
                <button onClick={() => navigate(`/rotina/${pref.concursoId}`)}>
                  Ver Rotina
                </button>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
