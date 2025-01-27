import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registrar() {
  const [nome, setNome] = useState("");
  const [tamanho, setTamanho] = useState("");
  const [tipo, setTipo] = useState("");
  const [preco, setPreco] = useState("");
  const [cor, setCor] = useState("");
  const [marca, setMarca] = useState("");
  const [peso, setPeso] = useState("");

  const navigate = useNavigate();

  const registrarAll = async (event) => {
    event.preventDefault();
    try {
      const resposta = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          tamanho,
          tipo,
          preco,
          cor,
          marca,
          peso,
        }),
      });
      if (resposta.ok) {
        navigate("/");
      } else {
        alert("Erro ao registrar. Verifique os dados!");
      }
    } catch {
      alert("Ocorreu um erro, programador burro!");
    }
  };

  return (
    <main>
      <form onSubmit={registrarAll}>
        <p>Nome</p>
        <input
          type="text"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
        />
        <p>Tamanho</p>
        <input
          type="text"
          value={tamanho}
          onChange={(event) => setTamanho(event.target.value)}
        />
        <p>Tipo</p>
        <input
          type="text"
          value={tipo}
          onChange={(event) => setTipo(event.target.value)}
        />
        <p>Preço</p>
        <input
          type="number"
          value={preco}
          onChange={(event) => setPreco(event.target.value)}
        />
        <p>Cor</p>
        <input
          type="text"
          value={cor}
          onChange={(event) => setCor(event.target.value)}
        />
        <p>Marca</p>
        <input
          type="text"
          value={marca}
          onChange={(event) => setMarca(event.target.value)}
        />
        <p>Peso</p>
        <input
          type="number"
          value={peso}
          onChange={(event) => setPeso(event.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </main>
  );
}
