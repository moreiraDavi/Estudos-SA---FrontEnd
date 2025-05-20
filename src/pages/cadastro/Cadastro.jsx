import { useRef } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import styles from './Cadastro.module.css'

const Cadastro = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("usuarios/cadastro", {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      alert("Usuário Cadastrado com sucesso");
    } catch (error) {
      alert("Erro ao cadastrar o Usuário");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="2xl font-bold mb-6 text-center text-gray-800">Cadastro</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-7">
        <input
          ref={nameRef}
          type="text"
          placeholder="nome"
          className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none"
        />
        <input
          ref={emailRef}
          type="email"
          placeholder="email"
          className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none"
        />
        <input
          ref={passwordRef}
          type="password"
          placeholder="senha"
          className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none"
        />
        <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400">
          Cadastrar
        </button>
      </form>
      <div className="text-center mt-7">
        <Link to="/login" className="text-blue-700 hover:underline">
          Ir para Login
        </Link>
      </div>
    </div>
  );
};

export default Cadastro;
