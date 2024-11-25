import { useState } from "react";

export default function Registrar() {

  const [nome, setNome] = useState("")

  const [email, setEmail] = useState("")

  const registrarAll = async () => {
    event.preventDefault()
    try{
      await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          nome: nome,
          email: email

        })
      })
    } catch{
      alert('Ocorreu um erro, programador burro!')
    }
  }

  return (
     <main>
      <form onSubmit={registrarAll}>
      <input type="text" value={nome} onChange={(event) => setNome(event.target.value)}/>
      <input type="text" value={email} onChange={(event) => setEmail(event.target.value)}/>
      <button>Enviar</button>
      </form>

     </main> 
  );
}