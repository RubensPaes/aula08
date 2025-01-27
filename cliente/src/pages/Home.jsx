import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Link } from "react-router-dom";

export default function Home() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/usuarios");
        const dados = await resposta.json();
        setUsuarios(dados);
      } catch {
        alert("Ocorreu um erro no app!");
      }
    };
    buscarUsuario();
  }, []);

  const removerUsuario = async (id) => {
    try {
      const resposta = await fetch(`http://localhost:3000/usuarios/${id}`, {
        method: "DELETE",
      });

      if (resposta.ok) {
      
        setUsuarios((prevUsuarios) =>
          prevUsuarios.filter((usuario) => usuario.id !== id)
        );
        alert("Usuário removido com sucesso!");
      } else {
        alert("Erro ao tentar remover o usuário. Verifique o ID.");
      }
    } catch {
      alert("Erro ao tentar remover o usuário.");
    }
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    const tabelaDados = usuarios.map((usuario) => [
      usuario.nome,
      usuario.tamanho,
      usuario.tipo,
      usuario.preco,
      usuario.cor,
      usuario.marca,
      usuario.peso,
    ]);

    doc.text("Lista de Usuários", 10, 10);
    doc.autoTable({
      head: [["Nome", "Tamanho", "Tipo", "Preço", "Cor", "Marca", "Peso"]],
      body: tabelaDados,
    });
    doc.save("usuarios.pdf");
  };

  return (
    <div>
      <button onClick={() => exportarPDF()}>Gerar PDF</button>
      <table border={1}>
        <thead>
          <tr>
            <td>Nome</td>
            <td>Tamanho</td>
            <td>Tipo</td>
            <td>Preço</td>
            <td>Cor</td>
            <td>Marca</td>
            <td>Peso</td>
            <td>Ações</td>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nome}</td>
              <td>{usuario.tamanho}</td>
              <td>{usuario.tipo}</td>
              <td>{usuario.preco}</td>
              <td>{usuario.cor}</td>
              <td>{usuario.marca}</td>
              <td>{usuario.peso}</td>
              <td>
                <button onClick={() => removerUsuario(usuario.id)}>X</button>
                <Link to={"/alterar/" + usuario.id}>
                  <button>Alterar</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
