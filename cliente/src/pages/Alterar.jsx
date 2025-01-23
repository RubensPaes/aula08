import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Alterar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({ nome: "", email: "" });

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
          <p>Nome para alterar:</p>
          <input
            type="text"
            name="nome"
            value={usuario.nome}
            onChange={modificador}
          />
        </div>
        <div>
          <p>E-mail para alterar:</p>
          <input
            type="text"
            name="email"
            value={usuario.email}
            onChange={modificador}
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
