import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

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
        setIndiceAtual(0); // Sempre começa na primeira rotina
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
      <h1>
        Rotina {indiceAtual + 1} de {rotinas.length}
      </h1>
      <div>
        <strong>{rotina.nome || rotina.conteudo1}</strong>
        {/* Exemplo: mostrar 7 conteúdos e horários */}
        <ul>
          {[1, 2, 3, 4, 5, 6, 7].map((dia, idx) => (
            <li key={idx}>
              Conteúdo: {rotina[`conteudo${dia}`] || "-"}
              <br />
              Horário: {rotina[`horario${dia}`] || "-"}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
        <button
          onClick={() => setIndiceAtual((i) => i - 1)}
          disabled={indiceAtual === 0}
        >
          ← Anterior
        </button>
        <button
          onClick={() => setIndiceAtual((i) => i + 1)}
          disabled={indiceAtual === rotinas.length - 1}
        >
          Próxima →
        </button>
      </div>
    </div>
  );
}
