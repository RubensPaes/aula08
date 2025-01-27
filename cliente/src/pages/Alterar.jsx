import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Alterar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    nome: "",
    tamanho: "",
    tipo: "",
    preco: "",
    cor: "",
    marca: "",
    peso: "",
  });

  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        const resposta = await fetch(`http://localhost:3000/usuarios/${id}`);
        const dados = await resposta.json();
        setUsuario(dados);
      } catch {
        alert("Erro ao buscar usuário!");
      }
    };
    buscarUsuario();
  }, [id]);

  const salvarAlteracoes = async (event) => {
    event.preventDefault();
    try {
      await fetch(`http://localhost:3000/usuarios/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      });
      alert("Alterações salvas com sucesso!");
      navigate("/");
    } catch {
      alert("Erro ao salvar alterações!");
    }
  };

  const modificador = (event) => {
    const { name, value } = event.target;
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Alterar Usuário</h1>
      <form onSubmit={salvarAlteracoes}>
        <div>
          <p>Nome:</p>
          <input
            type="text"
            name="nome"
            value={usuario.nome}
            onChange={modificador}
          />
        </div>
        <div>
          <p>Tamanho:</p>
          <input
            type="text"
            name="tamanho"
            value={usuario.tamanho}
            onChange={modificador}
          />
        </div>
        <div>
          <p>Tipo:</p>
          <input
            type="text"
            name="tipo"
            value={usuario.tipo}
            onChange={modificador}
          />
        </div>
        <div>
          <p>Preço:</p>
          <input
            type="number"
            name="preco"
            value={usuario.preco}
            onChange={modificador}
          />
        </div>
        <div>
          <p>Cor:</p>
          <input
            type="text"
            name="cor"
            value={usuario.cor}
            onChange={modificador}
          />
        </div>
        <div>
          <p>Marca:</p>
          <input
            type="text"
            name="marca"
            value={usuario.marca}
            onChange={modificador}
          />
        </div>
        <div>
          <p>Peso:</p>
          <input
            type="number"
            name="peso"
            value={usuario.peso}
            onChange={modificador}
          />
        </div>
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}
