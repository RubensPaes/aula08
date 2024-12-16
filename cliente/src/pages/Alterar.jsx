import { useParams } from "react-router-dom"

export default function Alterar(){
    const {id} = useParams()
    
    return(
       <h1>Página alterar {id}</h1>
    )

}