import { Lightbulb } from "lucide-react"
import { useState, useEffect } from "react"
import FlipCard from "./FlipCard"
import Cards from "../reposity/ClashCards"



interface MainContainerProps {
    onAcertou: () => void;
    onErrou: () => void;
    onDica?: () => void;
    onPassar: () => void;
}

export default function MainContainer({ onAcertou, onErrou, onPassar }: MainContainerProps) {
    const numeroAleatorio = Math.floor(Math.random() * Cards.length)

    const [CampoChute, setCampoChute] = useState("")
    const [indiceAtual, setIndiceAtual] = useState(numeroAleatorio)
    const [sugestoes, setSugestoes] = useState<typeof Cards>([])
    const [resultado, setResultado] = useState<string | null>(null)
    const [cardsVirados, setCardsVirados] = useState(0)
    const [flippedStates, setFlippedStates] = useState([true, false, false])
    const [chutesErrados, setChutesErrados] = useState<typeof Cards>([])

    const sortearCard = () => {
        setFlippedStates([false, false, false])
        setCardsVirados(0)

        setTimeout(() => {
            const novoIndice = Math.floor(Math.random() * Cards.length)
            setCampoChute("")
            setSugestoes([])
            setResultado(null)
            setChutesErrados([])
            setCardsVirados(1)
            setFlippedStates([true, false, false])
            setIndiceAtual(novoIndice)
        }, 500)


    }

    useEffect(() => {
        sortearCard()
    }, [])


    const passarCarta = () => {
        sortearCard();
        onPassar();
    }

    
    const atualizaSugestoes = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valor = e.target.value;
        setCampoChute(valor);

        if (valor.length > 0) {
        const filtrados = Cards.filter(
            (item) =>
            item.nome.toLowerCase().startsWith(valor.toLowerCase()) &&
            !chutesErrados.some(
                (err) => err.nome.toLowerCase() === item.nome.toLowerCase()
            )
        );
        setSugestoes(filtrados);
        } else {
        setSugestoes([]);
        }
    };

    const sugestaoClick = (nome: string) => {
        setCampoChute(nome);
        setSugestoes([])
    }

    const nomeDigitado = CampoChute.toLowerCase().trim();
    const cartaValida = Cards.some(
        (item) => item.nome.toLowerCase() === nomeDigitado
    );
    const jaChutou = chutesErrados.some(
        (item) => item.nome.toLowerCase() === nomeDigitado
    );
    
    
    const verificarChute = () => {

        const nomeCardSorteado = Cards[indiceAtual].nome.toLowerCase();

        if (jaChutou) {
            return;
        }

        if (nomeDigitado === nomeCardSorteado) {
            setResultado("Acertou! 🎉")
            setTimeout(() => {
                sortearCard()
            }, 2000)
            setChutesErrados([])
            onAcertou()
            setCampoChute("")
        } else {
            onErrou();
            const cartaErrada = Cards.find(
                (item) => item.nome.toLowerCase() === nomeDigitado)
            if (cartaErrada) {
                setChutesErrados((oldChutes) => [...oldChutes, cartaErrada]);
            }
            setCampoChute("")
            const proximoCard = cardsVirados;
            if (proximoCard < 3) {
                setFlippedStates((oldStates) => {
                    const newStates = [...oldStates];
                    newStates[proximoCard] = true;
                    return newStates;
                });
            }
            setCardsVirados(proximoCard + 1)
        }
    }
    return (
        <div className="bg-zinc-100 w-full lg:w-2/3 h-80 rounded-lg flex-col lg:py-2">
            <div className="flex justify-around gap-x-2 p-2 lg:gap-x-5 lg:px-6">
                <FlipCard emoji={Cards[indiceAtual].emojis[0]} isFlipped={flippedStates[0]} />
                <FlipCard emoji={Cards[indiceAtual].emojis[1]} isFlipped={flippedStates[1]} />
                <FlipCard emoji={Cards[indiceAtual].emojis[2]} isFlipped={flippedStates[2]} />

            </div>
            <div className="px-2 mt-4 lg:px-6">
                <input
                    type="text"
                    placeholder="Digite seu chute"
                    className="bg-gray-200 w-full rounded-md p-2"
                    value={CampoChute}
                    onChange={atualizaSugestoes}
                />
                {sugestoes.length > 0 && (
                    <ul className="bg-white border rounded shadow mt-1 z-10 w-full">
                        {sugestoes.map((item, idx) => (
                            <li
                                key={idx}
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => sugestaoClick(item.nome)}
                            >
                                <img src={item.foto} className="inline-block w-6 h-6 mr-2" />
                                {item.nome}
                            </li>
                        ))}
                    </ul>
                )}
                {CampoChute.length > 0 && !cartaValida && sugestoes.length === 0 && (
                    <div className="bg-white border rounded shadow mt-1 p-2">
                        Não encontramos uma carta com esse nome
                    </div>
                )}
            </div>
            <div className="flex justify-between items-center p-2 mt-4 lg:px-6">
                <button
                    onClick={verificarChute}
                    disabled={!cartaValida}
                    className={`bg-blue-600 text-zinc-100 p-2 w-1/2 rounded-md hover:bg-blue-700 transition-colors md:w-2/3
                        ${!cartaValida ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}
                >
                    Chutar
                </button>
                <button
                    className="flex items-center justify-center bg-gray-600 text-zinc-100 p-2 w-1/2 rounded-md hover:bg-gray-700 transition-colors ml-2 md:w-1/3"
                >
                    <Lightbulb className="size-4 mr-2" /> Dica (-20 pts)
                </button>
            </div>
            <div className="flex justify-center ">
                <button className="hover:bg-zinc-200 w-1/4 py-2 rounded-sm" onClick={passarCarta}>Give Up</button>
            </div>
            <div className="lg:px-6">
                {resultado && (
                <div className={`text-center p-2 mt-2 rounded-md text-white font-semibold ${resultado.includes("Acertou") ? "bg-green-600" : "bg-red-600"}`}>
                    {resultado}
                </div>
            )}
                {chutesErrados.length > 0 && (
                <ul className="flex flex-col gap-2 justify-center mt-8 lg:px-6 pb-5">
                    {chutesErrados.map((item, idx) => (
                        <li
                            key={idx}
                            className="flex items-center bg-red-500 rounded-md p-3 gap-5 shadow text-white"
                        >
                            <img src={item.foto} className="w-8 h-8 mr-2" alt={item.nome} />
                            <span className="text-xl">{item.nome}</span>
                        </li>
                    ))}
                </ul>
            )}
            </div>
        </div>
    )
}