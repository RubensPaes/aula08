import { useEffect, useState } from "react";
import {jsPDF} from "jspdf"
import "jspdf-autotable"
import {Button} from '@mui/material'
export default function Home() {

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/usuarios");
        const dados = await resposta.json();
        setUsuarios(dados);
      } catch {
        alert('Ocorreu um erro no app!');
      }
    }
    buscarUsuario();
  }, [usuarios])
  const removerRodolfo = async (id) => {
      try{
          await fetch('http://localhost:3000/usuarios/' + id, {
          method: 'DELETE'

          })
      }catch{
        alert("erraste programadore burrito")
      }
  }
  const exportarPDF = () => {
    const doc = new jsPDF()
    const tabelaDados = usuarios.map(usuario => [
      usuario.nome,
      usuario.email
    ]);

    doc.text("Lista de Usuários", 10, 10);
    doc.autoTable({
      head: [["Nome", "Email"]],
      body: tabelaDados
    })
    doc.save("alunos.pdf")
  }

  return (

     <div>
       <button onClick={()=> exportarPDF()}>Gerar Pdf</button> 
    <table border={1}>
      <thead>
    <tr>
      <td>Nome</td>
      <td>E-Mail</td>
    </tr>
      </thead>
      <tr>
        <td>Nome</td>
        <td>E-mail</td>
      </tr>
      {usuarios.map((usuario) =>
        <tr key={usuario.id}>
          <td>{usuario.nome}</td>
          <td>{usuario.email}</td>
          <td><button onClick={()=> removerRodolfo(usuario.id)}>X</button></td>
        </tr>
      )}
    </table>
    </div>
  );
}