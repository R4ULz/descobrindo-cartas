import { Lightbulb } from "lucide-react"
import { useState } from "react"
import FlipCard from "./FlipCard"
import Cards from "../reposity/ClashCards"

export default function MainContainer(){

    const numeroAleatorio = Math.floor(Math.random() * Cards.length)

    const [CampoChute, setCampoChute] = useState("")
    const [indiceAtual, setIndiceAtual] = useState(numeroAleatorio)
    const [sugestoes, setSugestoes] = useState<typeof Cards>([])

    const sortearCard = () =>{
        const novoIndice = Math.floor(Math.random() * Cards.length)
        setIndiceAtual(novoIndice)
    }

    const atualizaSugestoes = (e) =>{
        const valor = e.target.value;
        setCampoChute(valor)

        if(valor.length > 0){
            const filtrados = Cards.filter(item => item.nome.toLowerCase().startsWith(valor.toLowerCase()));
            setSugestoes(filtrados)

        }else{
            setSugestoes([]);
        }
    }
    
    //Quando clicar em uma sugestão
    const sugestaoClick = (nome: string) =>{
        setCampoChute(nome);
        setSugestoes([])
    }


    return(
        <div className="bg-zinc-100 w-full h-80 rounded-lg flex-col">
            <div className="flex justify-around gap-x-2 p-2">
                <FlipCard emoji={Cards[indiceAtual].emojis[0]} isFlipped={false}/>
                <FlipCard emoji={Cards[indiceAtual].emojis[1]} isFlipped={false}/>
                <FlipCard emoji={Cards[indiceAtual].emojis[2]} isFlipped={false}/>

            </div>
            <div className="px-2 mt-4">
                <input 
                    type="text" 
                    placeholder="Digite seu chute" 
                    className="bg-gray-200 w-full rounded-md p-2" 
                    value={CampoChute} 
                    onChange={atualizaSugestoes}
                />
                {sugestoes.length > 0 && (
                    <ul className="bg-white border rounded shadow mt-1 absolute z-10 w-full">
                        {sugestoes.map((item, idx) =>(
                            <li
                                key={idx}
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => sugestaoClick(item.nome)}   
                            >
                                <img src={item.foto} className="inline-block w-6 h-6 mr-2"/>
                                {item.nome}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="flex justify-between items-center p-2 mt-4">
                <button className="bg-blue-600 text-zinc-100 p-2 w-1/2 rounded-md hover:bg-blue-700 transition-colors md:w-2/3">Chutar</button>
                <button className="flex items-center justify-center bg-gray-600 text-zinc-100 p-2 w-1/2 rounded-md hover:bg-gray-700 transition-colors ml-2 md:w-1/3"><Lightbulb className="size-4 mr-2"/> Dica (-20 pts)</button>
            </div>
            <div className="flex justify-center ">
                <button className="hover:bg-zinc-200 w-1/4 py-2 rounded-sm" onClick={sortearCard}>Give Up</button>
            </div>
        </div>
    )
}