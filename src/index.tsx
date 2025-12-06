import { useState } from 'react';
import MainContainer from './components/MainContainer'
import ScoreContainer from './components/ScoreContainer'
import { Trophy } from 'lucide-react';


export default function App() {
    const [pontuacao, setPontuacao] = useState(0);
    const [rodadaAtual, setRodadaAtual] = useState(1);
    const [finalizado, setFinalizado] = useState(false);
    const totalRodadas = 10;

    return (
        <div className='fixed inset-0 bg-[url("https://images.alphacoders.com/127/thumb-1920-1270400.jpg")] bg-cover bg-center w-full min-h-screen overflow-x-hidden'>
            <div className='fixed inset-0 bg-black opacity-50 w-full min-h-screen overflow-x-hidden' />
            <div className='relative z-10'>
                {finalizado ? (
                    <div className="flex flex-col items-center justify-center p-5 ">
                        <div className='bg-zinc-200 rounded-xl h-2/3 w-full flex flex-col items-center p-6 shadow-lg'>
                            <Trophy className="text-yellow-500 size-12 mb-4" />
                            <h1 className="text-3xl font-bold mb-4">{pontuacao > 5 ? "Parabéns!" : "Game Over!"}</h1>
                            <p className="text-lg text-zinc-800 mb-2">Você completou o desafio.</p>
                            <p className="text-lg text-zinc-800">Pontuação final: <span className="font-bold">{pontuacao}</span></p>
                            <button
                                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                onClick={() => {
                                    setRodadaAtual(1);
                                    setPontuacao(0);
                                    setFinalizado(false);
                                }}
                            >
                                Jogar novamente
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className='flex justify-center items-center p-5'>
                            <h1 className='text-zinc-100 font-bold md:text-xl lg:text-2xl'>👑Descubra a carta do Clash Royale👑</h1>
                        </div>
                        <div className='flex justify-center items-center'>
                            <h2 className='text-zinc-100 md:text-xl lg:text-2xl'>Descubra qual é a carta através dos emojis.</h2>
                        </div>
                        <div className='px-6 py-3 md:px-50 lg:px-50 lg:flex lg:items-center lg:justify-center'>
                            <ScoreContainer score={pontuacao} progress={rodadaAtual} total={totalRodadas} />
                        </div>
                        <div className='px-6 py-3 md:px-50 lg:px-50 lg:flex lg:items-center lg:justify-center'>
                            <MainContainer
                                onAcertou={() => {
                                    setPontuacao((p) => p + 100)
                                    setRodadaAtual((r) => {
                                        if (r + 1 > totalRodadas) {
                                            setFinalizado(true);
                                            return r;
                                        }
                                        return r + 1;
                                    })
                                }}
                                onErrou={() => {
                                    setPontuacao((p) => (p > 0 ? p - 10 : 0))
                                }}
                                onDica={() => {
                                    setPontuacao((p) => (p > 0 ? p - 20 : 0))
                                }}
                                onPassar={() => {
                                    setRodadaAtual((r) => {
                                        if (r + 1 > totalRodadas) {
                                            setFinalizado(true);
                                            return r;
                                        }
                                        return r + 1;
                                    })
                                }}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    )

}