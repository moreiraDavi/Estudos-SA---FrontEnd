import React, { useState, useEffect } from "react";
import api from "../../services/api";
import styles from "./Preferencias.module.css";

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

const duracoes = [
  "1 semana",
  "2 semanas",
  "3 semanas",
  "4 semanas",
  "5 semanas",
];

const Preferencias = () => {
  const [options, setOptions] = useState([]);

  const [selectedConcurso, setSelectedConcurso] = useState("");
  const [selectedDias, setSelectedDias] = useState("");
  const [selectedTurno, setSelectedTurno] = useState("");
  const [selectedDuracao, setSelectedDuracao] = useState("");

  const [showTurnos, setShowTurnos] = useState(false);
  const [showDuracao, setShowDuracao] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setLoading(true);

        const response = await api.get("/concursos/getOptions");
        setOptions(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOptions();
  }, []);

  const toggleDia = (dia) => {
    setSelectedDias((prev) =>
      prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia]
    );
  };

  const handleSubmit = (e) => {
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
      concurso: selectedConcurso,
      dia: selectedDias,
      turno: selectedTurno,
      duracao: selectedDuracao,
    };

    console.log(preferences);
  };

  if (loading) return <div>Carregando...</div>;

  if (error) return <div>Erro: {error}</div>;

  return (
    <div className={styles.pagina}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.titulo}>Crie sua Rotina</h1>
          <p className={styles.descricao}>
            Personalize sua rotina conforme suas preferências
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Selecione o concurso que deseja: </label>
            <select
              id="select-opcoes"
              value={selectedConcurso}
              onChange={(e) => setSelectedConcurso(e.target.value)}
              disabled={loading || error}
            >
              <option value="">Selecione...</option>
              {options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
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
                  />
                  {dia}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label>Selecione o turno: </label>
            <select
              value={selectedTurno}
              onChange={(e) => setSelectedTurno(e.target.value)}
            >
              <option value="">Selecione um turno</option>
              {turnos.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label> Duração da rotina: </label>
            <select
              value={selectedDuracao}
              onChange={(e) => setSelectedDuracao(e.target.value)}
            >
              {duracoes.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Criar</button>
        </form>
      </div>
    </div>
  );
};

export default Preferencias;
