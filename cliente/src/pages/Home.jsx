import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Link } from "react-router-dom";
import styles from '../css/Home.module.css';



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

  const orderAz = () => {
    const listaAux = [...usuarios].sort((a, b) => a.nome.localeCompare(b.nome));
    setUsuarios(listaAux);
  };

  const orderZa = () => {
    const listaB = [...usuarios].sort((a, b) => b.nome.localeCompare(a.nome));
    setUsuarios(listaB);
  };

  const precoM = () => {
    const listaP = [...usuarios].sort((a, b) => a.preco - b.preco);
    setUsuarios(listaP);
  };

  const precoMenor = () => {
    const listaP = [...usuarios].sort((a, b) => b.preco - a.preco);
    setUsuarios(listaP);
  };

  return (
    <div className={styles.container}>
      <div className={styles.tableContainer}>
      <h1>Estoque de Instrumentos</h1>
        <button onClick={exportarPDF}>Gerar PDF</button>
        <button onClick={orderAz}>Az</button>
        <button onClick={orderZa}>Za</button>
        <button onClick={precoM}>Valor Menor</button>
        <button onClick={precoMenor}>Valor Maior</button>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Tamanho</th>
              <th>Tipo</th>
              <th>Preço</th>
              <th>Cor</th>
              <th>Marca</th>
              <th>Peso</th>
              <th>Ações</th>
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
                <td className={styles.actions}>
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
      <div className={styles.cadastrar}>
        <Link to={"/registro"}>
          <button>Cadastrar</button>
        </Link>
      </div>
    </div>
  );
}

