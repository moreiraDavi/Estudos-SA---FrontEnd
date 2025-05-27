import React, { useState, useEffect } from "react";
import api from "../../services/api";

const Preferencias = () => {
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
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

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
    console.log("Opção selecionada:", e.target.value);
  };

  if (loading) return <div>Carregando...</div>;

  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      <form>
        <label>Selecione uma opção: </label>
        <select
          id="select-opcoes"
          value={selectedValue}
          onChange={handleChange}
          disabled={loading || error}
        >
          <option value="">Selecione...</option>
          {options.map((option) => (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
      </form>

      {selectedValue && (
        <div>
          <h3>Você selecionou: {selectedValue}</h3>
        </div>
      )}
    </div>
  );
};

export default Preferencias;
