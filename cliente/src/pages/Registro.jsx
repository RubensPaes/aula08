import { useState } from "react";
import {useNavigate} from "react-router-dom"

export default function Registrar() {

  const [nome, setNome] = useState("")

  const [email, setEmail] = useState("")

  const navigate = useNavigate()

  const registrarAll = async () => {
    event.preventDefault()
    try{
     const resposta = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          nome: nome,
          email: email

        })
      })
    if(resposta.ok){
      navigate("/")
    }
    } catch{
      alert('Ocorreu um erro, programador burro!')
    }
  }

  return (
     <main>
      <form onSubmit={registrarAll}>
        <p>nome para login</p>
      <input type="text" value={nome} name="" id="" onChange={(event) => setNome(event.target.value)}/>
      <p>email para login</p>
      <input type="text" value={email} name="" id="" onChange={(event) => setEmail(event.target.value)}/>
      <button>Enviar</button>
      </form>

     </main> 
  );
}