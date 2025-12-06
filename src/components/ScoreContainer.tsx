import {Trophy, Target} from 'lucide-react'
import {Line} from 'rc-progress'

interface ScoreContainerProps{
    score: number;
    progress: number;
    total: number;
}

export default function ScoreContainer({score, progress, total}: ScoreContainerProps){
    const percent = (progress / total) * 100;

    return(
        <div className="bg-zinc-100 w-full lg:w-2/3 h-28 rounded-lg flex flex-col lg:px-6">
            <div className='flex justify-between '>
                <div className="flex items-center p-2">
                    <Trophy className="text-amber-400"/>
                    <div className="p-2">
                        <p className="text-gray-800 ">Pontuação </p>
                        <p className="text-gray-950 font-bold flex text-lg">{score} </p>
                    </div>
                </div>
                <div className="flex items-center p-2">
                    <Target className="text-blue-600"/>
                    <div className="p-2">
                        <p className="text-gray-800 ">Progresso </p>
                        <p className="text-gray-950 font-bold flex text-lg">{progress}/{total} </p>
                    </div>
                </div>
            </div>
            <div className='w-full px-2'>
                <Line percent={percent} strokeWidth={2} strokeColor="#6C63FF"    />
            </div>
        </div>
    )
}