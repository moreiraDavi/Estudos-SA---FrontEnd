import React, { useState, useEffect } from "react";
import api from "../../services/api";
import styles from "./Preferencias.module.css";
import { useNavigate } from "react-router-dom";

const diasSemana = [
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
  "Domingo",
];

const turnos = [
  { id: "manha", label: "Manhã (6:00-12:00)" },
  { id: "tarde", label: "Tarde (12:00-18:00)" },
  { id: "noite", label: "Noite (18:00-23:00)" },
  { id: "madrugada", label: "Madrugada (00:00-3:00)" },
];

const duracoes = ["1", "2", "3", "4", "5"];

const Preferencias = () => {
  const navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const [selectedConcurso, setSelectedConcurso] = useState("");
  const [selectedDias, setSelectedDias] = useState([]);
  const [selectedDuracao, setSelectedDuracao] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api
      .get("/concursos/getOptions")
      .then((res) => setOptions(res.data))
      .catch(console.error);
  }, []);

  const toggleDia = (dia) => {
    setSelectedDias((prev) =>
      prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !selectedConcurso ||
      selectedDias.length === 0 ||
      !selectedTurno ||
      !selectedDuracao
    ) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const preferences = {
      concursoId: selectedConcurso,
      diasEstudo: selectedDias.length,
      duracao: selectedDuracao,
    };

    setLoading(true);
    try {
      await api.post("/preferencias/create-com-rotina", preferences);
      navigate("/rotinas");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Erro ao gerar rotina.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pagina}>
      <div className={styles.container}>
        {/* Botão de voltar restaura o original */}
        <button
          type="button"
          className={styles.voltar}
          onClick={() => navigate("/rotinas")}
          disabled={loading}
        >
          ←
        </button>

        <div className={styles.header}>
          <h1 className={styles.titulo}>Crie sua Rotina</h1>
          <p className={styles.descricao}>
            Personalize sua rotina conforme suas preferências
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {loading && (
            <div className={styles.loadingOverlay}>
              <p>Gerando rotinas, por favor aguarde…</p>
            </div>
          )}

          <div>
            <label>Selecione o concurso que deseja: </label>
            <select
              value={selectedConcurso}
              onChange={(e) => setSelectedConcurso(e.target.value)}
              disabled={loading}
            >
              <option value="">Selecione...</option>
              {options.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Selecione os dias de estudo: </label>
            <div className={styles.checkboxGroup}>
              {diasSemana.map((dia) => (
                <label key={dia}>
                  <input
                    type="checkbox"
                    checked={selectedDias.includes(dia)}
                    onChange={() => toggleDia(dia)}
                    disabled={loading}
                  />
                  {dia}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label>Duração da rotina: </label>
            <select
              value={selectedDuracao}
              onChange={(e) => setSelectedDuracao(e.target.value)}
              disabled={loading}
            >
              <option value="">Selecione…</option>
              {duracoes.map((d) => (
                <option key={d} value={d}>
                  {d} {d === "1" ? "semana" : "semanas"}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={styles.submitBtn}
          >
            {loading ? "Carregando…" : "Criar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Preferencias;